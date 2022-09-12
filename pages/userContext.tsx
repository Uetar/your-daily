import { AlertColor } from "@mui/material";
import router from "next/router";
import { createContext, useCallback, useMemo, useState } from "react";
import api from "./api/api";
import CustomizedSnackbar from "../shared/components/customizedSnackbar";

const initialState = {
  authToken: "",
  fetchUser: (username: string, password: any) => Promise.resolve(null),
  logOut: () => null,
};

export const UserContext = createContext(initialState);

export const Context = ({ children }) => {
  const [state, setState] = useState({ authToken: "" });
  const [showSnackbarProps, setShowSnackbarProps] = useState<{
    open: boolean;
    severity: AlertColor;
    message: string;
  }>({
    open: false,
    message: "",
    severity: "info",
  });
  const fetchUser = useCallback(async (username: string, password: any) => {
    try {
      const res = await api.post("api/sm-login", {
        email: username,
        password: password,
      });

      if (res.status == 200) {
        const authToken: string = res.data.Authorization;
        console.log(authToken);
        setState((prev) => ({ ...prev, authToken }));

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
  }, []);

  const logOut = useCallback(() => {
    setState({ authToken: "" });
  }, []);

  const providerValue = useMemo(
    () => ({ ...state, fetchUser, logOut  }),
    [state, fetchUser, logOut]
  );

  return (
    <UserContext.Provider value={providerValue}>
      <CustomizedSnackbar
        {...showSnackbarProps}
        handleClose={() => setShowSnackbarProps((p) => ({ ...p, open: false }))}
      />
      {children}
    </UserContext.Provider>
  );
};
