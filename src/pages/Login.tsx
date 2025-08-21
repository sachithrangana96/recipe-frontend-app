import { useState } from 'react';
import { Box, Tab, Tabs, Typography, TextField, Button, Paper, Link, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { login, register } from '../api/authApi';
import { useNavigate } from "react-router-dom";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Login() {
  const navigate = useNavigate();

  const [value, setValue] = useState(0);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };



  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    formType: "login" | "register"
  ) => {
    const { name, value } = e.target;

    if (formType === "login") {
      setLoginForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setRegisterForm((prev) => ({ ...prev, [name]: value }));
    }

    console.log(`${formType} - ${name}:`, value);
  };


  const handleLogin = async () => {
    if (loginForm.email === '' || loginForm.password === '') {
      setIsFormValid(true);
      return;
    }
    const res = await login({ email: loginForm?.email, password: loginForm?.password });
    localStorage.setItem("token", res.token);
    navigate("/dashboard");

  };



  const handleRegister = async () => {
    if (
      registerForm.username === '' ||
      registerForm.email === '' ||
      registerForm.password === '' ||
      registerForm.confirmPassword === ''
    ) {
      setIsFormValid(true);
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const res = await register({ name: registerForm?.username, email: registerForm?.email, password: registerForm?.password });
    localStorage.setItem("token", res.token);
    navigate("/dashboard");

  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2,
        maxWidth: 550,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 4,
          width: '400px',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab
              label="Login"
              icon={<LockOutlinedIcon />}
              iconPosition="start"
              {...a11yProps(0)}
              sx={{ textTransform: 'none' }}
            />
            <Tab
              label="Register"
              icon={<PersonAddOutlinedIcon />}
              iconPosition="start"
              {...a11yProps(1)}
              sx={{ textTransform: 'none' }}
            />
          </Tabs>
        </Box>

        {/* ✅ Login Tab */}
        <TabPanel value={value} index={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography component="h1" variant="h5" align="center">
              Sign in
            </Typography>
            <TextField
              required
              fullWidth
              label="Email Address"
              name="email"
              value={loginForm.email}
              onChange={(e) => handleInputChange(e, "login")}
            />
            {loginForm.email === '' && isFormValid && (
              <Typography color="error">This field is required!</Typography>
            )}
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={loginForm.password}
              onChange={(e) => handleInputChange(e, "login")}
            />
            {loginForm.password === '' && isFormValid && (
              <Typography color="error">This field is required!</Typography>
            )}
            <Button variant="contained" fullWidth onClick={handleLogin}>
              Sign In
            </Button>
            <Grid container>
              <Link
                href="#"
                variant="body2"
                onClick={() => setValue(1)}
                sx={{ marginLeft: 'auto' }}
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Box>
        </TabPanel>

        {/* ✅ Register Tab */}
        <TabPanel value={value} index={1}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography component="h1" variant="h5" align="center">
              Sign up
            </Typography>
            <TextField
              required
              fullWidth
              label="Username"
              name="username"
              value={registerForm.username}
              onChange={(e) => handleInputChange(e, "register")}
            />
            {registerForm.username === '' && isFormValid && (
              <Typography color="error">This field is required!</Typography>
            )}
            <TextField
              required
              fullWidth
              label="Email Address"
              name="email"
              value={registerForm.email}
              onChange={(e) => handleInputChange(e, "register")}
            />
            {registerForm.email === '' && isFormValid && (
              <Typography color="error">This field is required!</Typography>
            )}
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={registerForm.password}
              onChange={(e) => handleInputChange(e, "register")}
            />
            {registerForm.password === '' && isFormValid && (
              <Typography color="error">This field is required!</Typography>
            )}
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={registerForm.confirmPassword}
              onChange={(e) => handleInputChange(e, "register")}
            />
            {registerForm.confirmPassword === '' && isFormValid && (
              <Typography color="error">This field is required!</Typography>
            )}
            <Button variant="contained" fullWidth onClick={handleRegister}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Link href="#" variant="body2" onClick={() => setValue(0)}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
}
