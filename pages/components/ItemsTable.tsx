import React from 'react';
import { IItem } from '..';

type Props = {
  items: IItem[];
};

const ItemsTable = ({ items }: Props) => {
  return (
    <table className="border-collapse w-full border border-slate-500  text-sm shadow-sm">
      <thead className="">
        <tr>
          <th className="w-1/2 border border-slate-300 font-semibold p-4 text-slate-900">
            Last Update
          </th>
          <th className="w-1/2 border border-slate-300 font-semibold p-4 text-slate-900">
            Label
          </th>
          <th className="w-1/2 border border-slate-300 font-semibold p-4 text-slate-900">
            Count
          </th>
        </tr>
      </thead>
      <tbody>
        {items && items.length ? (
          items.map((item) => {
            return (
              <tr key={item.id}>
                <td className="border border-slate-300 p-4 text-slate-500">
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
                <td className="border border-slate-300 p-4 text-slate-500">
                  {item.label}
                </td>
                <td className="border border-slate-300 p-4 text-slate-500">
                  {item.count}
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={3} className="text-center">
              No Logged Items
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ItemsTable;
