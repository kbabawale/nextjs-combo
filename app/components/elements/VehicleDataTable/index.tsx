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
import { HeadCell, VehicleDeliveryData } from "../../../model/dataTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone, faEllipsis, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Modal from "../Modal";
import { ModalPosition, ModalType } from "../../../model/Modal";

function createData(
    model: string,
    color: string,
    year: number,
    VIN: string,
    registration: string,
    status: string,
    blank: any = ''
): VehicleDeliveryData {
    return {
        model,
        color,
        year,
        VIN,
        registration,
        status,
        blank
    };
}

const rows = [
    createData('Ford, Transit', 'Red', 2009, '4Y1SL65848Z411439', 'AG90EKY', 'Good'),
    createData('Ford, Transit', 'Red', 2009, '4Y1SL65848Z411439', 'AG90EKY', 'Good'),
    createData('Ford, Transit', 'Red', 2009, '4Y1SL65848Z411439', 'AG90EKY', 'Good'),
    createData('Ford, Transit', 'Red', 2009, '4Y1SL65848Z411439', 'AG90EKY', 'Good'),
    createData('Ford, Transit', 'Red', 2009, '4Y1SL65848Z411439', 'AG90EKY', 'Good'),
    createData('Ford, Transit', 'Red', 2009, '4Y1SL65848Z411439', 'AG90EKY', 'Good'),
    createData('Ford, Transit', 'Red', 2009, '4Y1SL65848Z411439', 'AG90EKY', 'Good'),
    createData('Ford, Transit', 'Red', 2009, '4Y1SL65848Z411439', 'AG90EKY', 'Good'),
    createData('Ford, Transit', 'Red', 2009, '4Y1SL65848Z411439', 'AG90EKY', 'Good'),
    createData('Ford, Transit', 'Red', 2009, '4Y1SL65848Z411439', 'AG90EKY', 'Good'),
    createData('Ford, Transit', 'Red', 2009, '4Y1SL65848Z411439', 'AG90EKY', 'Good'),
    createData('Ford, Transit', 'Red', 2009, '4Y1SL65848Z411439', 'AG90EKY', 'Good')
];

type Order = 'asc' | 'desc';

const headCells: readonly HeadCell<VehicleDeliveryData>[] = [
    {
        id: 'model',
        numeric: false,
        disablePadding: false,
        label: 'Model',
    },
    {
        id: 'color',
        numeric: false,
        disablePadding: false,
        label: 'Color',
    },
    {
        id: 'year',
        numeric: false,
        disablePadding: false,
        label: 'Year',
    },
    {
        id: 'VIN',
        numeric: false,
        disablePadding: false,
        label: 'VIN',
    },
    {
        id: 'registration',
        numeric: false,
        disablePadding: false,
        label: 'Registration',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'blank',
        numeric: false,
        disablePadding: false,
        label: '',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof VehicleDeliveryData) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof VehicleDeliveryData) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'center' : 'left'}
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


export default function VehicleDataTable() {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof VehicleDeliveryData>('model');
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    let [isOpen, setIsOpen] = useState(false);
    let [modalPosition, setModalPosition] = useState(ModalPosition.CENTER);

    const toggleModal = (options?: any) => {
        setIsOpen(!isOpen);
        //set other modal options
    }

    const afterOpenModal = () => {
        document.body.style.overflow = 'hidden';
    }
    const afterCloseModal = () => {
        document.body.style.overflow = 'unset';
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof VehicleDeliveryData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.model);
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
            <Modal hideModal={() => { toggleModal() }} type={ModalType.VEHICLEDETAILS} position={modalPosition} onRequestClose={toggleModal} onAfterClose={afterCloseModal} afterOpenModal={afterOpenModal} modalIsOpen={isOpen} />
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
                                    const isItemSelected = isSelected(row.model.toString());
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.model.toString())}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={index}
                                            selected={isItemSelected}
                                        >

                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="normal"
                                            >
                                                {row.model}
                                            </TableCell>
                                            <TableCell align="left">{row.color}</TableCell>
                                            <TableCell align="left">{row.year}</TableCell>
                                            <TableCell align="left">{row.VIN}</TableCell>
                                            <TableCell align="left">{row.registration}</TableCell>
                                            <TableCell align="left">
                                                <div className={`d-flex flex-column`}>
                                                    <div className={`color-black`}>{row.status}</div>
                                                    <div onClick={toggleModal} className={`text-09 color-safety-blue hover link`}>View photos</div>

                                                </div>
                                            </TableCell>
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
