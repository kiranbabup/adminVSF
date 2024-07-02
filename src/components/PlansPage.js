import { Box, Typography, TextField, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';

const loadingSpace = {
    height: "17rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const columns = [
    { id: 'sl_no', label: 'Sl. No' },
    { id: 'months', label: 'Months' },
    { id: 'amount', label: 'Amount' },
    { id: 'action', label: 'Action' }
];
const PlansPage = () => {
    const [plans, setPlans] = useState([]);
    const [isLoadingPlans, setIsLoadingPlans] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [editValues, setEditValues] = useState({ months: '', amount: '' });
    const [isLoadingEdit, setIsLoadingEdit] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingPlans(true);
            try {
                const response = await fetch(`https://heatmapapi.onrender.com/getPlans`);
                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`);
                }
                const result = await response.json();
                console.log(result);
                setPlans(result.data);
            } catch (error) {
                console.error("Error fetching plans data:", error);
            } finally {
                setIsLoadingPlans(false);
            }
        };
        fetchData();
    }, []);

    const handleEditClick = (plan) => {
        setSelectedPlan(plan);
        setEditValues({ months: plan.months, amount: plan.amount });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePlanEdit = async () => {
        const { months, amount } = editValues;

        if (!amount || !months) {
            alert('All fields are mandatory');
            return;
        }
        setIsLoadingEdit(true);
        try {
            const response = await fetch(`https://heatmapapi.onrender.com/editPlan/${selectedPlan.sl_no}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ months, amount })
            });
            if (!response.ok) {
                throw new Error('Plan edit failed');
            } else {
                alert('Plan edited successfully');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error editing plan:', error.message);
            alert('Something went wrong. Please try again later');
            window.location.reload();
            setIsLoadingEdit(false);
        }
    };

    const handleSaveClick = () => {
        handlePlanEdit();
        setSelectedPlan(null);
    };
    
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box p={2} />
            <Box sx={{ width: "80%", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                {
                    isLoadingPlans ? <Box style={loadingSpace}><CircularProgress /> </Box> :
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
                                        {plans.map((row, index) => (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                {columns.map((column) => {
                                                    if (column.id === 'action') {
                                                        return (
                                                            <TableCell key={column.id}>
                                                                {selectedPlan && selectedPlan.sl_no === row.sl_no ? (
                                                                    <IconButton onClick={handleSaveClick}>
                                                                        {isLoadingEdit ? <CircularProgress size={20} /> :
                                                                        <SaveAsIcon color="primary" />}
                                                                    </IconButton>
                                                                ) : (
                                                                    <IconButton onClick={() => handleEditClick(row)}>
                                                                            <EditIcon color="primary" />
                                                                    </IconButton>
                                                                )}
                                                            </TableCell>
                                                        );
                                                    } else {
                                                        let value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id}>
                                                                {selectedPlan && selectedPlan.sl_no === row.sl_no && (column.id === 'months' || column.id === 'amount') ? (
                                                                    <TextField
                                                                        name={column.id}
                                                                        value={editValues[column.id]}
                                                                        onChange={handleInputChange}
                                                                        size="small"
                                                                    />
                                                                ) : (
                                                                    <Typography>{value}</Typography>
                                                                )}
                                                            </TableCell>
                                                        );
                                                    }
                                                })}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                }
            </Box>
        </Box>
    );
};
export default PlansPage;