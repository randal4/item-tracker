import React from 'react';
import { IItem } from '..';

type Props = {
  items: IItem[];
};

const ItemsTotal = ({ items }: Props) => {
  const total = items
    ? items.reduce((sum, current) => sum + current.count, 0)
    : 0;

  return <div className="text-8xl text-slate-500 ">{total}</div>;
};

export default ItemsTotal;
