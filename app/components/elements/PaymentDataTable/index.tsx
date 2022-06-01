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
import { HeadCell, PaymentData } from "../../../model/dataTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Modal from "../Modal";
import { ModalPosition, ModalType } from "../../../model/Modal";

function createData(
    paidTo: string,
    amount: number,
    description: string,
    status: string,
    dateCreated: Date,
    blank: any = ''
): PaymentData {
    return {
        paidTo,
        amount,
        description,
        status,
        dateCreated,
        blank
    };
}

const rows = [
    createData('Zenith(Acme...) 7362937253', 43863, 'Scheduled payout', 'PAID', new Date('2022-05-01'), ''),
    createData('Zenith(Acme...) 7362937253', 43863, 'Scheduled payout', 'PAID', new Date('2022-05-01'), ''),
    createData('Zenith(Acme...) 7362937253', 43863, 'Scheduled payout', 'PAID', new Date('2022-05-01'), ''),
    createData('Zenith(Acme...) 7362937253', 43863, 'Scheduled payout', 'PAID', new Date('2022-05-01'), ''),
    createData('Zenith(Acme...) 7362937253', 43863, 'Scheduled payout', 'PAID', new Date('2022-05-01'), ''),
    createData('Zenith(Acme...) 7362937253', 43863, 'Scheduled payout', 'PAID', new Date('2022-05-01'), ''),
    createData('Zenith(Acme...) 7362937253', 43863, 'Scheduled payout', 'PAID', new Date('2022-05-01'), ''),
    createData('Zenith(Acme...) 7362937253', 43863, 'Scheduled payout', 'PAID', new Date('2022-05-01'), ''),
    createData('Zenith(Acme...) 7362937253', 43863, 'Scheduled payout', 'PAID', new Date('2022-05-01'), ''),
    createData('Zenith(Acme...) 7362937253', 43863, 'Scheduled payout', 'PAID', new Date('2022-05-01'), ''),
    createData('Zenith(Acme...) 7362937253', 43863, 'Scheduled payout', 'PAID', new Date('2022-05-01'), ''),
    createData('Zenith(Acme...) 7362937253', 43863, 'Scheduled payout', 'PAID', new Date('2022-05-01'), '')
];

type Order = 'asc' | 'desc';

const headCells: readonly HeadCell<PaymentData>[] = [
    {
        id: 'dateCreated',
        numeric: false,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'paidTo',
        numeric: false,
        disablePadding: false,
        label: 'Paid To',
    },
    {
        id: 'amount',
        numeric: false,
        disablePadding: false,
        label: 'Amount',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof PaymentData) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof PaymentData) => (event: React.MouseEvent<unknown>) => {
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


export default function PaymentDataTable() {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof PaymentData>('paidTo');
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof PaymentData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.paidTo);
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
                                    const isItemSelected = isSelected(row.paidTo.toString());
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.paidTo.toString())}
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
                                                {row.dateCreated.toDateString()}
                                            </TableCell>
                                            <TableCell align="left">{row.paidTo}</TableCell>
                                            <TableCell align="left">{row.amount}</TableCell>
                                            <TableCell align="left">{row.description}</TableCell>
                                            <TableCell align="left">
                                                <div className={`d-flex flex-column`}>
                                                    <div className={`color-black`}>{row.status}</div>
                                                    <div className={`color-safety-blue hover link`}>Download Invoice</div>

                                                </div>
                                            </TableCell>

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
