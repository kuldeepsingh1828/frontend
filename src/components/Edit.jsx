import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';

export default function UpdateDialog({ text, data, handleClickOpen, handleClose, open }) {
    const [row, setRow] = React.useState(data);
    const handleEdit = (e) => {
        setRow((state) => ({ ...state, [e.target.name]: e.target.value }));
        console.log(row);
    }
    React.useEffect(() => {
    }, [row])
    return (
        <div>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'100%'}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} >
                        <Grid item xs={3}>
                            <TextField
                                name="name"
                                onChange={e => handleEdit(e)}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                value={row.name}
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                name="carbs"
                                onChange={e => handleEdit(e)}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                value={row.carbs}
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                name="calories"
                                onChange={e => handleEdit(e)}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                value={row.calories}
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                name="fat"
                                onChange={e => handleEdit(e)}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                value={row.fat}
                                fullWidth
                                variant="standard"
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                name="protein"
                                onChange={e => handleEdit(e)}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                value={row.protein}
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button key="bt1" onClick={e => handleClose(true, row)}>{text}</Button>
                    <Button key="bt2" onClick={e => handleClose(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}