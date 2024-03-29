import React, { useState } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button, TextField ,LinearProgress, Card, CardActionArea, CardMedia, CardContent, CardActions, MenuItem, InputLabel, FormControl} from '@mui/material';
import PropTypes from "prop-types";
import img1 from '../assets/vstech1.png'
import UploadedFilesTable from "./uploadedFilesTable";
import SubScribersTable from "./subscribersTable"
import AllUsers from "./allUsersTable";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;


function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 0 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
 
LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const PermanentDrawerLeft=()=> {
    const [progress, setProgress] = React.useState(10);
    const [file,setFile] = React.useState(null);
    const [uploadStartTime, setUploadStartTime] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const [status, setStatus] = useState('');
    const [activationStatus, setActivationStatus] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const handleChange = (event) => {
      const newStatus = event.target.value;
      setActivationStatus(newStatus);
      console.log(newStatus);
      toggleCouponActivation(newStatus);
      window.alert('updated sucessfully');
      window.location.reload();
    };

    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
  

    const getStatusText = () => {
      return status === 0 ? 'Deactivated' : 'Activated';
    };
  
    const getStatusColor = () => {
      return status === 0 ? 'red' : 'green';
    };

    React.useEffect(() => {
      fetchCouponCodeStatus();
      const timer = setInterval(() => {
        if (uploadStartTime) {
          const currentTime = Date.now();
          const elapsedTime = currentTime - uploadStartTime;
          const uploadSpeed = progress / (elapsedTime / 1000); // Bytes per millisecond
          const estimatedTimeRemaining = (100 - progress) / uploadSpeed;
          const estimatedUploadEndTime = uploadStartTime + estimatedTimeRemaining;
          const remainingTime = estimatedUploadEndTime - currentTime;
          if (remainingTime > 0) {
            const updatedProgress = progress + (100 - progress) * (1 - (remainingTime / estimatedTimeRemaining));
            setProgress(Math.min(updatedProgress, 100));
          } else {
            setProgress(100); // Ensure progress reaches 100% even if the remaining time is negative
          }
        }
      }, 100); // Update progress every 100 milliseconds
      return () => {
        clearInterval(timer);
      };
    }, [progress, uploadStartTime]);

    const handleListItemClick = (index) => {
      setSelectedItem(index); 
      console.log(selectedItem);
    };



// coupon code api handling
const toggleCouponActivation = (status) => {
  const url = 'http://localhost:4000/handle-couponcode';
  const data = { status: status };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};

// get coupon code status
const fetchCouponCodeStatus = () => {
  fetch('http://localhost:4000/couponCode-status')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch status data');
      }
      return response.json();
    })
    .then(data => {
      // Assuming data is an array with a single status object
      if (Array.isArray(data.results) && data.results.length > 0) {
        setStatus(data.results[0].status);
      } else {
        throw new Error('Invalid data format');
      }
    })
    .catch(error => {
      console.error('Error fetching status data:', error);
    });
};

//blog api handling
const handleBlogUpload = async(event)=>{
  if(!file){
    alert('Please select image file');
    return;
  }
  setIsButtonClicked(true);
  setUploadStartTime(Date.now());

  const content = document.getElementById('outlined-multiline-static').value;
  const formData = new FormData();

  formData.append('file',file);
  formData.append('content',content);

  if(!content){
    alert('All fields are mandatory');
    return;
  }

  try{
    const response = await fetch('http://localhost:4000/upload-blog',{
      method:'POST',
      body:formData,
    });
    console.log(formData);
    if(!response.ok){
      throw new Error('blog uploaded failed');
    }else{
      alert('blog uploaded successfully');
      window.location.reload();
    }
  }catch(error){
    console.error('Error uploading blog:', error.message);
    alert('something went wrong. please try again later');
    window.location.reload();
  }
}



  //broad api handling
  const handleBroadFileUpload = async(event)=>{
    if (!file || !file.name.endsWith('.csv')) {
      alert('Please select a CSV file.');
      return;
    }
    setIsButtonClicked(true);
    setUploadStartTime(Date.now());
  
    const formData = new FormData();
    formData.append('file', file);

    try{
      const response = await fetch('http://localhost:4000/upload-broad',{
        method:'POST',
        body:formData,
      });
      if(!response.ok){
        throw new Error('file uploading failed');
      }else{
        
        alert('file uploaded successfully');
        window.location.reload();
      }
    }catch(e){
      console.error('Error uploading file:', e.message);
      alert('something went wrong. please try again later');
      window.location.reload();
    }
  }


  //strategy api handling
  const handleStrategyFileUpload = async(event)=>{
    if (!file || !file.name.endsWith('.csv')) {
      alert('Please select a CSV file.');
      return;
    }
    setIsButtonClicked(true);
    setUploadStartTime(Date.now());
  
    const formData = new FormData();
    formData.append('file', file);

    try{
      const response = await fetch('/upload-strategy',{
        method:'POST',
        body:formData,
      });
      if(!response.ok){
        throw new Error('file uploading failed');
      }else{
        alert('file uploaded successfully');
        window.location.reload();
      }
    }catch(e){
      console.error('Error uploading file:', e.message);
      alert('something went wrong. please try again later');
      window.location.reload();
    }
  }


