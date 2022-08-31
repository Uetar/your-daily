import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { NextRouter } from "next/router";
import api from "./api/api";
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
import CustomizedSnackbar from "../shared/components/customizedSnackbar";

const Login = () => {
  const [state, setState] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showSnackbarProps, setShowSnackbarProps] = useState<{
    open: boolean;
    severity: AlertColor;
    message: string;
  }>({
    open: false,
    message: "",
    severity: "info",
  });
  const router = useRouter();

  async function fetchUser(username: string, password: string) {
    try {
      const rest = await api.post("api/sm-login", {
        email: username,
        password: password,
      });

      if (rest.status == 200) {
        const authToken = rest.data.Authorization;
        localStorage.setItem("authToken", authToken);
        console.log(authToken);
        setShowSnackbarProps({
          open: true,
          severity: "success",
          message: "authorization done login successfull",
        });

        router.push({
          pathname: "/dashBoard",
          query: {
            category: "all",
          },
        });
      }
    } catch (error: any) {
      setShowSnackbarProps({
        open: true,
        severity: "warning",
        message: "authorization failed ",
      });
      console.log("error");
    }
  }

  return (
    <Box minHeight="100vh" sx={{ background: "#ffcdca" }}>
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
                <Typography
                  variant="h4"
                  align="left"
                  sx={{
                    marginTop: "30px",
                    marginLeft: "10px",
                  }}
                >
                  Log In
                </Typography>
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ marginLeft: "10px", marginBottom: "30px" }}
                >
                  Please login to your account
                </Typography>

                <FormControl
                  variant="outlined"
                  sx={{
                    width: "80%",
                    marginBottom: "20px",
                  }}
                >
                  <TextField
                    label="UserName"
                    color="secondary"
                    placeholder="enter your user id"
                    onChange={(e) => {
                      setState({ ...state, username: e.target.value });

                      console.log(e.target.value);
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
                    width: "80%",
                    marginBottom: "20px",
                  }}
                >
                  <TextField
                    label="Password"
                    color="secondary"
                    placeholder="enter your password"
                    onChange={(e) => {
                      setState({ ...state, password: e.target.value });
                      console.log(e.target.value);
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
                    width: "80%",
                    height: "12%",
                    marginBottom: "20px",
                    backgroundColor: "#F88A12",
                    color: "#ffffff",
                    "&:hover": {
                      border: "0px",
                      color: "gray",
                      backgroundColor: "#F88A12",
                    },
                  }}
                  onClick={async () => {
                    await fetchUser(state.username, state.password);
                  }}
                >
                  Log In
                </Button>

                <CustomizedSnackbar
                  {...showSnackbarProps}
                  handleClose={() =>
                    setShowSnackbarProps((p) => ({ ...p, open: false }))
                  }
                />
                <Typography
                  variant="body1"
                  align="right"
                  sx={{
                    marginRight: "70px",
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
