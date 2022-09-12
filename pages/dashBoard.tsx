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
import { AlertColor, Grid } from "@mui/material";
import DataTable from "../shared/components/Table";
import { useState, useEffect } from "react";
import CustomizedSnackbar from "../shared/components/customizedSnackbar";
import { UserContext } from "./userContext";
import api from "./api/api";

export const FetchData = () => {
  const [items, setItems] = useState([]);
  const { authToken } = React.useContext(UserContext);
  useEffect(() => {
    const FetchData = async () => {
      try {
        if (authToken) {
          const { data } = await api.get("/api/store-manager/item", {
            headers: {
              Authorization: authToken,
            },
          });
          setItems(data);
        } else {
          router.push("/login");
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    if (items.length == 0) FetchData();
  }, [authToken, items]);
  return { items, setItems };
};

const Dashboard = () => {
  const [showAdd, setShowAdd] = useState(false);
  const { items, setItems } = FetchData();
  const [showSnackbarProps, setShowSnackbarProps] = useState<{
    open: boolean;
    severity: AlertColor;
    message: string;
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSnackbar = React.useCallback(() => {
    setShowSnackbarProps({
      open: true,
      severity: "success",
      message: "item added successfully",
    });
  }, []);
  const { logOut } = React.useContext(UserContext);
  function HandleLogOut() {
    logOut();
    router.replace("/login");
  }
  const { authToken } = React.useContext(UserContext);
  function handleBack() {
    authToken ? router.back() : router.replace("/login");
  }
  return (
    <Box minHeight="100vh" sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#F88A12" }}>
        <Toolbar>
          <Image
            src="/images/logoSmall.png"
            alt="dashboard-logo"
            height={41}
            width={50}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#FFFFFF", margin: 2 }}
          >
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
                HandleLogOut();
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
            sx={{ margin: 4, fontWeight: "bold" }}
            onClick={() => {
              handleBack();
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
            onClick={() => setShowAdd(true)}
          >
            + Add Items
          </Button>
        </Grid>
      </Grid>
      <CustomizedSnackbar
        {...showSnackbarProps}
        handleClose={() =>
          setShowSnackbarProps((p: any) => ({ ...p, open: false }))
        }
      />
      <Tabs items={items} />
      <DataTable items={items} setItems={setItems} />
      <AddItem
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        setItems={setItems}
        handleSnackbar={handleSnackbar}
      />
    </Box>
  );
};
export default Dashboard;
