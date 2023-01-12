import React, { useEffect, useState } from 'react';
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  scales,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import faker from 'faker';
import { auth, db } from '../../config/firebaseConfig';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { Chart as ChartJS } from 'chart.js/auto';
import 'chartjs-adapter-moment';

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

export function HistoryChart() {
  const [historyMap, setHistoryMap] = useState<Map<String, IHistory[]>>(null);

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

  let datasetsArr = [];

  historyMap
    ? historyMap.forEach((value, key) => {
        datasetsArr.push({
          label: key,
          data: value,
        });
      })
    : [];

  console.log('datasetsArr', datasetsArr);

  const data = {
    datasets: datasetsArr,
  };

  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }

    const q = query(
      collection(db, 'items'),
      where('author_uid', '==', auth.currentUser.uid),
      orderBy('lastUpdate', 'asc')
    );

    /*
        "light": [{x:2022/02/01, y:3}, {x: 2022/02/02, y:4}]
        "light": [{x:2022/02/01, y:3}, {x: 2022/02/02, y:4}]
    */
    onSnapshot(
      q,
      (snapshot) => {
        let data = new Map<String, IHistory[]>();
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
        });

        setHistoryMap(data);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {};
  }, [auth.currentUser]);

  return <Bar className="m-10" options={options} data={data} />;
}
