import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Delete from './Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateDialog from './Edit';
import AddDialog from './Add';
import AdvanceSearch from './AdvanceSearch';
import { data, deleteData, AddData, updateData } from '../CRUD'
let Data = [];
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Dessert (100g serving)',
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'Calories',
    },
    {
        id: 'fat',
        numeric: true,
        disablePadding: false,
        label: 'Fat (g)',
    },
    {
        id: 'carbs',
        numeric: true,
        disablePadding: false,
        label: 'Carbs (g)',
    },
    {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Protein (g)',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };


    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead >
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};



export default function EnhancedTable() {
    const [search, setSearch] = React.useState("");
    const [rows, setRows] = React.useState(Data);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [deleteIndex, setDeleteIndex] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [disable, setDisable] = React.useState(true);
    const [editIndex, setEditIndex] = React.useState({});
    const [editOpen, setEditOpen] = React.useState(false);
    const [addOpen, setAddOpen] = React.useState(false);
    const [text, setText] = React.useState("Update");
    const ref = React.useRef(null);
    React.useEffect(async () => {
        console.log('r')
        let temp = await data(search);
        setRows([...temp.filter(e => (e.name.search(search) > -1))])
    }, [search.length]);

    React.useEffect(async () => {
        (deleteIndex.length == 1) ? setDisable(false) : setDisable(true)
    }, [deleteIndex.length]);

    React.useEffect(async () => {
        console.log("DATA FETCHED")
        setRows(await data());
    }, [])
    const handleAdd = () => {
        setAddOpen(true);
        setEditIndex({});
        setSelected([]);
        setText("Add");
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (action) => {
        setOpen(false);
        if (action == true) {
            handleDelete();
        }
    };

    //EDIT ACTION OPEN
    const handleEditClickOpen = () => {
        setText("Update")
        setEditOpen(true);
    };


    const handleEditClose = async(action, data) => {
        setEditOpen(false);
        if (action == true) {
            if (data != undefined) {
                console.log(data);
                let index = rows.findIndex((e) => e.sl_no == data.sl_no)
                rows[index] = data;
                await updateData(data);
                setRows(rows);
                // Data = rows;
                // console.log(Data);
            }
        } setEditIndex({});
        setSelected([]);
        setDisable(true);
        setDeleteIndex([]);
    };

    const handleEdit = (e) => {
        setEditIndex({ ...editIndex, [e.target.name]: e.target.value });
    }

    //EDIT ACTION END


    //ADD ACTION OPEN
    const handleAddClickOpen = () => {
        setAddOpen(true);
    };


    const handleAddClose = async (action, row) => {
        setAddOpen(false);
        if (action == true) {
            if (row != undefined) {
                await AddData(row);
                setRows((rows) => [...rows, row]);
            }
        }
        setEditIndex({});
        setSelected([]);
        setDisable(true);
        setDeleteIndex([]);
    };
    //ADD ACTION END

    const [open, setOpen] = React.useState(false);
    const EnhancedTableToolbar = (props) => {

        const leftbuttons = [
            <Button key="one">Predict</Button>,
            <Button key="two">Analytics View</Button>,
            <Button key="three">Advance Search</Button>,
        ];

        const rightbuttons = [
            <AddDialog key="add" text={'Add'} data="" handleClickOpen={handleAddClickOpen} handleClose={handleAddClose} open={addOpen} />,
            <Button key="one" onClick={handleAdd} >Add</Button>,
            <Button key="two" onClick={handleEditClickOpen} disabled={disable}>Edit</Button>,
            <Button key="three" onClick={handleClickOpen} >Delete</Button>,
            <Delete key="four" open={open} handleClose={handleClose} />,
            <UpdateDialog key="six" text={'Edit'} data={editIndex} handleEdit={handleEdit} handleClickOpen={handleEditClickOpen} handleClose={handleEditClose} open={editOpen} />
        ];

        const { numSelected } = props;

        return (
            <Toolbar
                sx={{
                    marginTop: '50px',
                    width: '100%',
                }}
            >  <Box

                sx={{
                    marginTop: '30px',
                    maxWidth: '100%',
                    flexGrow: 1

                }}
            >
                    <Grid container spacing={2} >
                        <Grid key="left" item xs={5}>
                            <ButtonGroup sx={{
                                maxWidth: '100%',
                            }} fullWidth={true}
                                size="medium"
                                aria-label="button group">
                                {leftbuttons}
                            </ButtonGroup>
                        </Grid>
                        <Grid key="center" item xs={2}>
                            <TextField
                                inputRef={input => input && input.focus()}
                                ref={ref}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                size="small"
                                id="filled-basic"
                                label="search custumer id"
                                variant="filled" />
                        </Grid>
                        <Grid key="right" item xs={5}>
                            <ButtonGroup fullWidth={true} size="medium" aria-label="button group">
                                {rightbuttons}
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Box>
            </Toolbar>
        );
    };

    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            const deleteIndexTemp = rows.map((n) => n.sl_no);
            setSelected(newSelecteds);
            setDeleteIndex(deleteIndexTemp);
            return;
        }
        setSelected([]);
    };

    const handleDelete = async () => {
        const response = await deleteData(deleteIndex);
        const newrows = rows.filter((row, index) => {
            if (deleteIndex.includes(parseInt(row.sl_no))) return false;
            return true;
        });
        setRows(newrows);
        setDeleteIndex([]);
        setSelected([]);
    }
    const handleClick = (event, name) => {
        let curindex = event.target.dataset.index
        let temp;
        if (event.target.checked) {
            let row = rows.filter((e) => e.sl_no == curindex);
            setEditIndex(row[0])
            deleteIndex.push(parseInt(curindex))
            setDeleteIndex([...new Set(deleteIndex)])
        } else {
            setDeleteIndex([...deleteIndex.filter(val => val != curindex)])
        }
        const selectedIndex = selected.indexOf(name);

        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);

    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }} spacing={2}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size="small"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    const sl_no = row.sl_no;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "data-index": sl_no,
                                                        'aria-labelledby': labelId
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 33 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
