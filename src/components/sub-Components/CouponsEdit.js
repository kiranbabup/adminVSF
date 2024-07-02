import { Box, Typography, IconButton, Button, TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const loadingSpace = {
    height: "17rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const columns = [
    { id: 'coupon_code', label: 'Coupon Code' },
    { id: 'discount', label: 'Discount %' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action' }
];

const CouponsEdit = () => {
    const [codesData, setCodesData] = useState([]);
    const [isLoadingCodesData, setIsLoadingCodesData] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingCodesData(true);
            try {
                const response = await fetch(`https://heatmapapi.onrender.com/couponcodestatus`);
                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`);
                }
                const result = await response.json();
                setCodesData(result.data);
            } catch (error) {
                console.error("Error fetching plans data:", error);
            } finally {
                setIsLoadingCodesData(false);
            }
        };
        fetchData();
    }, []);

    const handleCodeToggle = async (code) => {
        try {
            const response = await fetch(`https://heatmapapi.onrender.com/togglecouponactivation/${code.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: code.status === 0 ? 1 : 0 })
            });
            if (!response.ok) {
                throw new Error('Coupon code edit failed');
            } else {
                alert('Coupon code status toggled successfully');
                setCodesData(codesData.map(item => item.id === code.id ? { ...item, status: code.status === 0 ? 1 : 0 } : item));
            }
        } catch (error) {
            console.error('Error editing Coupon code:', error.message);
            alert('Something went wrong. Please try again later');
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box sx={{ width: "90%", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
            {
                isLoadingCodesData ? <Box style={loadingSpace}><CircularProgress /> </Box> :
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {codesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .reverse().map((row, index) => {
                                        return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column) => {
                                                if (column.id === 'action') {
                                                    return (
                                                        <TableCell key={column.id}>
                                                            <Button variant="contained" onClick={() => handleCodeToggle(row)}>
                                                                {row.status === 0 ? "Enable" : "Disable"}
                                                            </Button>
                                                        </TableCell>
                                                    );
                                                } else {
                                                    let value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id}>
                                                            <Typography>{value}</Typography>
                                                        </TableCell>
                                                    );
                                                }
                                            })}
                                        </TableRow>
                                    )})}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={codesData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
            }
        </Box>
    );
};

export default CouponsEdit;
