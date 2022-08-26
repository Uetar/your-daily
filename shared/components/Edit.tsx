import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Checkbox, FormControlLabel, Input, styled } from "@mui/material";
import * as yup from "yup";
import { Formik, Form } from "formik";
import api from "../../pages/api/api";



interface itemType {
  id: number;
  name: string;
  categoryID: number;
  inStock: boolean;
  price: number;
  baseQuantity: number;
  itemImageLinks: any;
}
const handleEdit = async (
  values: itemType,
  setItemData: any,
) => {
  const auth = localStorage.getItem("authToken");
  if (auth) {
    try {

      const res = await api.put(
        `/api/store-manager/item/${values.id}`,
        {
          category: values.categoryID,
          inStock: values.inStock,
          name: values.name,
          price: values.price,
          baseQuantity: values.baseQuantity.toString(),
        },
        {
          headers: {
            Authorization: auth,
          },
        }
      );
      if (res.status == 201) {
        setItemData({
          ...values,
          categoryID: values.categoryID,
        //   itemImageLinks: out.data.imageURL,
          inStock: values.inStock,
          name: values.name,
          price: values.price,
          baseQuantity: values.baseQuantity.toString(),
        });
      }
    } catch (error: any) {
    }
  }
};








interface itemType {
  id: number;
  name: string;
  categoryID: number;
  inStock: boolean;
  price: number;
  baseQuantity: number;
  itemImageLinks: any;
}

export  default function Edit({
  editState,
  setEditState,
}: {
  editState: {
    open: boolean;
    itemData: itemType;
    setItemData: any;
  };
  setEditState: any;
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

  return (
    <div>
      <Dialog
        open={editState.open}
        onClose={() => setEditState({ open: false, itemData: {} })}
      >
        <DialogTitle>Edit Item Details</DialogTitle>

        <Formik
          initialValues={{
            id: editState.itemData.id,
            name: editState.itemData.name,
            categoryID: editState.itemData.categoryID,
            inStock: editState.itemData.inStock,
            price: editState.itemData.price,
            baseQuantity: editState.itemData.baseQuantity,
            itemImageLinks: "",
          }}
          onSubmit={(values) => {
            setEditState({ open: false, itemData: {} });
            handleEdit(values, editState.setItemData);
          }}
          validationSchema={validationSchema}
        >
          {({ values, errors, handleChange, setFieldValue }) => (
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
                  error={!!errors.categoryID}
                  helperText={!!errors.categoryID && errors.categoryID}
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
                  error={!!errors.name}
                  helperText={!!errors.name && errors.name}
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
                  error={!!errors.price}
                  helperText={!!errors.price && errors.price}
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
                  error={!!errors.baseQuantity}
                  helperText={!!errors.baseQuantity && errors.baseQuantity}
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
                <MyButton
                  onClick={() =>
                    setEditState({ open: false, itemData: {} })
                  }
                >
                  Cancel
                </MyButton>
                <MyButton type="submit">Edit</MyButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
