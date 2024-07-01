import React, { useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import SearchBar from "./SearchBar";
import ListboxSelect from "./ListboxSelect";
import TableComponent from "./TableComponent";
import Pagination from "./Pagination";

function GenericTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    page: rows,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <SearchBar
          searchTerm={state.globalFilter}
          handleSearchChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
        <ListboxSelect
          width="44"
          selected={pageSize}
          setSelected={setPageSize}
          options={[
            { id: 5, caption: "5 items per page" },
            { id: 10, caption: "10 items per page" },
            { id: 20, caption: "20 items per page" },
          ]}
          renderOption={(option) => <span>{option.caption}</span>}
        />
      </div>
      <TableComponent
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        rows={rows}
        prepareRow={prepareRow}
      />
      <div className="flex justify-center">
        <Pagination
          gotoPage={gotoPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
        />
      </div>
    </div>
  );
}

export default GenericTable;
