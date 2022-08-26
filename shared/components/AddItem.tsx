import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Checkbox, FormControlLabel, styled } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import api from "../../pages/api/api";
import CustomizedSnackbar from "./customizedSnackbar";

export default function AddItem({
  showAdd,
  setShowAdd,
  setItems,
}: {
  showAdd: boolean;
  setShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setItems: any;
}) {
  const MyButton = styled(Button)(
    ({ theme }) => `
		color: ${theme.palette.secondary.main};
		border: 1px solid ${theme.palette.secondary.main};
		`
  );

  const validationSchema = yup.object({
    categoryID: yup.number().required().min(1),
    name: yup.string().required(),
    price: yup.number().required(),
    baseQuantity: yup.number().required(),
  });




   const addItemHandler = async (
     values: any,
     setItems: any,
   ) => {
     const auth = localStorage.getItem("authToken");
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
             // imageId: out.body.imgID,
             imageId: 22,
           },
           {
             headers: {
               Authorization: auth,
             },
           }
         );
         if (status == 201) {
          //  customizedSnackbar("Item added successfully", "success");
           setItems([]);
         }
       } catch (error: any) {
        //  customizedSnackbar(error.message, "error");
       }
     }
   };

   const addItemPost = async (
     values: any,
     setItems: any,
     customizedSnackbar: any
   ) => {
     const auth = localStorage.getItem("authToken");
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
             // imageId: out.body.imgID,
             imageId: 22,
           },
           {
             headers: {
               Authorization: auth,
             },
           }
         );
         if (status == 201) {
           setItems([]);
         }
       } catch (error: any) {
       }
     }
   };

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
          itemImageLinks: undefined,
        }}
        onSubmit={(values) => {
          <CustomizedSnackbar />;

          console.log(values);
          setShowAdd(false);
          addItemHandler(values, setItems);
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
                autoFocus
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
                autoFocus
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
                autoFocus
                margin="dense"
                id="price"
                label="Price(per base Qty)"
                type="number"
                value={values.price}
                onChange={handleChange}
                error={!!errors.price && touched.price}
                helperText={!!errors.price && touched.price && errors.price}
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
                autoFocus
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

              <TextField
                autoFocus
                margin="dense"
                id="itemImageLinks"
                name="itemImageLinks"
                type="file"
                onChange={(event) =>
                  setFieldValue("itemImageLinks", event.target.value[0])
                }
                helperText="Image"
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <MyButton onClick={() => setShowAdd(false)}>Cancel</MyButton>
              <MyButton type="submit" onClick={() => addItemPost}>
                Add
              </MyButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
