import { useState } from "react";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { StaffData, HeadCell, PaymentType } from "../../../model/dataTable";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone, faEllipsis, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from "../Modal";
import { ModalPosition, ModalType } from "../../../model/Modal";
import { Checkbox } from "@mui/material";

function createData(
    name: string,
    email: string,
    phoneNumber: string,
    trip: string,
    role: string,
    activity: string,
    blank: any = ''
): StaffData {
    return {
        name,
        email,
        phoneNumber,
        trip,
        role,
        activity,
        blank
    };
}

const rows = [
    createData('Yemisi Odunsayo', 'yemiodunsayo@mail.com', '+234 8036732642', '23 Trips', 'Courier', 'Active 2hrs ago'),
    createData('Yemisi Odunsayo', 'yemiodunsayo@mail.com', '+234 8036732642', '23 Trips', 'Courier', 'Active 2hrs ago'),
    createData('Yemisi Odunsayo', 'yemiodunsayo@mail.com', '+234 8036732642', '23 Trips', 'Courier', 'Active 2hrs ago'),
    createData('Yemisi Odunsayo', 'yemiodunsayo@mail.com', '+234 8036732642', '23 Trips', 'Courier', 'Active 2hrs ago'),
    createData('Yemisi Odunsayo', 'yemiodunsayo@mail.com', '+234 8036732642', '23 Trips', 'Courier', 'Active 2hrs ago'),
    createData('Yemisi Odunsayo', 'yemiodunsayo@mail.com', '+234 8036732642', '23 Trips', 'Courier', 'Active 2hrs ago'),
    createData('Yemisi Odunsayo', 'yemiodunsayo@mail.com', '+234 8036732642', '23 Trips', 'Courier', 'Active 2hrs ago'),
    createData('Yemisi Odunsayo', 'yemiodunsayo@mail.com', '+234 8036732642', '23 Trips', 'Courier', 'Active 2hrs ago'),
    createData('Yemisi Odunsayo', 'yemiodunsayo@mail.com', '+234 8036732642', '23 Trips', 'Courier', 'Active 2hrs ago'),
    createData('Yemisi Odunsayo', 'yemiodunsayo@mail.com', '+234 8036732642', '23 Trips', 'Courier', 'Active 2hrs ago'),
    createData('Yemisi Odunsayo', 'yemiodunsayo@mail.com', '+234 8036732642', '23 Trips', 'Courier', 'Active 2hrs ago'),
    createData('Yemisi Odunsayo', 'yemiodunsayo@mail.com', '+234 8036732642', '23 Trips', 'Courier', 'Active 2hrs ago'),
    createData('Yemisi Odunsayo', 'yemiodunsayo@mail.com', '+234 8036732642', '23 Trips', 'Courier', 'Active 2hrs ago')
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}



const headCells: readonly HeadCell<StaffData>[] = [
    {
        id: 'blank',
        numeric: true,
        disablePadding: false,
        label: '',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'phoneNumber',
        numeric: false,
        disablePadding: false,
        label: 'Phone Number',
    },
    {
        id: 'trip',
        numeric: true,
        disablePadding: false,
        label: 'Trip',
    },
    {
        id: 'role',
        numeric: true,
        disablePadding: false,
        label: 'Role',
    },
    {
        id: 'activity',
        numeric: true,
        disablePadding: false,
        label: 'Activity',
    },
    {
        id: 'blank',
        numeric: true,
        disablePadding: false,
        label: '',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof StaffData) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof StaffData) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
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
        </TableHead>
    );
}


export default function StaffDataTable() {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof StaffData>('name');
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentModalType, setCurrentModalType] = useState<ModalType>(ModalType.ADDSTAFFMEMBER);

    let [isOpen, setIsOpen] = useState(false);
    let [modalPosition, setModalPosition] = useState(ModalPosition.CENTER);

    const toggleModal = (options?: any) => {
        setIsOpen(!isOpen);
    }

    const changeModalType = (type: ModalType) => {
        setCurrentModalType(type);
    }


    const afterOpenModal = () => {
        document.body.style.overflow = 'hidden';
    }
    const afterCloseModal = () => {
        document.body.style.overflow = 'unset';
    }

    const onRequestCloseFn = () => {
        toggleModal();
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof StaffData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

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

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (

        <Box sx={{ width: '100%' }}>
            <Modal hideModal={() => { toggleModal() }} type={currentModalType} position={modalPosition} onRequestClose={onRequestCloseFn} onAfterClose={afterCloseModal} afterOpenModal={afterOpenModal} modalIsOpen={isOpen} />
            <Paper sx={{ width: '100%', mb: 2 }}>

                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
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

                            {rows.sort()
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name.toString());
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name.toString())}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={index}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="normal"
                                            >
                                                <div className={`d-flex align-items-center`}>
                                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'red' }}></div>
                                                    <div className={`ms-2 d-flex flex-column`}>
                                                        <span className={`fw-700 text-11`}>{row.name}</span>
                                                        <div className={`d-flex align-items-center`}>
                                                            <span className={`color-gray-600`}>{row.email}</span>

                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">
                                                <div className={`d-flex align-items-center`}>
                                                    <span className="me-3">{row.phoneNumber}</span>
                                                    <FontAwesomeIcon icon={faClone} />
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">{row.trip}</TableCell>
                                            <TableCell align="right">{row.role}</TableCell>
                                            <TableCell align="right">{row.activity}</TableCell>
                                            <TableCell align="right"><FontAwesomeIcon icon={faEllipsis} /></TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
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

        </Box >
    );
}
