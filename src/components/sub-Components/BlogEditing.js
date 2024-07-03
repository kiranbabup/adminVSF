import { Box, Button, Card, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import { loadingSpaceA } from "../../assets/styles";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BlogEditing = () => {
    const [resultData, setResultData] = useState([]);
    const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
    const [isLoadingBlogUpdate, setIsLoadingBlogUpdate] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [file, setFile] = useState(null);

    const handleOpen = (blog) => {
        setSelectedBlog(blog);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedBlog(null);
        setFile(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingBlogs(true);
            try {
                const response = await fetch(`https://heatmapapi.onrender.com/getblogsdata`);
                if (!response.ok) {
                    throw new Error(`http error status: ${response.status}`);
                }
                const result = await response.json();
                // console.log(result);
                setResultData(result.data);
            } catch (error) {
                console.error("Error fetching blog data:", error);
            } finally {
                setIsLoadingBlogs(false);
            }
        };
        fetchData();
    }, []);

    // console.log(resultData);

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };
    
    // if (!file) {
    //     alert('Please select image file');
    //     return;
    // }
    // setIsButtonClicked(true);
    const handleBlogEdit = async (event) => {
        event.preventDefault();

        const title = document.getElementById('edit-title').value;
        const content = document.getElementById('edit-content').value;
        if (!content && !title) {
            alert('All fields are mandatory');
            return;
        }
        const formData = new FormData();

        // formData.append('file', file);
        if (file) {
            formData.append('file', file);
        }
        formData.append('title', title);
        formData.append('content', content);

        console.log(formData);
        setIsLoadingBlogUpdate(true);
        try {
            const response = await fetch(`https://heatmapapi.onrender.com/editBlog/${selectedBlog.slno}`, {
                method: 'PUT',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('blog edit failed');
            } else {
                alert('blog edited successfully');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error editing blog:', error.message);
            alert('something went wrong. please try again later');
            window.location.reload();
            setIsLoadingBlogUpdate(false);
        }
    };
    return (
        <Box>
            <Box sx={{ backgroundColor: "aliceblue" }}>
                {
                    isLoadingBlogs ? <Box style={loadingSpaceA}><CircularProgress /> </Box> :
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, py: 2 }}>
                            {resultData.slice().reverse().map((item, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        px: { xs: 1 },
                                        py: { xs: 1 },
                                        width: { xs: "310px", sm: "80%" },
                                        display: "flex",
                                        flexDirection: { sm: "row", xs: "column" },
                                        gap: 2,
                                    }}
                                >
                                    {item.image && item.image.data ? (
                                        <Box
                                            sx={{
                                                width: { xs: "100%", sm: "50%" },
                                                borderRadius: "10px",
                                                maxHeight:"20rem"
                                            }}
                                            component="img"
                                            src={`data:image/jpeg;base64,${arrayBufferToBase64(item.image.data)}`}
                                            alt="Bolg Image"
                                        />
                                    ) : null}
                                    <Box sx={{ width: { xs: "100%", sm: "50%" }, position: "relative" }}>
                                        <Button sx={{ position: "absolute", right: 0, top: 0 }} onClick={() => handleOpen(item)} ><EditIcon /></Button>
                                        <Typography sx={{ fontSize: { xs: 17, sm: 23 }, fontWeight: "bold" }}>
                                            {item.title}
                                        </Typography>
                                        <Box p={1} />
                                        <Typography
                                            sx={{ fontSize: { xs: 14, sm: 16 }, textAlign: "justify", textIndent: "30px" }}
                                        >
                                            {item.content}
                                        </Typography>
                                    </Box>
                                </Card>
                            ))}
                        </Box>
                }
            </Box>
            {selectedBlog && (
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleBlogEdit}
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
                                    style={{ width: "30%", }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(event) => setFile(event.target.files[0])}
                                />
                                <TextField
                                    id="edit-title"
                                    label="Write Title"
                                    defaultValue={selectedBlog.title}
                                    multiline
                                    rows={1}
                                    style={{ width: '70%' }}
                                />
                            </Box>
                            <TextField
                                id="edit-content"
                                label="Write Content"
                                defaultValue={selectedBlog.content}
                                multiline
                                rows={5}
                                style={{ width: '100%' }}
                            />
                            <Box sx={{display:"flex", justifyContent:"center"}}>
                                { isLoadingBlogUpdate ? <CircularProgress sx={{marginTop: 2}} size={24} />:
                                <>
                            <Button variant="contained" type='submit' sx={{ marginLeft: 1, marginTop: 2 }}>Update</Button>

                            <Button variant="contained" onClick={()=>handleClose()} sx={{ marginLeft: 1, marginTop: 2 }}>Cancel</Button></>}
                        </Box>
                        </Box>
                    </Box>
                </Modal>
            )}
        </Box>
    );
};
export default BlogEditing;