import React, { Children } from 'react';
import { IItem } from '..';
import Moment from 'react-moment';

type Props = {
  lastItem: IItem;
};

const ItemLast = ({ lastItem }: Props): JSX.Element => {
  return lastItem ? (
    <div className="p-3 text-slate-200 flex flex-col items-center">
      <div>Last item logged</div>
      <div>
        <Moment
          className="text-3xl"
          date={new Date(lastItem?.lastUpdate?.seconds * 1000).toString()}
          durationFromNow
          interval={1000}
          format="m [mins]"
        />
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default ItemLast;
