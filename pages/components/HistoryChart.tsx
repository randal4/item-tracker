import React, { useEffect, useState } from 'react';
import {
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  DatasetChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { auth, db } from '../../lib/firebaseConfig';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { Chart as ChartJS } from 'chart.js/auto';
import 'chartjs-adapter-moment';
import LabelNumberBox from './LabelNumberBox';

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface IHistory {
  x: number;
  y: number;
}

type Props = {};

const HistoryChart = ({}: Props) => {
  const daysOptions = [5, 10, 20, 30, 60, 90];

  const [historyMap, setHistoryMap] = useState({
    datasets: [],
  });
  const [daysHistory, setDaysHistory] = useState<number>(90);
  const [avgPerDay, setAvgPerDay] = useState<number | null>(null);
  const [avgPerDayWhenAtLeastOne, setAvgPerDayWhenAtLeast1] = useState<
    number | null
  >(null);
  const [uniqueDaysCount, setUniqueDaysCount] = useState<number | null>(null);

  const options = {
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'day' as const,
        },
      },
    },
  };

  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }

    const minDate = new Date();
    minDate.setDate(minDate.getDate() - daysHistory);

    const q = query(
      collection(db, 'items'),
      where('author_uid', '==', auth.currentUser.uid),
      where('day', '>', minDate),
      orderBy('day', 'asc')
    );

    /*
        "light": [{x:2022/02/01, y:3}, {x: 2022/02/02, y:4}]
        "light": [{x:2022/02/01, y:3}, {x: 2022/02/02, y:4}]
    */
    onSnapshot(
      q,
      (snapshot) => {
        let data = new Map<String, IHistory[]>();
        let totalCount = 0;
        let uniqueDays = new Set();

        snapshot.docs.map((doc) => {
          let label = doc.data().label;
          if (data.has(label)) {
            data.set(label, [
              ...data.get(label),
              { x: doc.data().day.seconds * 1000, y: doc.data().count },
            ]);
          } else {
            data.set(label, [
              { x: doc.data().day.seconds * 1000, y: doc.data().count },
            ]);
          }

          uniqueDays.add(doc.data().day.seconds);

          //keep total count for avg
          totalCount += doc.data().count;
        });

        let datasetsArr = [];

        data.forEach((value, key) => {
          datasetsArr.push({
            label: key,
            data: value,
          });
        });

        console.log('datasetsArr', datasetsArr);

        const dataConfig = {
          datasets: datasetsArr,
        };

        setHistoryMap(dataConfig);

        setAvgPerDay(totalCount / daysHistory);
        setUniqueDaysCount(uniqueDays.size);
        setAvgPerDayWhenAtLeast1(totalCount / uniqueDays.size);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {};
  }, [auth.currentUser, daysHistory]);

  return (
    <>
      <div className="mx-5">
        Past
        <select
          className="mx-3"
          defaultValue={daysHistory}
          onChange={(e) => setDaysHistory(parseInt(e.target.value))}
        >
          {daysOptions.map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </select>
        days
      </div>

      <Bar className="m-10" options={options} data={historyMap} />
      <div className="flex flex-wrap justify-center">
        <LabelNumberBox label="Average Per Day" stat={avgPerDay?.toFixed(2)} />
        <LabelNumberBox
          label="Number of Days with at least 1"
          stat={uniqueDaysCount?.toString()}
        />
        <LabelNumberBox
          label="Average Per Day when > 1"
          stat={avgPerDayWhenAtLeastOne?.toFixed(2)}
        />
        <LabelNumberBox label="test" stat="10" />
      </div>
    </>
  );
};

export default HistoryChart;
