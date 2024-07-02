import { Box, Button, TextField } from "@mui/material";
import BlogEditing from "./sub-Components/BlogEditing";
// import { LoadingButton } from '@mui/lab';

const BlogComponent = ({ setFile, handleBlogUpload }) => {


    return (
        <Box>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleBlogUpload}
            >
                <Box sx={{
                    width: '100%', display: 'flex', justifyContent: 'start', alignItems: 'center', marginTop: 1,
                }}>
                    <TextField
                        id="outlined-basic"
                        label='Select Image'
                        variant="outlined"
                        type='file'
                        name='file'
                        style={{ width: "30%" }}
                        InputLabelProps={{ shrink: true }}
                        onChange={(event) => setFile(event.target.files[0])}
                    />
                    <TextField
                        id="outlined-multiline-title"
                        label="Write Title"
                        multiline
                        rows={1}
                        style={{ width: '70%' }}
                    />
                </Box>
                <TextField
                    id="outlined-multiline-static"
                    label="Write Content"
                    multiline
                    rows={5}
                    style={{ width: '100%' }}
                />
                <Box sx={{display:"flex", justifyContent:"end"}}>
                    <Button variant="contained" type='submit' sx={{ marginLeft: 1, marginTop: 2 }}>Upload</Button>
                </Box>
            </Box>
            <Box p={2} />
            <Box>
                <BlogEditing />
            </Box>
        </Box>
    )
}
export default BlogComponent;