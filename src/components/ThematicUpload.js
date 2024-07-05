import { Box, Button, TextField, Typography } from "@mui/material";
import { noteBox, noteStyle, uploadLoadingSpace, uploadPageFormat } from "../assets/styles";
import CircularProgress from '@mui/material/CircularProgress';
import ReadExcel from "./sub-Components/ReadExcel";
import ThematicExample from "../assets/ThematicExample.xlsx";

const ThematicUplod = ({ setFile, handleThematicFileUpload, loadingUploadBtn }) => {
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
                            onClick={() => handleThematicFileUpload()}>Upload</Button>
                    </Box>
            }
            <Box p={4}/>
            <Box style={noteBox}>
                <Typography style={noteStyle}>Note :</Typography>
                <Typography >LeftSide names-list are the unique in order so dont miss any or dont replace with one another.</Typography>
            </Box>
            <ReadExcel file={ThematicExample} name={"ThematicExample"} />
        </Box>
    )
}
export default ThematicUplod;