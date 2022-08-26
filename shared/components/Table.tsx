import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";
import router, { NextRouter, useRouter } from "next/router";
import { AlertColor } from "@mui/material";
import api from "../../pages/api/api";
import { ShowItems } from "./ShowItems";
import customizedSnackbar from "./customizedSnackbar";
import Edit from "./Edit";



export const FetchData =() => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = localStorage.getItem("authToken");
        if (auth) {
          const { status, data } = await api.get("/api/store-manager/item", {
            headers: {
              Authorization: auth,
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
    if (items.length == 0) fetchData();
  }, [items]);
  return { items, setItems };
};


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
  const router = useRouter();
  const tabValue = router.query.category;

  const MyTableHeaders = styled(TableCell)({
    fontWeight: "bolder",
    borderBottomColor: "white",
  });

  //   const MyTableCell = styled(TableCell)({
  //     borderBottomColor: "white",
  //   });

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
        </Table>
      </TableContainer>
      <Edit editState={showEdit} 
      setEditState={setShowEdit}
      />
    </>
  );
}
