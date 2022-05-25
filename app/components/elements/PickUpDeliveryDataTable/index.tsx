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
import { HeadCell, PickUpDeliveryData } from "../../../model/dataTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Modal from "../Modal";
import { ModalPosition, ModalType } from "../../../model/Modal";

function createData(
    driverName: string,
    driverProfileImage: string,
    orderNumber: number,
    numberPlate: string,
    vehicle: string,
    dateCreated: Date,
    pin: string,
    blank: any = ''
): PickUpDeliveryData {
    return {
        driverName,
        driverProfileImage,
        orderNumber,
        numberPlate,
        vehicle,
        dateCreated,
        pin,
        blank
    };
}

const rows = [
    createData('Temisan Okafor', '', 43863, 'AD 724 KJA', 'Toyota Corolla, Green', new Date('2022-05-01'), '2344'),
    createData('Temisan Okafor', '', 43863, 'AD 724 KJA', 'Toyota Corolla, Green', new Date('2022-05-01'), '2344'),
    createData('Temisan Okafor', '', 43863, 'AD 724 KJA', 'Toyota Corolla, Green', new Date('2022-05-01'), '2344'),
    createData('Temisan Okafor', '', 43863, 'AD 724 KJA', 'Toyota Corolla, Green', new Date('2022-05-01'), '2344'),
    createData('Temisan Okafor', '', 43863, 'AD 724 KJA', 'Toyota Corolla, Green', new Date('2022-05-01'), '2344'),
    createData('Temisan Okafor', '', 43863, 'AD 724 KJA', 'Toyota Corolla, Green', new Date('2022-05-01'), '2344'),
    createData('Temisan Okafor', '', 43863, 'AD 724 KJA', 'Toyota Corolla, Green', new Date('2022-05-01'), '2344'),
    createData('Temisan Okafor', '', 43863, 'AD 724 KJA', 'Toyota Corolla, Green', new Date('2022-05-01'), '2344'),
    createData('Temisan Okafor', '', 43863, 'AD 724 KJA', 'Toyota Corolla, Green', new Date('2022-05-01'), '2344')
];

type Order = 'asc' | 'desc';

const headCells: readonly HeadCell<PickUpDeliveryData>[] = [
    {
        id: 'driverName',
        numeric: false,
        disablePadding: false,
        label: 'Driver',
    },
    {
        id: 'orderNumber',
        numeric: true,
        disablePadding: false,
        label: 'Order Number',
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
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof PickUpDeliveryData) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof PickUpDeliveryData) => (event: React.MouseEvent<unknown>) => {
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


export default function PickUpDeliveryDataTable() {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof PickUpDeliveryData>('driverName');
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
        property: keyof PickUpDeliveryData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.driverName);
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

                            {rows.sort()
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.driverName.toString());
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.driverName.toString())}
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
                                                        <span className={`fw-700 text-11`}>{row.driverName}</span>
                                                        <div className={`d-flex align-items-center`}>
                                                            <span className={`color-gray-600`}>{row.vehicle}</span>
                                                            <div className={`bg-chipAccent px-2 py-1 rounded ms-2`}>
                                                                <span className={`ms-1 color-black text-09 fw-700`}>{row.numberPlate}</span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell align="center">{row.orderNumber}</TableCell>
                                            <TableCell align="center">
                                                <div className={`d-flex align-items-center justify-content-center`}>
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
