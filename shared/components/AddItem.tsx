import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  AlertColor,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  styled,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import api from "../../pages/api/api";
import { useState } from "react";
import { number } from "yup";
import router from "next/router";
import { UserContext } from "../../pages/userContext";

export default function AddItem({
  showAdd,
  setShowAdd,
  setItems,
  handleSnackbar,
}: {
  showAdd: boolean;
  setShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setItems: any;
  handleSnackbar: Function;
}) {
  const [showSnackbarProps, setShowSnackbarProps] = useState<{
    open: boolean;
    severity: AlertColor;
    message: string;
  }>({
    open: false,
    message: "",
    severity: "info",
  });
  const validationSchema = yup.object({
    categoryID: yup.number().required().min(1),
    name: yup.string().required(),
    price: yup.number().required(),
    baseQuantity: yup.number().required(),
  });
  const { authToken } = React.useContext(UserContext);

  const addItemPost = async (values: any, setItems: any) => {
    const auth = authToken;
    console.log("authToken =>", auth);
    if (auth) {
      console.log("adding image", values);
      try {
        const { status } = await api.post(
          "/api/store-manager/item",
          {
            category: values.categoryID,
            name: values.name,
            price: values.price,
            inStock: values.inStock,
            baseQuantity: values.baseQuantity.toString(),

            imageId: 52,
          },
          {
            headers: {
              Authorization: auth,
            },
          }
        );
        if (status == 201) {
          handleSnackbar();
          setItems([]);
        }
      } catch (error: any) {
        setShowSnackbarProps({
          open: true,
          severity: "warning",
          message: "item cant be  added ",
        });
      }
    }
  };

  async function PostImage(item: any, value: string) {
    try {
      const rest2 = await api.post("/api/store-manager/image/:imageType");

      if (rest2.status == 200) {
        console.log(rest2);
      }
    } catch (error: any) {
      console.log("error");
    }
  }
  return (
    <Dialog open={showAdd} onClose={() => setShowAdd(false)}>
      <DialogTitle>Add Item Details</DialogTitle>
      <Formik
        initialValues={{
          id: 0,
          name: "check",
          categoryID: 1,
          inStock: true,
          price: 100,
          baseQuantity: 10,
          imageid: number,
          itemImageLinks: undefined,
        }}
        validate={(values) => {
          console.log(values);
        }}
        // onSubmit={addItemPost}
        onSubmit={(values) => {
          handleSnackbar();
          console.log(values);
          setShowAdd(false);
          addItemPost(values, setItems);
          console.log("hello");
        }}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <Form>
            <DialogContent>
              <DialogContentText>
                All details are mandatory to fill.
              </DialogContentText>
              <TextField
                focused
                margin="dense"
                id="categoryID"
                label="categoryID"
                type="number"
                value={values.categoryID}
                onChange={handleChange}
                error={!!errors.categoryID && !!touched.categoryID}
                helperText={
                  errors.categoryID && touched.categoryID && errors.categoryID
                }
                fullWidth
                variant="standard"
              />
              <TextField
                focused
                margin="dense"
                id="name"
                label="Name"
                type="text"
                value={values.name}
                onChange={handleChange}
                error={!!errors.name && touched.name}
                helperText={!!errors.name && touched.name && errors.name}
                fullWidth
                variant="standard"
              />
              <TextField
                focused
                margin="dense"
                id="price"
                label="Price(per base Qty)"
                type="number"
                value={values.price}
                onChange={handleChange}
                error={!!errors.price && touched.price}
                helperText={!!errors.price && touched.price && errors.price}
                sx={{ textTransform: "capitalize" }}
                fullWidth
                variant="standard"
              />
              <FormControlLabel
                value="inStock"
                control={
                  <Checkbox
                    onChange={handleChange}
                    defaultChecked={values.inStock}
                  />
                }
                label="In Stock"
                labelPlacement="top"
                sx={{ ml: 0, mt: 1 }}
              />
              <TextField
                focused
                margin="dense"
                id="baseQuantity"
                label="Base Qty"
                type="number"
                value={values.baseQuantity}
                onChange={handleChange}
                error={!!errors.baseQuantity && touched.baseQuantity}
                helperText={
                  !!errors.baseQuantity &&
                  touched.baseQuantity &&
                  errors.baseQuantity
                }
                fullWidth
                variant="standard"
              />

              <input
                id="itemImageLinks"
                name="itemImageLinks"
                type="file"
                onChange={(event) => {
                  setFieldValue("itemImageLinks", event.target.files[0]);
                  console.log(values);
                }}
              />
              {values.itemImageLinks && (
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ marginTop: 2 }}
                    onClick={async () => {}}
                  >
                    Upload
                  </Button>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input hidden accept="image/*" type="file" />
                    {/* <PhotoCamera /> */}
                  </IconButton>
                </Stack>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
