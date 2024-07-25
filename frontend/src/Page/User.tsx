import { useCallback, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";


import DenseTable from "../Component/DenseTable";
import { IUserRes } from "../type/IUserRes";


export default function User() {
  const [dialogText, setDialogText] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const { users } = useLoaderData() as { users: IUserRes[] };
  const headers = ["id", "Name", "Username", "Role Id", ""];
  const data = users.map((user) => {
    return [user.id, user.name, user.username, user.roleId];
  });

  const deleteUser = useCallback((index: number, user: string[]) => {
    setDeleteId(user[0]);
    setDialogText(`You are about to delete user ${user[0]}`)
  }, []);

  const closeDialog = useCallback(() => {
    setDialogText("");
  }, []);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
        <Grid container>
          <Grid item xs={12}>
            <DenseTable 
              name="User Admin Table" 
              data={data} 
              headers={headers} 
              onDelete={deleteUser}
            />
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Dialog
        open={!!dialogText}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Form method="DELETE">
            <TextField
              id="dialog-input-delete-user"
              name="dialog-input-delete-user"
              sx={{ display: "none" }}
              value={deleteId}
            />
            <Button type="submit" name="intent" value="delete" autoFocus onClick={closeDialog}>
              Confirm
            </Button>
          </Form>
        </DialogActions>
      </Dialog>
    </Box>
  )
}