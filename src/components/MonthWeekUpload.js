// MonthWeekUpload
import { Box, Button, TextField } from "@mui/material";
import { uploadPageFormat } from "../assets/styles";

const MonthWeekUpload = ({ setFile, handleMonthAndWeekFileUpload }) => {


    return (
        <Box style={uploadPageFormat} >

            <TextField
                id="outlined-basic"
                variant="outlined"
                type='file'
                name='file'
                sx={{ marginRight: 7 }}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => setFile(event.target.files[0])}
            />

            <Button variant="contained" type='submit' 
            onClick={()=>handleMonthAndWeekFileUpload()} >Upload</Button>
        </Box>
    )
}
export default MonthWeekUpload;