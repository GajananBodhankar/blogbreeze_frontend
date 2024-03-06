import { IconButton, Snackbar } from "@mui/material";
import { useState } from "react";
import { handleSnackClose } from "../component/functions";
import CloseIcon from "@mui/icons-material/Close";

function CustomSnackBar({ snack, setSnack }: any) {
  type verticalAlign = "top" | "bottom";
  type horizontalAlign = "left" | "center" | "right";
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => handleSnackClose(snack, setSnack)}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  const [vertical] = useState<verticalAlign>("bottom");
  const [horizontal] = useState<horizontalAlign>("center");

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={snack.open}
      autoHideDuration={2000}
      onClose={() => handleSnackClose(snack, setSnack)}
      message={snack.message}
      ContentProps={{
        style: {
          backgroundColor: snack.message.includes("Removed")
            ? "orange"
            : "green",
        },
      }}
      key={vertical + horizontal}
      action={action}
    />
  );
}

export default CustomSnackBar;
