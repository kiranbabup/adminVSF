import React, { useEffect, useState } from "react";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button, LinearProgress, Box, Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PropTypes from "prop-types";
import img1 from '../assets/vstech1.png'
import UploadedFilesTable from "../components/uploadedFilesTable";
import SubScribersTable from "../components/subscribersTable"
import AllUsers from "../components/allUsersTable";
import { useNavigate } from "react-router-dom";
import BroadUplod from "../components/BroadUplod";
import SectorUplod from "../components/SectorUpload";
import StrategyUplod from "../components/StrategyUpload";
import ThematicUplod from "../components/ThematicUpload";
import AllIndicesDataUpload from "../components/AllIndicesDataUpload";
import MonthWeekUpload from "../components/MonthWeekUpload";
import BlogComponent from "../components/BlogComponent";
import CouponsSetup from "../components/CouponsSetup";
import PlansPage from "../components/PlansPage";
import Page404 from "./Page404";

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

const PermanentDrawerLeft = () => {
  const [progress, setProgress] = useState(10);
  const [file, setFile] = useState(null);
  const [uploadStartTime, setUploadStartTime] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navigate = useNavigate();
  const [loadingUploadBtn, setLoadingUploadBtn] = useState(false);
  const [localGet, setlocalGet] = useState("");

  useEffect(() => {
    setlocalGet(JSON.parse(localStorage.getItem("logged")));
  }, [])
  // console.log(localGet);

  useEffect(() => {
    // fetchCouponCodeStatus();
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
    if (localGet === "a") {
      setSelectedItem(index);
    }else{
      navigate("/404");
    }
      // console.log(selectedItem);
    };

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
      setLoadingUploadBtn(true);
      try {
        const response = await fetch('https://heatmapapi.onrender.com/upload-stock&heat-data', {
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
        setLoadingUploadBtn(false);
      }
    }

    //broad api handling
    const handleBroadFileUpload = async (event) => {
      if (!file || !file.name.endsWith('.csv')) {
        alert('Please select a CSV file.');
        return;
      }
      setIsButtonClicked(true);
      setUploadStartTime(Date.now());

      const formData = new FormData();
      formData.append('file', file);

      setLoadingUploadBtn(true);
      try {
        const response = await fetch('https://heatmapapi.onrender.com/upload-broad', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('file uploading failed');
        } else {

          alert('file uploaded successfully');
          window.location.reload();
        }
      } catch (e) {
        console.error('Error uploading file:', e.message);
        alert('something went wrong. please try again later');
        window.location.reload();
        setLoadingUploadBtn(false);
      }
    }

    //strategy api handling
    const handleStrategyFileUpload = async (event) => {
      if (!file || !file.name.endsWith('.csv')) {
        alert('Please select a CSV file.');
        return;
      }
      setIsButtonClicked(true);
      setUploadStartTime(Date.now());

      const formData = new FormData();
      formData.append('file', file);

      setLoadingUploadBtn(true);
      try {
        const response = await fetch('https://heatmapapi.onrender.com/upload-strategy', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('file uploading failed');
        } else {
          alert('file uploaded successfully');
          window.location.reload();
        }
      } catch (e) {
        console.error('Error uploading file:', e.message);
        alert('something went wrong. please try again later');
        window.location.reload();
        setLoadingUploadBtn(false);
      }
    }

    //thematic api handling
    const handleThematicFileUpload = async (event) => {
      if (!file || !file.name.endsWith('.csv')) {
        alert('Please select a CSV file.');
        return;
      }
      setIsButtonClicked(true);
      setUploadStartTime(Date.now());

      const formData = new FormData();
      formData.append('file', file);

      setLoadingUploadBtn(true);
      try {
        const response = await fetch('https://heatmapapi.onrender.com/upload-thematic', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('file uploading failed');
        } else {
          alert('file uploaded successfully');
          window.location.reload();
        }
      } catch (e) {
        console.error('Error uploading file:', e.message);
        alert('something went wrong. please try again later');
        window.location.reload();
        setLoadingUploadBtn(false);
      }
    }

    //sector api handling
    const handleSectorFileUpload = async (event) => {
      if (!file || !file.name.endsWith('.csv')) {
        alert('Please select a CSV file.');
        return;
      }
      setIsButtonClicked(true);
      setUploadStartTime(Date.now());

      const formData = new FormData();
      formData.append('file', file);

      setLoadingUploadBtn(true);
      try {
        const response = await fetch('https://heatmapapi.onrender.com/upload-sector', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('file uploading failed');
        } else {
          alert('file uploaded successfully');
          window.location.reload();
        }
      } catch (e) {
        console.error('Error uploading file:', e.message);
        alert('something went wrong. please try again later');
        window.location.reload();
        setLoadingUploadBtn(false);
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

      setLoadingUploadBtn(true);
      try {
        const response = await fetch('https://heatmapapi.onrender.com/upload-month-week', {
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
        setLoadingUploadBtn(false);
      }
    }

    //blog api handling
    const handleBlogUpload = async (event) => {
      event.preventDefault();
      if (!file) {
        alert('Please select image file');
        return;
      }
      setIsButtonClicked(true);
      setUploadStartTime(Date.now());

      const content = document.getElementById('outlined-multiline-static').value;
      const title = document.getElementById('outlined-multiline-title').value;
      const formData = new FormData();

      formData.append('file', file);
      formData.append('title', title);
      formData.append('content', content);

      if (!content && !title) {
        alert('All fields are mandatory');
        return;
      }
      // console.log(formData);
      setLoadingUploadBtn(true);
      try {
        const response = await fetch('https://heatmapapi.onrender.com/upload-blog', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('blog uploaded failed');
        } else {
          alert('blog uploaded successfully');
          window.location.reload();
        }
      } catch (error) {
        console.error('Error uploading blog:', error.message);
        alert('something went wrong. please try again later');
        window.location.reload();
        setLoadingUploadBtn(false);
      }
    };

    const logout = () => {
      localStorage.removeItem("logged");
      navigate("/login");
    }

    return (
      <>
        {
          localGet !== "a" ? <Page404 />
            :
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />

              <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
              >

                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                  <Typography variant="h6" noWrap component="div">
                    {selectedItem !== null ? ['ALL INDICES DATA', 'BROAD', 'STRATEGY', 'THEMATIC', 'SECTOR', 'MONTH & WEEK', 'UPLOADED FILES', 'ALL USERS', 'SUBSCRIBERS', 'BLOG', "SUBSCRIPTION PLANS", 'COUPON CODE'][selectedItem] : 'ADMIN'}
                  </Typography>
                  <Button variant="h6" sx={{ color: 'white', fontSize: 18 }} onClick={() => logout()}>Logout</Button>
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
                <Box sx={{ display: 'flex', justifyContent: 'center' }}><img src={img1} alt="VS Fintech" style={{ height: '10vh', width: '60%' }} /></Box>
                <Divider />

                <List>
                  {['All Indices Data', 'Broad', 'Strategy', 'Thematic', 'Sector', 'Month & Week', 'Uploaded Files', 'All Users', 'Subscribers', 'Blog', "Subscription Plans", 'Coupon code'].map((text, index) => (
                    <ListItem key={text} disablePadding selected={selectedItem === index} onClick={() => handleListItemClick(index)}>
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
                  selectedItem === null ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                      <img src={img1} alt="VS Fintech" style={{ height: '40vh', width: '65%' }} />
                    </Box> :

                    selectedItem === 0 ?
                      <AllIndicesDataUpload setFile={setFile} handleAllDataFileUpload={handleAllDataFileUpload} loadingUploadBtn={loadingUploadBtn} /> :

                      selectedItem === 1 ?
                        <BroadUplod setFile={setFile} handleBroadFileUpload={handleBroadFileUpload} loadingUploadBtn={loadingUploadBtn} /> :

                        selectedItem === 2 ?
                          <StrategyUplod setFile={setFile} handleStrategyFileUpload={handleStrategyFileUpload} loadingUploadBtn={loadingUploadBtn} /> :

                          selectedItem === 3 ?
                            <ThematicUplod setFile={setFile} handleThematicFileUpload={handleThematicFileUpload} loadingUploadBtn={loadingUploadBtn} /> :

                            selectedItem === 4 ?
                              <SectorUplod setFile={setFile} handleSectorFileUpload={handleSectorFileUpload} loadingUploadBtn={loadingUploadBtn} /> :

                              selectedItem === 5 ?
                                <MonthWeekUpload setFile={setFile} handleMonthAndWeekFileUpload={handleMonthAndWeekFileUpload} loadingUploadBtn={loadingUploadBtn} /> :

                                selectedItem === 6 ?
                                  <UploadedFilesTable /> :

                                  selectedItem === 7 ?
                                    <AllUsers /> :

                                    selectedItem === 8 ?
                                      <SubScribersTable /> :

                                      selectedItem === 9 ?
                                        <BlogComponent setFile={setFile} handleBlogUpload={handleBlogUpload} loadingUploadBtn={loadingUploadBtn} /> :

                                        selectedItem === 10 ?
                                          <PlansPage /> :

                                          selectedItem === 11 ?
                                            <CouponsSetup />
                                            : ''

                }
                <Box sx={{ width: '45%', marginLeft: 45, marginTop: 10, }}>
                  {isButtonClicked && file && <LinearProgressWithLabel value={progress} />}
                </Box>

              </Box>
            </Box>
        }
      </>
    );
  }

  export default PermanentDrawerLeft;