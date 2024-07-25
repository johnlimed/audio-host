import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

type DenseTableProps = {
  name: string;
  headers: string[];
  data: string[][];
  focusIndex?: number;
  rowOnClick?: (e?: React.MouseEvent<HTMLTableRowElement, MouseEvent>, index?: number, value?: any) => void;
  onDelete?: (rowIndex: number, value: any) => void;
}

export default function DenseTable(props: DenseTableProps) {
  const [curRow, setCurRow] = useState(0);

  const renderCol = (colsVal: string[], rowIndex: number) => {
    const cols = colsVal.map((col, colIndex) => (
      <TableCell key={`${props.name}-table-col-${colIndex}`} component="th" scope="row" align={colIndex > 0 ? "right" : "left"}>
        {col}
      </TableCell>
    ));
    if (props.onDelete) {
      cols.push(
        <TableCell key={`${props.name}-table-col-delete`} component="th" scope="row" align={"center"} sx={{ verticalAlign: "middle" }}>
          <DeleteIcon visibility={curRow === rowIndex ? "inherit" : "hidden"} onClick={() => { if (props.onDelete) props.onDelete(rowIndex, colsVal) }} sx={{ color: "grey"}} />
        </TableCell>
      )
    }
    return cols;
  }
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {
              props.headers.map((header, index) => {
                return (
                  <TableCell key={`${props.name}-table-header-${index}`} align={index > 0 ? "right" : "left"}>{header}</TableCell>
                )
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, index) => {
            return (
              <TableRow
                hover={index !== props.focusIndex}
                key={`${props.name}-table-row-${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: props.focusIndex === index ? "lightgreen" : "inherit", cursor: "pointer" }}
                onClick={(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => { if (props.rowOnClick) props.rowOnClick(e, index, row) }}
                onMouseEnter={() => { setCurRow(index) }}
              >
                {
                  renderCol(row, index)
                }
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}