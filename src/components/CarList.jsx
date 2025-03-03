import { useState, useEffect } from "react";
import { fetchCars, deleteCar } from "../carapi";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import Loading from "./Loading";
import Notification from "./Notification";
import ErrorBoundary from "./ErrorBoundary";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const [colDefs, setColDefs] = useState([
    { field: "brand", filter: true },
    { field: "model", filter: true },
    { field: "color", filter: true, width: 130 },
    { field: "fuel", filter: true, width: 130 },
    { headerName: "Year", field: "modelYear", filter: true, width: 120 },
    { field: "price", filter: true, width: 150 },
    {
      cellRenderer: (params) => (
        <EditCar
          data={params.data}
          handleFetch={handleFetch}
          showNotification={showNotification}
        />
      ),
      width: 120,
    },
    {
      cellRenderer: (params) => (
        <Button
          color="error"
          size="small"
          onClick={() => handleDelete(params.data._links.self.href)}
        >
          Delete
        </Button>
      ),
    },
  ]);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    setLoading(true);
    fetchCars()
      .then((data) => {
        setCars(data._embedded.cars);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cars:", err);
        showNotification("Failed to load cars: " + err.message, "error");
        setLoading(false);
      });
  };

  const handleDelete = (url) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      setLoading(true);
      deleteCar(url)
        .then(() => {
          handleFetch();
          showNotification("Car deleted successfully", "success");
        })
        .catch((err) => {
          console.error("Error deleting car:", err);
          showNotification("Failed to delete car: " + err.message, "error");
          setLoading(false);
        });
    }
  };

  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const closeNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  return (
    <ErrorBoundary>
      <Box sx={{ mb: 2 }}>
        <AddCar handleFetch={handleFetch} showNotification={showNotification} />
      </Box>

      {loading ? (
        <Loading message="Loading cars..." />
      ) : cars.length > 0 ? (
        <Paper elevation={3}>
          <div
            className="ag-theme-material"
            style={{ height: 500, width: "100%" }}
          >
            <AgGridReact
              rowData={cars}
              columnDefs={colDefs}
              pagination={true}
              paginationAutoPageSize={true}
              suppressCellFocus={true}
            />
          </div>
        </Paper>
      ) : (
        <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6">No cars found</Typography>
          <Typography variant="body2" color="textSecondary">
            Try adding a new car using the &quot;Add Car&quot; button above.
          </Typography>
        </Paper>
      )}

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        handleClose={closeNotification}
      />
    </ErrorBoundary>
  );
}

export default CarList;
