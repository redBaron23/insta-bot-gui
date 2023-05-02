import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog(props) {
  const { show, onSend, onClose } = props;
  const [code, setCode] = React.useState("");

  const [open, setOpen] = React.useState(true);

  const handleCode = (event) => {
    const { name, value } = event.target;
    setCode(value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    onSend(code);
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={show} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Codigo de verificacion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Los servidores estan en Virginia, entonces Instagram enviaria un
            codigo via SMS/Email
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="code"
            label="Code"
            onChange={handleCode}
            type="code"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
