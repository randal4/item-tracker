import React, { Children } from 'react';

type Props = {
  label: string;
  addData: (a: string) => void;
};

const ItemButton = ({ label, addData }: Props) => {
  return (
    <div
      className="w-[180px] h-[180px] cursor-pointer text-3xl text-slate-200 bg-slate-500 rounded-md p-2 m-1 text-center flex items-center justify-center hover:bg-slate-600"
      onClick={() => addData(label)}
    >
      {/* <div className="flex flex-row-reverse"></div> */}
      <button className="">{label}</button>
    </div>
  );
};

export default ItemButton;
