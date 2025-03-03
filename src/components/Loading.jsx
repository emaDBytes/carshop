import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default function Loading({ message }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
        minHeight: "200px",
      }}
    >
      <CircularProgress size={60} thickness={4} />
      {message && (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
}

// Adding PropTypes validation
Loading.propTypes = {
  message: PropTypes.string,
};

// Default props
Loading.defaultProps = {
  message: "Loading...",
};
