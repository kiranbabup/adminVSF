// AllIndicesDataUpload
import { Box, Button, TextField, Typography } from "@mui/material";
import { noteBox, noteStyle, uploadLoadingSpace, uploadPageFormat } from "../assets/styles";
import CircularProgress from '@mui/material/CircularProgress';
import ReadExcel from "./sub-Components/ReadExcel";
import AllIndicesExample from "../assets/AllIndicesExample.xlsx";

const AllIndicesDataUpload = ({ setFile, handleAllDataFileUpload, loadingUploadBtn }) => {
    return (
        <Box  >
            {
                loadingUploadBtn ? <Box style={uploadLoadingSpace}><CircularProgress sx={{ marginRight: "1rem" }} size={24} /> Loading . . .</Box> :
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
                            onClick={() => handleAllDataFileUpload()} >upload</Button>
                    </Box>
            }
            <Box p={4}/>
            <Box style={noteBox}>
                <Typography style={noteStyle}>Note:</Typography>
                <Typography >Data should be filled according to names-list, Naming format should not be replaced or shifted. File name should not have space.</Typography>
            </Box>
            <ReadExcel file={AllIndicesExample} name={"AllIndicesExample"} />
        </Box>
    )
}
export default AllIndicesDataUpload;