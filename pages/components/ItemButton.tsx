import React, { Children } from 'react';

type Props = {
  label: string;
  addData: (a: string) => void;
};

const ItemButton = ({ label, addData }: Props) => {
  return (
    <button
      onClick={() => addData(label)}
      className="text-3xl text-slate-200 bg-slate-500 rounded-md p-2 m-1 text-center w-[180px] h-[180px]"
    >
      {label}
    </button>
  );
};

export default ItemButton;
