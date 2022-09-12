import { Theme } from "@mui/material";
import { createTheme } from "@mui/material";
import components from "./components";
import typography from "./typography";
import palette from "./palette";
export const theme: Theme = createTheme({
  components,
  typography,
  palette,
});
