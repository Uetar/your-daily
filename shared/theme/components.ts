import { Components } from "@mui/material";

const components: Components = {
  MuiButton: {
    styleOverrides: {
      root: ({ ownerState }) => {
        switch (ownerState.variant) {
          case "outlined": {
            return {
              color: "#F88A12",
              margin: "32px",
              fontWeight: "bold",
            };
          }
          case "contained":
            return {
              backgroundColor: "#F88A12",
              color: "#FFFFFF",
            };
          default: {
            return {
              backgroundColor: "#F88A12",
              color: "#FFFFFF",
              "&:hover": {
                border: "0px",
                color: "gray",
                backgroundColor: "#F88A12",
              },
            };
          }
        }
      },
    },
  },
};

export default components;
