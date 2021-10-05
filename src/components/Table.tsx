import React from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';
import MUITable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Column, RowData } from '../types/TableTypes';

type TableProps = {
  columns: Column[];
  data: RowData[];
  count: number;
  page: number;
  rowsPerPage: number;
  setPage: Function;
};

const StyledTableHead = styled(TableHead)`
  background-color: #a8a8a8;
`;

const StyledTableFooter = styled(TableFooter)`
  background-color: #eaeaea;
`;

const StyledCell = styled(TableCell)<{ width?: string }>`
  color: white;
  ${(props) => (props.width ? `width: ${props.width}` : '')};
`;

const Table: React.FC<TableProps> = ({
  columns,
  data,
  count,
  page,
  rowsPerPage,
  setPage,
}) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const renderHeaderCell = (column) => {
    let width = '20%';
    if (column.id === 'company' || column.id === 'uniqueSymbol') {
      width = '40%';
    }

    return (
      <StyledCell {...column.getHeaderProps()} width={width}>
        {column.render('header')}
      </StyledCell>
    );
  };

  const renderCell = (row) => {
    prepareRow(row);
    return (
      <TableRow {...row.getRowProps()}>
        {row.cells.map((cell) => (
          <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
        ))}
      </TableRow>
    );
  };

  // TODO
  // style up the table and add background color
  return (
    <MUITable {...getTableProps()}>
      <StyledTableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => renderHeaderCell(column))}
          </TableRow>
        ))}
      </StyledTableHead>
      <TableBody>{rows.map((row) => renderCell(row))}</TableBody>
      <StyledTableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[1]}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
          />
        </TableRow>
      </StyledTableFooter>
    </MUITable>
  );
};

export default Table;
