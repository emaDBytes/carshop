import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { saveCar } from "../carapi";

export default function AddCar(props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    modelYear: "",
    price: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset the form state when dialog is closed
    setCar({
      brand: "",
      model: "",
      color: "",
      fuel: "",
      modelYear: "",
      price: "",
    });
  };

  const handleChange = (event) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    setLoading(true);
    saveCar(car)
      .then(() => {
        props.handleFetch();
        if (props.showNotification) {
          props.showNotification("Car added successfully", "success");
        }
        handleClose();
      })
      .catch((err) => {
        console.error("Error saving car:", err);
        if (props.showNotification) {
          props.showNotification("Failed to add car: " + err.message, "error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Car
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleSave();
          },
        }}
      >
        <DialogTitle>Add New Car</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            name="brand"
            label="Brand"
            value={car.brand}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            disabled={loading}
          />
          <TextField
            required
            margin="dense"
            name="model"
            label="Model"
            value={car.model}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            disabled={loading}
          />
          <TextField
            required
            margin="dense"
            name="color"
            label="Color"
            value={car.color}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            disabled={loading}
          />
          <TextField
            required
            margin="dense"
            name="fuel"
            label="Fuel"
            value={car.fuel}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            disabled={loading}
          />
          <TextField
            required
            margin="dense"
            name="modelYear"
            label="Year"
            value={car.modelYear}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            disabled={loading}
            type="number"
          />
          <TextField
            required
            margin="dense"
            name="price"
            label="Price"
            value={car.price}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            disabled={loading}
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// Adding PropTypes validation
AddCar.propTypes = {
  handleFetch: PropTypes.func.isRequired,
  showNotification: PropTypes.func,
};
