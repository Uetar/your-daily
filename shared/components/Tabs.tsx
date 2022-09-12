import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

interface itemType {
  id: number;
  name: string;
  categoryID: number;
  inStock: boolean;
  price: number;
  baseQuantity: number;
  itemImageLinks: string[];
}

export default function FullWidthTabs({ items }: { items: itemType[] }) {
  const router = useRouter();
  const MyTab = styled(Tab)(({}) => ({
    fontWeight: "bold",
  }));
  return (
    <Tabs
    
      value={router.query.category ?? "all"}
      onChange={(e, newValue) => {
        router.push({
          query: {
            category: newValue,
          },
        });
      }}
      centered
    >
      <MyTab value={"all"} label="all" id="tab-0" />
      <MyTab value={"vegetables"} label="Vegetables" id="tab-1" />
      <MyTab value={"fruits"} label="Fruits" id="tab-2" />
      <MyTab value={"others"} label="Others" id="tab-3" />
    </Tabs>
  );
}
