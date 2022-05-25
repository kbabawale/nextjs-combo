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
import { HeadCell, ProcessedOrderData } from "../../../model/dataTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Modal from "../Modal";
import { ModalPosition, ModalType } from "../../../model/Modal";

function createData(
    amount: number,
    customerName: string,
    customerProfileImage: string,
    dateCreated: Date,
    orderNumber: number,
    pin: string,
    blank: any = ''
): ProcessedOrderData {
    return {
        amount,
        customerName,
        customerProfileImage,
        dateCreated,
        orderNumber,
        pin,
        blank
    };
}

const rows = [
    createData(10000, 'Jenny Drink Stores', '', new Date('2022-05-01'), 230394, '2344'),
    createData(10000, 'Kenny Drink Stores', '', new Date('2022-05-03'), 230394, '2344'),
    createData(10000, 'Tenny Drink Stores', '', new Date('2020-05-01'), 230394, '2344'),
    createData(10000, 'Benny Drink Stores', '', new Date('2021-05-01'), 230394, '2344'),
    createData(10000, 'Denny Drink Stores', '', new Date('2022-01-31'), 230394, '2344'),
    createData(10000, 'Yenny Drink Stores', '', new Date('2022-05-01'), 230394, '2344'),
    createData(10000, 'Renny Drink Stores', '', new Date('2020-12-25'), 230394, '2344'),
    createData(10000, 'Henny Drink Stores', '', new Date('2020-11-01'), 230394, '2344')
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



const headCells: readonly HeadCell<ProcessedOrderData>[] = [
    {
        id: 'customerName',
        numeric: false,
        disablePadding: false,
        label: 'Customer',
    },
    {
        id: 'orderNumber',
        numeric: true,
        disablePadding: false,
        label: 'Order Number',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'Amount',
    },
    {
        id: 'pin',
        numeric: true,
        disablePadding: false,
        label: 'Pin',
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
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ProcessedOrderData) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof ProcessedOrderData) => (event: React.MouseEvent<unknown>) => {
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


export default function ProcessedOrderDataTable() {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof ProcessedOrderData>('customerName');
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentModalType, setCurrentModalType] = useState<ModalType>(ModalType.ORDERDETAILS);

    let [isOpen, setIsOpen] = useState(false);
    let [modalPosition, setModalPosition] = useState(ModalPosition.CENTER);

    const toggleModal = (options?: any) => {
        setIsOpen(!isOpen);
    }

    const changeModalType = (type: ModalType) => {
        setCurrentModalType(type);
    }

    const toggleModalView = () => {
        if (currentModalType === ModalType.CONFIRMPICKUP) {
            setCurrentModalType(ModalType.ORDERDETAILS);
        } else {
            setCurrentModalType(ModalType.CONFIRMPICKUP);
        }

    }


    const afterOpenModal = () => {
        document.body.style.overflow = 'hidden';
    }
    const afterCloseModal = () => {
        document.body.style.overflow = 'unset';
    }

    const onRequestCloseFn = () => {
        toggleModal();
        toggleModalView();
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof ProcessedOrderData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.customerName);
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
            <Modal hideModal={() => { toggleModal() }} toggleModalView={toggleModalView} type={currentModalType} position={modalPosition} onRequestClose={onRequestCloseFn} onAfterClose={afterCloseModal} afterOpenModal={afterOpenModal} modalIsOpen={isOpen} />
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

                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.customerName.toString());
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.customerName.toString())}
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
                                                <div className={`d-flex align-items-center`}>
                                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'red' }}></div>
                                                    <div className={`ms-2 d-flex flex-column`}>
                                                        <span className={`fw-700 text-11`}>{row.customerName}</span>
                                                        <div className={`d-flex align-items-center`}>
                                                            <span className={`color-gray-600`}>16 items</span>
                                                            {index % 2 ? <div className={`bg-chipAccent px-2 py-1 rounded ms-2`}>
                                                                <FontAwesomeIcon className={`color-gray-500`} icon={faCheckCircle} />
                                                                <span className={`ms-1 color-gray-500 text-09 fw-600`}>Driver Assigned</span>
                                                            </div>
                                                                :
                                                                <div style={{ background: '#D2E12217' }} className={`px-2 py-1 rounded ms-2`}>
                                                                    <FontAwesomeIcon className={`color-gray-800`} icon={faSpinner} />
                                                                    <span className={`ms-1 color-gray-800 text-09 fw-600`}>Searching for driver...</span>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">{row.orderNumber}</TableCell>
                                            <TableCell align="right">{row.amount}</TableCell>
                                            <TableCell align="right">
                                                <div className={`d-flex align-items-center justify-content-end`}>
                                                    <div className={`mx-1 d-flex align-items-center justify-content-center fw-700 text-12`} style={{ width: '30px', height: '30px', background: '#276EF1', color: 'white' }}>4</div>
                                                    <div className={`mx-1 d-flex align-items-center justify-content-center fw-700 text-12`} style={{ width: '30px', height: '30px', background: '#276EF1', color: 'white' }}>4</div>
                                                    <div className={`mx-1 d-flex align-items-center justify-content-center fw-700 text-12`} style={{ width: '30px', height: '30px', background: '#276EF1', color: 'white' }}>4</div>
                                                    <div className={`mx-1 d-flex align-items-center justify-content-center fw-700 text-12`} style={{ width: '30px', height: '30px', background: '#276EF1', color: 'white' }}>4</div>

                                                </div>
                                            </TableCell>
                                            <TableCell align="right"><span onClick={toggleModal} className={`link hover color-safety-blue text-decoration-underline fw-700`}>View details</span></TableCell>
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
