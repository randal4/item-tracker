import React, { Children } from 'react';
import { IItem } from '..';
import Moment from 'react-moment';

type Props = {
  lastItem: IItem;
};

const ItemLast = ({ lastItem }: Props): JSX.Element => {
  return lastItem ? (
    <div className="p-3 text-slate-500 flex flex-col items-center">
      <div>Last item logged</div>
      <div className="text-3xl">
        <Moment
          date={lastItem?.lastUpdate?.seconds}
          unix
          durationFromNow
          interval={1000}
          format="m [minutes]"
        />{' '}
        ago
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default ItemLast;
