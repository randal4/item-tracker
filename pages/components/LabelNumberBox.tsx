import React, { Children } from 'react';

type Props = {
  label: string;
  stat: string;
};

const LabelNumberBox = ({ label, stat }: Props): JSX.Element => {
  return (
    <div className="mx-6 p-6 border-slate-200 border-solid border-2 flex flex-col items-center max-w-[300px] w-1/4">
      <div>{label}</div>
      <div>{stat}</div>
    </div>
  );
};

export default LabelNumberBox;
