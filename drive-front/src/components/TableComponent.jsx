import React from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import Avatar from "./Avatar";

function TableComponent({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  rows,
  prepareRow,
}) {
  return (
    <div className="w-full min-w-[30rem] p-4 bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.05)] dark:bg-gray-900">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id} // Aquí se añade la clave directamente al elemento th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-3 text-start text-xs font-light uppercase cursor-pointer"
                  style={{ width: column.width }}
                >
                  <div className="flex gap-2 items-center">
                    <div className="text-gray-800 dark:text-gray-200">
                      {column.render("Header")}
                    </div>
                    <div className="flex flex-col">
                      <FaSortUp
                        className={`text-sm translate-y-1/2 ${
                          column.isSorted && !column.isSortedDesc
                            ? "text-green-400"
                            : "text-gray-600 dark:text-gray-200"
                        }`}
                      />
                      <FaSortDown
                        className={`text-sm -translate-y-1/2 ${
                          column.isSortedDesc ? "text-green-400" : "text-gray-300"
                        }`}
                      />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()} className="hover:bg-gray-100 dark:hover:bg-gray-950/20">
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="p-3 text-sm font-normal text-gray-600 first:rounded-l-lg last:rounded-r-lg dark:text-gray-400"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;
