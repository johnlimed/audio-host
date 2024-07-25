import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type DenseTableProps = {
  name: string;
  headers: string[];
  data: string[][];
  focusIndex?: number;
  rowOnClick?: (e?: React.MouseEvent<HTMLTableRowElement, MouseEvent>, index?: number, value?: any) => void;
}

export default function DenseTable(props: DenseTableProps) {
  const renderRow = (row: string[]) => {
    return row.map((col, colIndex) => (
      <TableCell key={`${props.name}-table-col-${colIndex}`} component="th" scope="row" align={colIndex > 0 ? "right" : "left"}>
        {col}
      </TableCell>
    ));
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
              >
                {
                  renderRow(row)
                }
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}