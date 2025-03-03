import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { updateCar } from "../carapi";

export default function EditCar(props) {
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
    setCar({
      brand: props.data.brand,
      model: props.data.model,
      color: props.data.color,
      fuel: props.data.fuel,
      modelYear: props.data.modelYear,
      price: props.data.price,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    setLoading(true);
    updateCar(props.data._links.self.href, car)
      .then(() => {
        // Check if handleFetch prop exists before calling it
        if (props.handleFetch) {
          props.handleFetch();
        }
        if (props.showNotification) {
          props.showNotification("Car updated successfully", "success");
        }
        handleClose();
      })
      .catch((err) => {
        console.error("Error updating car:", err);
        if (props.showNotification) {
          props.showNotification(
            "Failed to update car: " + err.message,
            "error"
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
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
        <DialogTitle>Update Car</DialogTitle>
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
EditCar.propTypes = {
  data: PropTypes.shape({
    brand: PropTypes.string,
    model: PropTypes.string,
    color: PropTypes.string,
    fuel: PropTypes.string,
    modelYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _links: PropTypes.shape({
      self: PropTypes.shape({
        href: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  handleFetch: PropTypes.func,
  showNotification: PropTypes.func,
};
