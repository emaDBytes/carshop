import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { updateCar } from "../carapi";

export default function EditCar(props) {
  const [open, setOpen] = useState(false);
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
    console.log(props.data);
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
    setCar({ ...car, [event.target.name]: event.target.value }); // Study this!!!!!  ....[]
  };

  const handleSave = () => {
    updateCar(props.data._link.car.href, car)
      .then(() => {
        props.handleFetch();
        handleClose();
      })
      .catch((err) => console.error(err));
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
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
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
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="model"
            label="Model"
            value={car.model}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="color"
            label="Color"
            value={car.color}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="fuel"
            label="Fuel"
            value={car.fuel}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="modelYear"
            label="Year"
            value={car.modelYear}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="price"
            label="Price"
            value={car.price}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
