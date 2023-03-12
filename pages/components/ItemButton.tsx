import React, { Children, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';

type Props = {
  label: string;
  addData: (a: string) => void;
  isEditing: boolean;
  deleteDataType?: Function;
};

const ItemButton = ({ label, addData, isEditing, deleteDataType }: Props) => {
  const deleteIcon = useRef();

  return (
    <>
      <div
        className="relative w-[180px] h-[120px] cursor-pointer text-3xl text-slate-200 bg-slate-500 border-blue-600 border-solid border-4 rounded-md p-2 m-1 text-center flex items-center justify-center hover:bg-slate-600"
        onClick={() => addData(label)}
      >
        <button className="">{label}</button>
        <div
          ref={deleteIcon}
          className={`absolute top-1 right-1 z-10 ${isEditing ? '' : 'hidden'}`}
        >
          <FaTrash
            onClick={(e) => {
              e.stopPropagation();
              deleteDataType({ label: label });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ItemButton;
