import React, { useContext } from "react";
import { Table, TableContainer } from "@mui/material";
import "./FlashLoader.css"; // Custom CSS for shimmer effect
import useColorMode from "@/hooks/useColorMode";

const Loader = () => {
  const [colorMode, setColorMode] = useColorMode();
  const themeClass = colorMode === "light" ? "light" : "dark";
  return (
    <TableContainer>
      <Table
        className={`shimmer-loader ${themeClass}`}
        sx={{ minHeight: 400 }}
      />
    </TableContainer>
  );
};

export default Loader;
