import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import router from "next/router";
import AddItem from "../shared/components/AddItem";
import Image from "next/image";
import Tabs from "../shared/components/Tabs";
import { Grid } from "@mui/material";
import DataTable from "../shared/components/Table";
import { useState } from "react";
// import CustomizedSnackbar from "../shared/components/customizedSnackbar";
import { FetchData } from "../shared/components/Table";
// import Login from "../pages/login";

const Dashboard = () => {
  const [showAdd, setShowAdd] = useState(false);
  const { items, setItems } = FetchData();
  const [showSnackbar, setShowSnackbar] = useState(false);

  return (
    <Box minHeight="100vh" sx={{ flexGrow: 1, background: "#ffcdca" }}>
      <AppBar position="static" sx={{ backgroundColor: "#F88A12" }}>
        <Toolbar>
          <Image
            src="/images/logoSmall.png"
            alt="dashboard-logo"
            height={41}
            width={50}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton>
            <PersonAddAltIcon fontSize="medium" sx={{ color: "#ffffff" }} />
          </IconButton>
          <IconButton>
            <LogoutIcon
              fontSize="medium"
              sx={{ color: "#ffffff" }}
              onClick={() => {
                window.localStorage.removeItem("authToken");
                router.replace("/login");
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid
        item
        sm={12}
        sx={{ display: "flex", justifyContent: "space-around" }}
      >
        <Grid item sm={6}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ color: "#F88A12", margin: 4, fontWeight: "bold" }}
            onClick={() => {
              if (localStorage.getItem("authToken")) router.back();
              else
                router.push({
                  pathname: "/login",
                });
            }}
          >
            back
          </Button>
        </Grid>
        <h2>Items</h2>
        <Grid item sm={6}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ color: "#F88A12", margin: 4, fontWeight: "bold" }}
            onClick={() => setShowAdd(true)}
          >
            + Add Items
          </Button>
        </Grid>
      </Grid>
      <Tabs items={items} />

      <DataTable items={items} setItems={setItems} />
      <AddItem showAdd={showAdd} setShowAdd={setShowAdd} setItems={setItems} />
      {/* <CustomizedSnackbar showSnackbar={showSnackbar} /> */}
    </Box>
  );
};
export default Dashboard;
