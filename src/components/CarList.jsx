import { useState, useEffect } from "react";
import { fetchCars, deleteCar } from "../carapi";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component

import Button from "@mui/material/Button";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import { Snackbar } from "@mui/material";

function CarList() {
  const [cars, setCars] = useState([]);

  const [colDefs, setColDefs] = useState([
    { field: "brand", filter: true },
    { field: "model", filter: true },
    { field: "color", filter: true, width: 150 },
    { field: "fuel", filter: true, width: 150 },
    { field: "modelYear", filter: true, width: 120 },
    { field: "price", filter: true },
    {
      cellRenderer: (params) => (
        <Button onClick={handleDelete(params, data._link.self.href)}>
          Delete
        </Button>
      ),
    },
  ]);

  useEffect(() => {
    fetchCars()
      .then((data) => setCars(data._embedded.cars))
      .catch((err) => console.error(err));
  }, []);

  const handleFetch = () => {
    fetchCars().then().catch();
  };

  const handleDelete = (url) => {
    if (window.confirm("Are you sure sure?")) {
      deleteCar(url).catch((err) => console.error(err));
    }
  };

  return (
    <>
      <div className="ag-theme-material" style={{ height: 500 }}>
        <AgGridReact
          rowData={cars}
          columnDefs={colDefs}
          pagination={true}
          paginationAutoPageSize={true}
          suppressCellFocus={true}
        />
      </div>
      <Snackbar open={open} />
    </>
  );
}
export default CarList;
