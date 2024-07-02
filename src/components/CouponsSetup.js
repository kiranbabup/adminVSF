import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import CouponsEdit from "./sub-Components/CouponsEdit";

const CouponsSetup = () => {
    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState('');
    const [loadingAddBtn, setLoadingAddBtn] = useState(false);

    const handleAddCode = async (event) => {
        event.preventDefault();

        const codeRegex = /^[a-zA-Z0-9]{10}$/;

        if (!code || !discount) {
            alert('All fields are mandatory');
            return;
        }

        if (!codeRegex.test(code)) {
            alert('Coupon code must be exactly 10 alphanumeric characters.');
            return;
        }

        const discountValue = parseInt(discount, 10);
        if (isNaN(discountValue) || discountValue < 0 || discountValue > 100) {
            alert('Discount value must be a number between 0 and 100.');
            return;
        }
        setLoadingAddBtn(true);

        try {
            const response = await fetch('https://heatmapapi.onrender.com/uploadcouponcode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ coupon_code: code, discount: discountValue }),
            });
            if (!response.ok) {
                throw new Error('Coupon Code adding failed');
            } else {
                alert('Coupon Code Added successfully');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error adding Coupon Code:', error.message);
            alert('Something went wrong. Please try again later.');
            window.location.reload();
            setLoadingAddBtn(false);
        }
    };

    const handleDiscountChange = (e) => {
        const value = e.target.value;
        if (value === '' || (value.match(/^[0-9]+$/) && Number(value) <= 100)) {
            setDiscount(value);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection:"column", alignItems: "center" }}>
            <Box sx={{ width: "90%", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: "10px 40px" }}>
                <Box
                    component="form"
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleAddCode}
                >
                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <Typography>Coupon Code :</Typography>
                            <TextField
                                id="outlined-basic"
                                label="Write Coupon code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                multiline
                                rows={1}
                                style={{ width: '50%' }}
                                inputProps={{ maxLength: 10 }}
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Typography>Discount Percentage :</Typography>
                            <TextField
                                id="outlined-basic"
                                label="Write Discount Value"
                                value={discount}
                                onChange={handleDiscountChange}
                                type="text"
                                multiline
                                rows={1}
                                style={{ width: '50%' }}
                                inputProps={{ maxLength: 3 }}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                        <Button variant="contained" type='submit' disabled={loadingAddBtn}>
                            {loadingAddBtn ? <CircularProgress size={24} /> : 'Add'}
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box p={1}/>
            <CouponsEdit/>
        </Box>
    );
};

export default CouponsSetup;
