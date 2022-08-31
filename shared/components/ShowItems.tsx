import {
  TableRow,
  Checkbox,
  IconButton,
  TableCell,
  styled,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";
import api from "../../pages/api/api";
import Edit from "../components/Edit";

interface itemType {
  id: number;
  name: string;
  categoryID: number;
  inStock: boolean;
  price: number;
  baseQuantity: number;
  itemImageLinks: string[];
}

export const ShowItems = (props: any) => {
  const MyTableCell = styled(TableCell)({
    borderBottomColor: "white",
  });

  const { item, setItems, showEdit, setShowEdit } = props;
  const [itemData, setItemData] = useState(item);

  console.log(item);
  return (
    <>
      <TableRow key={itemData.id}>
        <MyTableCell align="center">{itemData.id}</MyTableCell>
        <MyTableCell align="center">
          <Box
            sx={{
              height: "40px",
              width: "40px",
            }}
          >
            <Image
              src={itemData?.itemImageLinks[0] ?? ""}
              alt="Icon"
              width="100%"
              height="100%"
            />
          </Box>
        </MyTableCell>
        <MyTableCell align="center" component="th" scope="row">
          {itemData.name}
        </MyTableCell>
        <MyTableCell align="center">{itemData.baseQuantity}</MyTableCell>
        <MyTableCell align="center">{itemData.price}</MyTableCell>
        <MyTableCell align="center">
          <Checkbox
            onClick={() => checkboxHandler(itemData, setItemData, setItems)}
            color="success"
            checked={itemData.inStock}
          />
        </MyTableCell>
        <MyTableCell align="center">
          <IconButton onClick={() => deleteHandler(itemData.id, setItems)}>
            <DeleteIcon color="inherit" />
          </IconButton>
        </MyTableCell>
        <MyTableCell align="center">
          <IconButton
            onClick={() => setShowEdit({ open: true, itemData, setItemData })}
          >
            <EditIcon color="inherit" />
          </IconButton>
        </MyTableCell>
      </TableRow>
    </>
  );
};

const deleteHandler = async (id: number, setItems: any) => {
  const auth = localStorage.getItem("authToken");
  try {
    if (auth) {
      await api.delete(`/api/store-manager/item/${id}`, {
        headers: {
          Authorization: auth,
        },
      });
      setItems([]);
    }
  } catch (error: any) {}
};

const checkboxHandler = async (
  itemData: itemType,
  setItemData: any,
  setItems: any
) => {
  const auth = localStorage.getItem("authToken");
  try {
    if (auth) {
      const res = await api.put(
        `/api/store-manager/item/${itemData.id}`,
        {
          category: itemData.categoryID,
          imageId: itemData.itemImageLinks,
          inStock: !itemData.inStock,
          name: itemData.name,
          price: itemData.price,
          baseQuantity: itemData.baseQuantity,
          strikeThroughPrice: 100,
        },
        {
          headers: {
            Authorization: auth,
          },
        }
      );
      setItemData({ ...itemData, inStock: !itemData.inStock });
      // setItems([])
    }
  } catch (error: any) {}
};
