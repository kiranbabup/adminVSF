import { Box, Button, TextField } from "@mui/material";
import { uploadPageFormat } from "../assets/styles";

const StrategyUplod = ({ setFile, handleStrategyFileUpload}) => {


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
            onClick={()=>handleStrategyFileUpload()}>Upload</Button>
        </Box>
    )
}
export default StrategyUplod;