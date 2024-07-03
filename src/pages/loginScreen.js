import { Box, Button, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";

const mainBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#0E1C21'
};

const inputBox = {
  display: 'flex',
  height: '60vh',
  width: '40vw',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'solid 1px black',
  borderRadius: 1,
  flexDirection: 'column',
  backgroundColor: '#16292F'
};

const TextFieldStyle = {
  color: 'white',
  borderColor: '#00B9E0',
  width: '30vw'
};
const TextFieldStyleA = {
    color: 'white',
    borderColor: '#00B9E0',
    width: '27vw'
  };
const TextFieldLabelStyle = {
  color: 'white'
};

const iconStyle = {
  color: '#00B9E0',
  fontSize: 60
};

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'vsf@admin' && password === '123@Apple') {
      localStorage.setItem("logged", JSON.stringify("a"));
      const logdata = JSON.parse(localStorage.getItem("logged"));
      if (logdata === "a") {
        navigate("/home");
      } else {
        navigate("/404");
      }
    } else {
      alert('Invalid Credentials');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Box sx={mainBox}>
      <Box sx={inputBox}>
        <VpnKeyIcon sx={iconStyle} />
        <Typography fontWeight='bold' color='white'>ADMIN LOGIN</Typography>
        <br />

        <TextField 
          id="email" 
          label="E-MAIL" 
          variant="filled" 
          type="email" 
          value={email} 
          inputProps={{ style: TextFieldStyle }} 
          InputLabelProps={{ style: TextFieldLabelStyle }} 
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress} 
        />
        <br />
        <TextField 
          id="password" 
          label="PASSWORD" 
          variant="filled" 
          type={showPassword ? "text" : "password"} 
          value={password} 
          inputProps={{ style: TextFieldStyleA }} 
          InputLabelProps={{ style: TextFieldLabelStyle }} 
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress} 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <br />
        <Button
          variant="outlined"
          sx={{ color: '#00B9E0', fontWeight: 'bold' }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default LoginScreen;
