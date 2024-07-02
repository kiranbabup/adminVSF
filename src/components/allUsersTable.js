import React, { useEffect, useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { loadingSpace } from '../assets/styles';

const columns = [
  { id: 'first_name', label: 'First Name' },
  { id: 'last_name', label: 'Last Name' },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'signup_on', label: 'Signup On', minWidth: 100 },
  { id: 'is_subscribed', label: 'Is Subscribed?', minWidth: 100 },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [isAllLoading, setIsAllLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsAllLoading(true);
      try {
        const response = await fetch(`https://heatmapapi.onrender.com/alluserdata`);
        if (!response.ok) {
          throw new Error(`http error status:${response.status}`);
        }
        const result = await response.json();
        setRows(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsAllLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        {
          isAllLoading ? <Box style={loadingSpace}><CircularProgress /> </Box> :
        <Table stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .reverse().map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      let value = row[column.id];
                      if (column.id === 'is_subscribed') {
                        value = value === 1 ? 'Yes' : 'No';
                      } else if (column.id === 'signup_on') {
                        value = formatDate(value);
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        }
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}