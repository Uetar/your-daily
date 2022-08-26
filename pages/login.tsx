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
  const [showSnackbar, setShowSnackbar] = useState(false);
  const router = useRouter();

  async function fetchUser(
    username: string,
    password: string,

    router: NextRouter
  ) {
    try {
      const rest = await api.post("api/sm-login", {
        email: username,
        password: password,
      });

      if (rest.status == 200) {
        const authToken = rest.data.Authorization;
        localStorage.setItem("authToken", authToken);
        console.log(authToken);
        router.push({
          pathname: "/dashBoard",
          query: {
            category: "all",
          },
        });
      }
    } catch (error: any) {
      console.log("error");
    }
  }

  return (
    <Box minHeight="100vh" sx={{ background: "#ffcdca" }}>
      <Grid container>
        <Grid item sm={12}>
          <Toolbar
            sx={{
              marginLeft: "100px",
              marginTop: "24px",
            }}
          >
            <Image src="/images/logo.png" alt="logo" width={288} height={106} />
          </Toolbar>
        </Grid>
        <Grid item sm={7}>
          <>
            <Toolbar sx={{ marginTop: "90px", marginLeft: "165px" }}>
              <Image
                src="/images/BgImage.png"
                alt="backgroundImage"
                width={725}
                height={507}
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
                  padding: 4,
                  marginTop: "10px",
                  height: "418px",
                  width: "400px",
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
                  }}
                  onClick={async () => {
                    setShowSnackbar(!showSnackbar);

                    await fetchUser(state.username, state.password, router);
                  }}
                >
                  Log In
                </Button>
                <CustomizedSnackbar showSnackbar={showSnackbar} />
                <Typography
                  variant="body1"
                  align="right"
                  sx={{
                    marginRight: "10%",
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
