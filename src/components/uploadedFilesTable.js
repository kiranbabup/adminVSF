import React, { useEffect, useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { loadingSpace } from '../assets/styles';

const columns = [
  { id: 'category', label: 'Category', minWidth: 100 },
  { id: 'dates', label: 'Uploaded Date', minWidth: 100 },
  { id: 'file_name', label: 'File Name', minWidth: 100 },
];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [isUploadedDataLoading, setIsUploadedDataLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsUploadedDataLoading(true);
      try {
        const response = await fetch(`https://heatmapapi.onrender.com/getuploadedfilesData`);
        if (!response.ok) {
          throw new Error(`http error status:${response.status}`);
        }
        const result = await response.json();
        setRows(result.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsUploadedDataLoading(false);
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
          isUploadedDataLoading ? <Box style={loadingSpace}><CircularProgress /> </Box> :
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
                          const value = row[column.id];
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
