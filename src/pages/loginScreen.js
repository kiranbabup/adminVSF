import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useNavigate } from "react-router-dom";

const mainBox ={
  display: 'flex',
  justifyContent:'center',
  alignItems:'center',
  height:'100vh',
  backgroundColor:'#0E1C21'
}

const inputBox={
  display: 'flex',
  height: '60vh',
  width: '40vw',
  justifyContent:'center',
   alignItems:'center',
  border:'solid 1px black',
  borderRadius:1,
  flexDirection:'column',
  backgroundColor:'#16292F'
}
const TextFieldStyle ={
    color:'white',
    borderColor:'#00B9E0',
    width:'30vw',
}
const TextFieldLabelStyle ={
    color:'white',
}
const iconStyle = {
    color: '#00B9E0',
    fontSize: 60 
  };
const LoginScreen = () => {
    const [email,setEmail]= useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin =()=>{
        if(email === 'admin@gmail.com' && password === '123@Apple'){
            navigate("/home")
            // window.location.href='/home';
        }else{
            alert('Invalid Credentials');
        }
    }
    

    return(
       <Box sx={mainBox}>
        <Box sx={inputBox}>
            <VpnKeyIcon sx={iconStyle}/>
            <Typography fontWeight='bold' color='white'>ADMIN PANEL</Typography>
            <br></br>
            <TextField id="email" label="E-MAIL" variant="filled" type="email" value={email} inputProps={{style:TextFieldStyle}} InputLabelProps={{style:TextFieldLabelStyle}} onChange={(e)=> setEmail(e.target.value)}/>
            <br></br>
            <TextField id="password" label="PASSWORD" variant="filled" type="password" value={password} inputProps={{style:TextFieldStyle}} InputLabelProps={{style:TextFieldLabelStyle}} onChange={(e) => setPassword(e.target.value)}/>
            <br></br>
           
            <Button 
                    variant="outlined" 
                    sx={{color:'#00B9E0',fontWeight:'bold'}} 
                    onClick={handleLogin}
                >
                    Login
            </Button>
        </Box>
       </Box>
    );
}

export default LoginScreen;