//thematic api handling
  const handleThematicFileUpload = async(event)=>{
    if (!file || !file.name.endsWith('.csv')) {
      alert('Please select a CSV file.');
      return;
    }
    setIsButtonClicked(true);
    setUploadStartTime(Date.now());
  
    const formData = new FormData();
    formData.append('file', file);

    try{
      const response = await fetch('/upload-thematic',{
        method:'POST',
        body:formData,
      });
      if(!response.ok){
        throw new Error('file uploading failed');
      }else{
        alert('file uploaded successfully');
        window.location.reload();
      }
    }catch(e){
      console.error('Error uploading file:', e.message);
      alert('something went wrong. please try again later');
      window.location.reload();
    }
  }


//sector api handling
  const handleSectorFileUpload = async(event)=>{
    if (!file || !file.name.endsWith('.csv')) {
      alert('Please select a CSV file.');
      return;
    }
    setIsButtonClicked(true);
    setUploadStartTime(Date.now());
  
    const formData = new FormData();
    formData.append('file', file);

    try{
      const response = await fetch('/upload-sector',{
        method:'POST',
        body:formData,
      });
      if(!response.ok){
        throw new Error('file uploading failed');
      }else{
        alert('file uploaded successfully');
        window.location.reload();
      }
    }catch(e){
      console.error('Error uploading file:', e.message);
      alert('something went wrong. please try again later');
      window.location.reload();
    }
  }



  //all indices data api handling
  const handleAllDataFileUpload = async () => {
  if (!file || !file.name.endsWith('.csv')) {
    alert('Please select a CSV file.');
    return;
  }
  setIsButtonClicked(true);
  setUploadStartTime(Date.now());

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/upload-stock&heat-data', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('File uploading failed');
    } else {
      alert('File uploaded successfully');
      window.location.reload();
    }
  } catch (e) {
    console.error('Error uploading file:', e.message);
    alert('Something went wrong. Please try again later');
    window.location.reload();
  }
}



  //month and week data api handling
  const handleMonthAndWeekFileUpload = async () => {
    if (!file || !file.name.endsWith('.csv')) {
      alert('Please select a CSV file.');
      return;
    }
    setIsButtonClicked(true);
    setUploadStartTime(Date.now());
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('http://localhost:4000/upload-month-week', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('File uploading failed');
      } else {
        alert('File uploaded successfully');
        window.location.reload();
      }
    } catch (e) {
      console.error('Error uploading file:', e.message);
      alert('Something went wrong. Please try again later');
      window.location.reload();
    }
  }


  function logout(){
    navigate("/")
    // window.location.href='/'
  }



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        
        <Toolbar sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>

          <Typography variant="h6" noWrap component="div">
          {selectedItem !== null ? ['BROAD', 'STRATEGY', 'THEMATIC', 'SECTOR','STOCK & HEAT','MONTH & WEEK','ALL USERS','SUBSCRIBERS','UPLOADED FILES','BLOG','COUPON CODE'][selectedItem] : 'ADMIN'}
          </Typography>
          <Button variant="h6" sx={{color:'white',fontSize:18}} onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{display:'flex',justifyContent:'center'}}><img src={img1} style={{height:'10vh',width:'60%'}}></img></Box>
        <Divider />
        <List>
          {['Broad', 'Strategy', 'Thematic', 'Sector','Stock & Heat','Month & Week','All Users','Subscribers','Uploaded Files','Blog','Coupon code'].map((text, index) => (
            <ListItem key={text} disablePadding selected={selectedItem === index} onClick={()=> handleListItemClick(index)}>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />

        {
          selectedItem === null? <Box sx={{display:'flex',justifyContent:'center',marginTop:10}}><img src={img1} style={{height:'40vh',width:'65%'}}></img></Box>:
        
          selectedItem ===0?
          <Box sx={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center', marginTop:10}}>

         <TextField id="outlined-basic"  variant="outlined" type='file' name='file' sx={{marginRight:7}} InputLabelProps={{
           shrink: true,
         }} onChange={(event)=> setFile(event.target.files[0])}/>

         <Button variant="contained" type='submit' onClick={handleBroadFileUpload}>Upload</Button>
        </Box>:


          selectedItem ===1?
          <Box sx={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center', marginTop:10}}>

         <TextField id="outlined-basic"  variant="outlined" type='file' name='file' sx={{marginRight:7}} InputLabelProps={{
           shrink: true,
         }} onChange={(event)=> setFile(event.target.files[0])}/>

         <Button variant="contained" type='submit' onClick={handleStrategyFileUpload}>Upload</Button>
        </Box>:
        
          selectedItem ===2?
          <Box sx={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center', marginTop:10}}>

         <TextField id="outlined-basic"  variant="outlined" type='file' name='file' sx={{marginRight:7}} InputLabelProps={{
           shrink: true,
         }}onChange={(event)=> setFile(event.target.files[0])}/>

         <Button variant="contained" type='submit' onClick={handleThematicFileUpload}>Upload</Button>
        </Box>
        :
        
          selectedItem ===3?
          <Box sx={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center', marginTop:10}}>

         <TextField id="outlined-basic"  variant="outlined" type='file' name='file' sx={{marginRight:7}} InputLabelProps={{
           shrink: true,
         }} onChange={(event)=> setFile(event.target.files[0])}/>

         <Button variant="contained" type='submit' onClick={handleSectorFileUpload}>Upload</Button>
        </Box>
        :
        
        
          selectedItem ===4?
          <Box sx={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center', marginTop:10}}>

         <TextField id="outlined-basic"  variant="outlined" type='file' name='file' sx={{marginRight:7}} InputLabelProps={{
           shrink: true,
         }} onChange={(event)=> setFile(event.target.files[0])}/>

           <Button variant="contained" type='submit'  onClick={handleAllDataFileUpload} >Upload</Button>
          </Box>:

         selectedItem ===5?
         <Box sx={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center', marginTop:10}}>

         <TextField id="outlined-basic"  variant="outlined" type='file' name='file' sx={{marginRight:7}} InputLabelProps={{
           shrink: true,
         }} onChange={(event)=> setFile(event.target.files[0])}/>

           <Button variant="contained" type='submit'  onClick={handleMonthAndWeekFileUpload} >Upload</Button>
          </Box>:

          selectedItem === 6?
            <AllUsers/>
            
          :

          selectedItem === 7?
          <SubScribersTable/>:

          selectedItem === 8?
          <UploadedFilesTable/>:

          selectedItem ===9?
          <Box>
            <Box sx={{width:'100%',display:'flex',justifyContent:'start',alignItems:'center', marginTop:5,marginLeft:1,marginBottom:2}}>

              <TextField id="outlined-basic" label='Select Image'  variant="outlined" type='file' name='file' sx={{marginRight:7}} InputLabelProps={{
                shrink: true,
              }} onChange={(event)=> setFile(event.target.files[0])}/>
            </Box>
        
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
            <div>
              <TextField
                id="outlined-multiline-static"
                label="Write Content"
                multiline
                rows={8}
                style={{width:'100%'}}
              />
            </div>
           </Box>
        
        <Button variant="contained" type='submit' onClick={handleBlogUpload} sx={{marginLeft:1,marginTop:2}}>Upload</Button>
        </Box>  
          :
          selectedItem === 10?
          <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',gap:10}}>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
             <Typography variant="h5">Coupon Code Status:</Typography>
             <Typography variant="h5" style={{color:getStatusColor()}}>{getStatusText()}</Typography>
            </Box>
            
             <Card sx={{ width:400}}>
            <CardActionArea>
              <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Typography sx={{padding:2}}>COUPON CODE:</Typography>
                <Typography sx={{color:'green',fontWeight:'bold'}}>KJADJ898</Typography>
              </Box>
              
              <CardContent>
                <FormControl sx={{ m: 1, minWidth: 150,  }}>
                <InputLabel id="demo-controlled-open-select-label" >{getStatusText()}</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={activationStatus}
                  label="Status"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Activate</MenuItem>
                  <MenuItem value={0}>Deactivate</MenuItem>
                </Select>
              </FormControl>
              </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
          </Card>
          </Box>:''

        }
        <Box sx={{ width: '30%' ,marginTop:2,marginLeft:35,marginTop:10}}>
              { isButtonClicked && file && <LinearProgressWithLabel value={progress} />}
        </Box>
      
      </Box>
    </Box>
  );
}

export default PermanentDrawerLeft;