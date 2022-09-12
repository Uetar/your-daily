import React, {  useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";
import  {  useRouter } from "next/router";
import { AlertColor } from "@mui/material";
import { ShowItems } from "./ShowItems";
import Edit from "./Edit";
import CustomizedSnackbar from "./customizedSnackbar";



interface itemType {
  id: number;
  name: string;
  categoryID: number;
  inStock: boolean;
  price: number;
  baseQuantity: number;
  itemImageLinks: string[];
}

export default function BasicTable({
  items,
  setItems,
}: {
  items: any;
  setItems: any;
}) {
  const [showEdit, setShowEdit] = useState({
    open: false,
    itemData: {
      id: 0,
      name: "",
      categoryID: 0,
      inStock: false,
      price: 0,
      baseQuantity: 0,
      itemImageLinks: [""],
    },
    setItemData: () => {},
  });
  {
    console.log(items);
  }
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
      message: "item edited successfully",
    });
  }, []);

  const router = useRouter();
  const tabValue = router.query.category;

  const MyTableHeaders = styled(TableCell)({
    fontWeight: "bolder",
    borderBottomColor: "white",
  });


  

  return (
    <>
      <TableContainer sx={{ mt: 3, width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <MyTableHeaders align="center">S.No </MyTableHeaders>
              <MyTableHeaders align="center">Image</MyTableHeaders>
              <MyTableHeaders align="center">Vegetable Name</MyTableHeaders>
              <MyTableHeaders align="center">Base Qty.</MyTableHeaders>
              <MyTableHeaders align="center">
                Price (per base qty)
              </MyTableHeaders>
              <MyTableHeaders align="center">In Stock</MyTableHeaders>
              <MyTableHeaders align="center">Delete</MyTableHeaders>
              <MyTableHeaders align="center">Edit</MyTableHeaders>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(
              (item: itemType) =>
                (tabValue == "all" ||
                  (tabValue == "others" && item.categoryID > 2) ||
                  (tabValue == "vegetables" && item.categoryID == 1) ||
                  (tabValue == "fruits" && item.categoryID == 2)) && (
                  <ShowItems
                    key={item.id}
                    item={item}
                    setItems={setItems}
                    showEdit={showEdit}
                    setShowEdit={setShowEdit}
                  />
                )
            )}
          </TableBody>
          {showSnackbarProps.open && (
            <CustomizedSnackbar
              {...showSnackbarProps}
              handleClose={() =>
                setShowSnackbarProps((p: any) => ({ ...p, open: false }))
              }
            />
          )}
        </Table>
      </TableContainer>
      <Edit
        editState={showEdit}
        setEditState={setShowEdit}
        handleSnackbar={handleSnackbar}
      />
    </>
  );
}
