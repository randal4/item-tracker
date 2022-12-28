import React from 'react';
import { IItem } from '..';

type Props = {
  items: IItem[];
};

const ItemsTable = ({ items }: Props) => {
  return (
    <table className="border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
      <thead className="bg-slate-50 dark:bg-slate-700">
        <tr>
          <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
            Last Update
          </th>
          <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
            Label
          </th>
          <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
            Count
          </th>
        </tr>
      </thead>
      <tbody>
        {items
          ? items.map((item) => {
              return (
                <tr key={item.id}>
                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {item?.lastUpdate?.seconds
                      ? new Date(
                          item?.lastUpdate?.seconds * 1000
                        ).toLocaleTimeString('en-US', {
                          // en-US can be set to 'default' to use user's browser settings
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : ''}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {' '}
                    {item.label}{' '}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {' '}
                    {item.count}{' '}
                  </td>
                </tr>
              );
            })
          : ''}
      </tbody>
    </table>
  );
};

export default ItemsTable;
