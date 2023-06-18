import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

const HistoryItemTable = ({
  tableData,
  handleDeleteRow,
  historyItems,
  handleEditRow,
}) => {
  const [responsive, setResponsive] = useState("standard");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);

  const handleDelete = (id) => {
    handleDeleteRow?.(id);
  };
  const handleEidt = (id) => {
    handleEditRow?.(id);
  };

  const columns = [
    { name: "Name", options: { filterOptions: { fullWidth: true } } },
    "Description",
    "Change type id",
    "History id",
    "User id",
    "Created at",
    "Updated at",
    {
      name: "Action",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <div style={{ display: "flex", gridGap: "10px" }}>
              <EditIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleEidt(historyItems[dataIndex]?.id)}
              />
              <DeleteIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete(historyItems[dataIndex]?.id)}
              />
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRowsHideCheckboxes: true,
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
  };

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
        <MUIDataTable
          title={"History Items"}
          data={tableData}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default HistoryItemTable;
