import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';

export default function UpdateDialog({ data, handleClickOpen, handleClose, open }) {
    const [row, setRow] = React.useState(data);
    const handleEdit = (e) => {
        setRow({ ...data, [e.target.name]: e.target.value });
    }
    React.useEffect(() => {
    }, [row])
    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth={'10%'}>
                <DialogTitle>Advance Search</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} sx={{ marginTop: "20px" }} >
                        <Grid item xs={6}>
                            <TextField
                                name="carbs"
                                onChange={e => handleEdit(e)}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Document ID"
                                type="email"
                                value={row.carbs}
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="calories"
                                onChange={e => handleEdit(e)}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Invoice Number"
                                type="email"
                                value={row.calories}
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="calories"
                                onChange={e => handleEdit(e)}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Customer Number"
                                type="email"
                                value={row.calories}
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="date"
                                name="kuldeep"
                                label="Buisness Year"
                                type="date"
                                defaultValue="2017-05-24"
                                sx={{ width: '100%' }}
                                InputLabelProps={{
                                    shrink: true,
                                    height: '50px'
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={e => handleClose(true, row)}>Add</Button>
                    <Button onClick={e => handleClose(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}