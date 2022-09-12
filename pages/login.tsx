import {
  Password,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import React, {  useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Grid,
  Toolbar,
  Paper,
  Typography,
  FormControl,
  IconButton,
  Button,
  InputAdornment,
  AlertColor,
} from "@mui/material";
import { UserContext } from "./userContext";

const Login = () => {
  const [state, setState] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
 
  const router = useRouter();

  const { authToken } = React.useContext(UserContext);

  useEffect(() => {
    if (authToken) {
      router.push({
        pathname: "/dashBoard",
        query: {
          category: "all",
        },
      });
    }
  });
  const { fetchUser } = React.useContext(UserContext);



  return (
    <Box minHeight="100vh">
      <Grid container>
        <Grid item sm={12}>
          <Toolbar
            sx={{
              marginLeft: "50px",
              marginTop: "24px",
            }}
          >
            <Image src="/images/logo.png" alt="logo" width={288} height={106} />
          </Toolbar>
        </Grid>
        <Grid item sm={7}>
          <>
            <Toolbar sx={{ marginTop: "40px", marginLeft: "65px" }}>
              <Image
                src="/images/BgImage.png"
                alt="backgroundImage"
                width={725}
                height={490}
              />
            </Toolbar>
          </>
        </Grid>
        <Grid item sm={4}>
          <>
            <Box>
              <Paper
                elevation={3}
                sx={{
                  marginLeft: "25px",
                  padding: 2,
                  marginTop: "40px",
                  height: "400px",
                  width: "380px",
                  backgroundColor: "white",
                }}
              >
                <Typography variant="h4" align="left">
                  Log In
                </Typography>
                <Typography variant="h6" align="left">
                  Please login to your account
                </Typography>

                <FormControl
                  variant="outlined"
                  sx={{
                    width: "95%",
                    marginBottom: "20px",
                  }}
                >
                  <TextField
                    focused
                    label="UserName"
                    color="secondary"
                    placeholder="enter your user id"
                    onChange={(e) => {
                      setState({ ...state, username: e.target.value });

                      // console.log(e.target.value);
                    }}
                    value={state.username}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>

                <FormControl
                  variant="outlined"
                  sx={{
                    width: "95%",
                    marginBottom: "20px",
                  }}
                >
                  <TextField
                    focused
                    label="Password"
                    color="secondary"
                    placeholder="enter your password"
                    onChange={(e) => {
                      setState({ ...state, password: e.target.value });
                      // console.log(e.target.value);
                    }}
                    type={showPassword ? "text" : "password"}
                    value={state.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>

                <Button
                  sx={{
                    width: "95%",
                    height: "12%",
                    marginBottom: "20px",
               
                  }}
                  onClick={async () => {
                    await fetchUser(state.username, state.password);
                  }}
                >
                  Log In
                </Button>
                <Typography
                  variant="body1"
                  align="right"
                  sx={{
                    marginRight: "18px",
                    color: "#F88A12",
                  }}
                >
                  Forgot Password?
                </Typography>
              </Paper>
            </Box>
          </>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
