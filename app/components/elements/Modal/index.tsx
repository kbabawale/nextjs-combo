import Link from 'next/link';
import ReactModal from 'react-modal';
import { ButtonType, ControlButtonType } from '../../../model/buttonType';
import { ModalPosition, ModalType } from '../../../model/Modal';
import Button from '../Button/Button';
import ControlButton from '../ControlButton';
import ControlDate from '../ControlDate';
import ControlInput from '../ControlInput';
import ControlSelect, { ControlSelectType } from '../ControlSelect';
import ControlTextArea from '../ControlTextArea';
import UploadControl from '../UploadControl';
import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCloudDownload, faCloudDownloadAlt, faExclamationTriangle, faFileAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Alert from '../Alert/Alert';
import { AlertType } from '../../../model/AlertType';
import { Carousel } from 'react-bootstrap';

type AppProps = {
    type: ModalType;
    modalIsOpen: boolean;
    position?: ModalPosition;
    afterOpenModal?: () => void;
    onRequestClose?: () => void;
    onAfterClose?: () => void;
    shouldCloseOnOverlayClick?: boolean;
    hideModal?: () => void;
    toggleModalView?: () => void;
}
type VehicleRegProps = {
    title: string;
}
type VehicleDocumentProps = {
    title: string;
    filesize: number;
    expired?: boolean;
}

const VehicleRegComponent = ({ title }: VehicleRegProps) => {
    return (
        <div className={`my-4 d-flex align-items-center justify-content-between`}>
            <div className={`w-40 d-flex flex-column`}>
                <span className={`fw-800 text-12`}>{title}</span>
                <div className={`mt-3 d-flex align-items-center justify-content-between`}>
                    <div className={`me-1 d-flex flex-column`}>
                        <span className={`fw-500 text-11`}>Issue Date</span>
                        <ControlDate />
                    </div>
                    <div className={`ms-1 d-flex flex-column`}>
                        <span className={`fw-500 text-11`}>Expiry Date</span>
                        <ControlDate />
                    </div>
                </div>
            </div>
            <div className={`w-30 d-flex flex-column align-items-center rounded p-3 ${styles.dashedBorder}`}>
                <span className={`color-gray-400 text-09`}>Drag &amp; Drop to upload</span>
                <span className={`color-gray-400 text-11`}>Or</span>
                <ControlButton textColor='white' type={ControlButtonType.PRIMARY} label='Browse File' />
            </div>
        </div>
    )
}
const VehicleDocumentComponent = ({ title, filesize, expired = false }: VehicleDocumentProps) => {
    return (
        <div className={`d-flex flex-column me-3 mb-1 w-40`}>
            <div className={`border border-secondary rounded p-2 d-flex justify-content-between align-items-center`}>
                <FontAwesomeIcon color='#276EF1B2' size='2x' icon={faFileAlt} />
                <div className={`ms-3 d-flex flex-column`}>
                    <span className={`fw-600 text-09`}>{title}</span>
                    <span className={`fw-500 text-09 color-gray-600`}>{filesize}MB</span>
                </div>
                <FontAwesomeIcon className={`hover link`} size='lg' icon={faCloudDownload} />
            </div>
            <span className={`${expired ? 'error fw-800 text-09' : 'color-white'}`}>{expired ? 'Expired' : 'Not'}</span>

        </div>
    )
}

const Modal = ({ modalIsOpen, type, hideModal, toggleModalView, afterOpenModal, onAfterClose, onRequestClose, position = ModalPosition.CENTER, shouldCloseOnOverlayClick = true }: AppProps) => {
    let rightcontent = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
            top: '0px',
            marginLeft: '48%',
            width: '50%',
            height: '100vh',
            border: 'none'
        }

    }
    let centercontent = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            width: '50%',
            maxHeight: '70vh'
        }

    }


    let customStyles: any;
    if (position === ModalPosition.CENTER) {
        customStyles = centercontent;
    } else {
        customStyles = rightcontent;
    }

    let dropdownOptions: ControlSelectType = {
        options: [
            {
                label: 'Baby Care',
                value: 0,
                default: true
            }
        ]
    }

    return (
        <ReactModal
            isOpen={modalIsOpen}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
            onAfterOpen={afterOpenModal}
            onAfterClose={onAfterClose}
            ariaHideApp={false}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Example Modal">

            {
                type === ModalType.UPLOADPRODUCT &&
                <div className={`d-flex flex-column align-items-center px-3 ${styles.overflow}`}>
                    <span className={`fw-700 text-11`}>Upload Document</span>
                    <div className='mt-5'>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis metus vel diam commodo consequat. Nulla eleifend sem quam, nec porta elit pulvinar et. <Link href=""><a className='color-safety-blue'>download a sample document</a></Link></span>
                    </div>
                    <div className={`${styles.UploadProductbox} link hover py-5 w-100 my-3 d-flex flex-column align-items-center`}>
                        <span className={`color-gray-400 text-11`}>Drop to upload</span>
                        <span className={`color-gray-400 text-11`}>or</span>
                        <span className={`text-decoration-underline color-safety-blue fw-700 text-11`}>Browse file</span>
                    </div>
                    <div className={`mt-5 w-100 d-flex justify-content-between`}>
                        <Button wide={true} label='Upload' type={ButtonType.PRIMARY} />
                        <span className='mx-1'></span>
                        <Button click={() => { hideModal?.() }} wide={true} label='Cancel' textColor='red' type={ButtonType.SECONDARY} />
                    </div>
                </div>
            }
            {
                type === ModalType.UPDATEPRODUCT &&
                <div className={`d-flex flex-column px-3 ${styles.overflow}`}>
                    <div className={`mt-3 d-flex align-items-center justify-content-between`}>
                        <span className={`fw-700 text-15`}>Update Product</span>
                        <ControlButton disabled={true} label="Save changes" type={ControlButtonType.PRIMARY} />
                    </div>
                    <div className={`mt-5 d-flex flex-column`}>
                        <span className={`fw-400 text-11`}>Product name</span>
                        <ControlInput placeholder="Enter name" wide={true} />
                    </div>
                    <div className={`mt-5 d-flex flex-column`}>
                        <span className={`fw-400 text-11`}>Description</span>
                        <ControlTextArea placeholder="Enter description" wide={true} />
                    </div>
                    <div className={`mt-5 d-flex flex-column`}>
                        <span className={`fw-400 text-11`}>SKU</span>
                        <ControlInput placeholder="Enter your SKU number" wide={true} />
                    </div>
                    <div className={`mt-5 d-flex flex-column`}>
                        <span className={`fw-400 text-11`}>Photos (Add up to 8 photos)</span>
                        <div className={`mt-3 d-flex justify-content-between align-items-center flex-wrap`}>
                            <UploadControl />
                            <UploadControl />
                            <UploadControl />
                            <UploadControl />
                            <div className="w-100"></div>
                            <UploadControl />
                            <UploadControl />
                            <UploadControl />
                            <UploadControl />
                        </div>
                    </div>

                    <hr />

                    <div className={`mt-5 d-flex flex-column`}>
                        <span className={`fw-400 text-11`}>Categories</span>
                        <ControlSelect options={dropdownOptions.options} wide={true} />
                    </div>

                    <div className={`mt-3 d-flex justify-content-between align-items-center`}>
                        <span className={`fw-600 text-12`}>Price</span>
                        <div>
                            <span className="me-2">₦</span><ControlInput />
                        </div>
                    </div>

                    <div className={`mt-3 d-flex justify-content-between align-items-center`}>
                        <span className={`fw-600 text-12`}>VAT</span>
                        <div>
                            <ControlInput /><span className="ms-2">%</span>
                        </div>
                    </div>

                    <div className={`mt-5 d-flex flex-column`}>
                        <span className={`fw-700 text-15`}>Promotions</span>
                        <div className={`mt-2 d-flex  align-items-center`}>
                            <input type="checkbox" />
                            <span className={`ms-3 fw-400 text-11`}>Enable promotions to give customers special deals on your product </span>
                        </div>
                        <div className={`mt-3 d-flex justify-content-between align-items-center`}>
                            <span className={`fw-600 text-12`}>Promo Price</span>
                            <div>
                                <span className="me-2">₦</span><ControlInput />
                            </div>
                        </div>
                        <div className={`mt-3 d-flex justify-content-between align-items-center`}>
                            <span className={`fw-600 text-12`}>Promo Runtime</span>
                            <div className={`d-flex align-items-center`}>
                                <div className="me-2"><ControlDate /></div>
                                <div className=""><ControlDate /></div>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.UpdateProductdangerBG} mb-5 p-2 mt-5 d-flex  align-items-center`}>
                        <input type="checkbox" />
                        <div className="ms-3">
                            <span className="fw-800">Unpublish:</span>
                            <span className="ms-2">Mark Product as out of stock to send to unpublished list </span>
                        </div>
                    </div>
                </div>
            }
            {
                type === ModalType.ORDERDETAILS &&
                <div className={`d-flex flex-column align-items-center`}>
                    <div className={`w-100 px-3 pb-3 d-flex align-items-center justify-content-between border-bottom border-secondary`}>
                        <div className={`d-flex flex-column`}>
                            <span className={`fw-800 text-12`}>Order Details</span>
                            <span className={`color-gray-700`}>View customer information and order details</span>
                        </div>
                        <span className={`align-self-start link hover`} onClick={() => { hideModal?.() }}><FontAwesomeIcon color='black' icon={faClose} /></span>
                    </div>
                    <div className={`px-3 d-flex align-items-center justify-content-between mt-4 w-100`}>
                        <div className={`d-flex align-items-center`}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'red' }}></div>
                            <div className={`ms-2 d-flex flex-column`}>
                                <span className={`fw-700 text-11`}>Jenny Drink Stores</span>
                                <div className={`d-flex align-items-center`}>
                                    <span className={`color-gray-600`}>Over an hour ago</span>
                                    <div className={`bg-error px-2 py-1 rounded ms-2`}>
                                        <FontAwesomeIcon color="white" icon={faExclamationTriangle} />
                                        <span className={`ms-1 color-white text-09 fw-600`}>Urgent</span>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className={`d-flex align-items-center`}>
                            <div className={`${styles.pinbox} mx-1`}>3</div>
                            <div className={`${styles.pinbox} mx-1`}>3</div>
                            <div className={`${styles.pinbox} mx-1`}>3</div>
                            <div className={`${styles.pinbox} mx-1`}>3</div>
                        </div>

                    </div>

                    <div className={`px-3 w-100 mt-3`}>
                        <Alert title='Delayed Orders' label=' StoreDash recommends orders are processed within 30mins.' type={AlertType.DANGER} />
                    </div>

                    <div className={`px-3 d-flex flex-column w-100 mt-4`}>
                        <span className={`fw-800 text-11`}>Order details</span>

                        <div className={`d-flex my-3 align-items-center`}>
                            <div className={`w-30 d-flex flex-column`}>
                                <span className={`color-gray-600 text-09`}>Order number</span>
                                <span className={`text-11`}>AX7352-863</span>
                            </div>
                            <div className={`d-flex flex-column`}>
                                <span className={`color-gray-600 text-09`}>Amount</span>
                                <span className={`text-11`}>₦283,500.00 (Card Payment)</span>
                            </div>
                        </div>
                        <div className={`d-flex my-3 align-items-center`}>
                            <div className={`w-30 d-flex flex-column`}>
                                <span className={`color-gray-600 text-09`}>Customer</span>
                                <span className={`text-11`}>Jenny Drink Stores</span>
                            </div>
                            <div className={`d-flex flex-column`}>
                                <span className={`color-gray-600 text-09`}>Date/Time</span>
                                <span className={`text-11`}>Mar 4, 2022, 02:14 PM</span>
                            </div>
                        </div>
                        <div className={`d-flex my-3 align-items-center`}>
                            <div className={`w-70 d-flex flex-column`}>
                                <span className={`color-gray-600 text-09`}>Drop-off location</span>
                                <span className={`text-11`}>A.G Leventis building Iddo House, Herbert Macaulay Way, Lagos Mainland 101245, Lagos</span>
                            </div>
                        </div>
                    </div>

                    <div className={`px-3 d-flex flex-column w-100 mt-4`}>
                        <span className={`fw-800 text-11 mb-3`}>Items</span>

                        {Array.from(Array(5).keys()).map((x, index) => (
                            <div key={index} className={`mb-5 d-flex align-items-center`}>
                                <span className={`w-05`}>3x</span>
                                <div className={`rounded bg-lime-yellow`} style={{ width: '60px', height: '60px' }}></div>
                                <div className={`ms-3 d-flex flex-column`}>
                                    <span className={`fw-500 text-11`}>Coca-cola Coke Can Drink (X24 pack)</span>
                                    <span className={`fw-700 color-gray-600`}>₦4,500.00</span>
                                </div>
                            </div>
                        ))

                        }
                    </div>

                    <div className={`mt-5 w-100 d-flex justify-content-between`}>
                        <Button click={() => { toggleModalView?.() }} wide={true} label='Ready for pickup' type={ButtonType.PRIMARY} />
                        <span className='mx-1'></span>
                        <Button click={() => { hideModal?.() }} wide={true} label='Report a problem' textColor='black' type={ButtonType.SECONDARY} />
                    </div>
                </div>
            }
            {
                type === ModalType.CONFIRMPICKUP &&
                <div className={`d-flex flex-column align-items-center px-3 ${styles.overflow}`}>
                    <span className={`fw-700 text-11`}>Confirm pick-up</span>
                    <div className='mt-5'>
                        <span>
                            Please confirm that the ordered items have been packaged and labelled properly and is ready for pick up when the driver arrives. Be sure to authenticate the pickup with the 4-digit PIN.
                        </span>
                    </div>
                    <div className={`mt-5 w-100 d-flex justify-content-between`}>
                        <Button click={() => { toggleModalView?.(); hideModal?.() }} wide={true} label='Yes confirm' type={ButtonType.PRIMARY} />
                        <span className='mx-1'></span>
                        <Button click={() => { toggleModalView?.(); hideModal?.() }} wide={true} label='Cancel' textColor='red' type={ButtonType.SECONDARY} />
                    </div>
                </div>
            }
            {
                type === ModalType.UPDATEBILLING &&
                <div className={`d-flex flex-column align-items-center px-3 ${styles.overflow}`}>
                    <span className={`align-self-start fw-800 text-17`}>Update Billing info</span>
                    <span className={`align-self-start mt-1 color-gray-700`}>You can update you banking information and invoice email</span>

                    <div className={`w-100 mt-3 d-flex flex-column`}>
                        <span className={`fw-400 text-11`}>Bank</span>
                        <ControlSelect options={dropdownOptions.options} wide={true} />
                    </div>
                    <div className={`w-100 mt-5 d-flex flex-column`}>
                        <span className={`fw-400 text-11`}>Account number</span>
                        <ControlInput placeholder="123456789" wide={true} />
                    </div>
                    <div className={`w-100 mt-5 d-flex flex-column`}>
                        <span className={`fw-400 text-11`}>Account name</span>
                        <ControlInput placeholder="Acme Distributions" wide={true} />
                    </div>
                    <div className={`w-100 mt-5 d-flex flex-column`}>
                        <span className={`fw-400 text-11`}>Invoice email</span>
                        <ControlInput type='email' placeholder="joshAkanji@company.com" wide={true} />
                    </div>
                    <span className={`align-self-start color-gray-600`}>Invoices are sent to this email 3 days to the due billing date</span>

                    <div className={`mt-5 w-100 d-flex justify-content-between`}>
                        <div className={`flex-fill`}>&nbsp;</div>
                        <div className={`w-30 d-flex justify-content-between`}>
                            <Button click={() => { hideModal?.() }} wide={true} label='Save' type={ButtonType.PRIMARY} />
                            <span className='mx-1'></span>
                            <Button click={() => { hideModal?.() }} wide={true} label='Cancel' textColor='red' type={ButtonType.SECONDARY} />
                        </div>

                    </div>
                </div>
            }
            {
                type === ModalType.ADDVEHICLE &&
                <div className={`d-flex flex-column px-3 ${styles.overflow}`}>
                    <div className={`mt-3 d-flex align-items-center justify-content-between`}>
                        <span className={`fw-700 text-15`}>Add Vehicle</span>
                        <ControlButton disabled={true} label="Save changes" type={ControlButtonType.PRIMARY} />
                    </div>
                    <div className={`mt-5 d-flex align-items-center justify-content-between`}>
                        <span className={`align-self-start fw-600 text-11`}>Vehicle</span>
                        <div className={`w-60 d-flex flex-column`}>
                            <div className={`d-flex align-items-center justify-content-between`}>
                                <ControlSelect options={dropdownOptions.options} />
                                <span className='mx-1'></span>
                                <ControlSelect options={dropdownOptions.options} />
                            </div>
                            <div className={`d-flex align-items-center justify-content-between`}>
                                <ControlSelect options={dropdownOptions.options} />
                                <span className='mx-1'></span>
                                <ControlSelect options={dropdownOptions.options} />
                            </div>
                        </div>
                    </div>
                    <div className={`mt-5 d-flex flex-column`}>
                        <div className={`d-flex align-items-center justify-content-between`}>
                            <span className={`fw-400 text-11`}>Notes</span>
                            <span className={`fw-500 color-gray-700`}>0/400</span>
                        </div>
                        <ControlTextArea placeholder="Some description about the the vehicle e.g dents, custom colour (optional)" wide={true} />
                    </div>
                    <div className={`mt-5 d-flex flex-column`}>
                        <span className={`fw-400 text-11`}>Photos (Add up to 8 photos)</span>
                        <div className={`mt-3 d-flex justify-content-between align-items-center flex-wrap`}>
                            <UploadControl />
                            <UploadControl />
                            <UploadControl />
                            <UploadControl />
                            <div className="w-100"></div>
                            <UploadControl />
                            <UploadControl />
                            <UploadControl />
                            <UploadControl />
                        </div>
                    </div>
                    <hr />

                    <VehicleRegComponent title='Vehicle Registration' />
                    <VehicleRegComponent title='Driver’s License' />
                    <VehicleRegComponent title='Vehicle Insurance ' />
                    <VehicleRegComponent title='Commercial vehicle' />
                    <VehicleRegComponent title='VIO Permit' />

                    <div className={`${styles.AddVehicleinfoBG} mb-5 p-2 mt-5 d-flex  align-items-center`}>
                        <input type="checkbox" />
                        <div className="ms-3">
                            <span className="fw-800">Unlisted:</span>
                            <span className="ms-2">Mark vehicle as unlisted if this vehicle is out of commission or requires service</span>
                        </div>
                    </div>
                </div>
            }
            {
                type === ModalType.VEHICLEDETAILS &&
                <div className={`d-flex flex-column align-items-center`}>
                    <div className={`w-100 px-3 pb-3 d-flex align-items-center justify-content-between border-bottom border-secondary`}>
                        <div className={`d-flex flex-column`}>
                            <span className={`fw-800 text-12`}>Vehicle Information</span>
                            <span className={`color-gray-700`}>View vehicle information and see delivery history</span>
                        </div>
                        <span className={`align-self-start link hover`} onClick={() => { hideModal?.() }}><FontAwesomeIcon color='black' icon={faClose} /></span>
                    </div>

                    <div className={`w-100 mt-3`}>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="vehicle.svg"
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="vehicle.svg"
                                    alt="Second slide"
                                />


                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="vehicle.svg"
                                    alt="Third slide"
                                />

                            </Carousel.Item>
                        </Carousel>
                    </div>


                    <div className={`px-3 d-flex flex-column w-100 mt-4`}>
                        <span className={`fw-800 text-11`}>Overview</span>

                        <div className={`d-flex my-3 align-items-center`}>
                            <div className={`w-30 d-flex flex-column`}>
                                <span className={`color-gray-600 text-09`}>Model</span>
                                <span className={`text-11`}>Ford, Transit</span>
                            </div>
                            <div className={`d-flex flex-column`}>
                                <span className={`color-gray-600 text-09`}>Color</span>
                                <span className={`text-11`}>White</span>
                            </div>
                        </div>
                        <div className={`d-flex my-3 align-items-center`}>
                            <div className={`w-30 d-flex flex-column`}>
                                <span className={`color-gray-600 text-09`}>Year</span>
                                <span className={`text-11`}>2013</span>
                            </div>
                            <div className={`d-flex flex-column`}>
                                <span className={`color-gray-600 text-09`}>VIN</span>
                                <span className={`text-11`}>4Y1SL65848Z411439</span>
                            </div>
                        </div>
                        <div className={`d-flex my-3 align-items-center`}>
                            <div className={`w-70 d-flex flex-column`}>
                                <span className={`color-gray-600 text-09`}>Registration</span>
                                <span className={`text-11`}>AG90KKY</span>
                            </div>
                        </div>
                    </div>

                    <div className={`px-3 d-flex flex-column w-100 mt-4`}>
                        <span className={`fw-800 text-11`}>Documents</span>

                        <div className={`mt-3 d-flex flex-wrap align-items-center`}>
                            <VehicleDocumentComponent title="Vehicle Registration" filesize={1.84} />
                            <VehicleDocumentComponent title="VIO Permit" filesize={1.84} />
                            <VehicleDocumentComponent title="Drivers License" expired={true} filesize={1.84} />
                            <VehicleDocumentComponent title="Commercial Vehicle" filesize={1.84} />
                            <VehicleDocumentComponent title="Vehicle Insurance" filesize={1.84} />
                        </div>

                    </div>

                    <div className={`${styles.AddVehicleinfoBG} p-3 mt-5 d-flex w-100 align-items-center`}>
                        <input type="checkbox" />
                        <div className="ms-3">
                            <span className="fw-800">Unlisted:</span>
                            <span className="ms-2">Mark vehicle as unlisted if this vehicle is out of commission or requires service</span>
                        </div>
                    </div>

                    <div className={`mt-5 w-100 d-flex justify-content-end`}>
                        <Button click={() => { hideModal?.() }} label='Close' textColor='red' type={ButtonType.SECONDARY} />
                    </div>
                </div>
            }
            {
                type === ModalType.SETTINGSCHANGENAME &&
                <div className={`d-flex flex-column align-items-center px-3 ${styles.overflow}`}>
                    <span className={`align-self-start fw-700 text-13`}>Change Name</span>
                    <span className={`align-self-start mt-1 color-gray-500`}>Enter your full name</span>

                    <div className={`w-100 mt-3 d-flex flex-column`}>
                        <ControlInput placeholder='Name' wide={true} />
                    </div>
                    <div className={`mt-5 w-100 d-flex justify-content-between`}>
                        <div className={`flex-fill`}>&nbsp;</div>
                        <div className={`w-30 d-flex justify-content-between`}>
                            <Button click={() => { hideModal?.() }} wide={true} label='Update' type={ButtonType.PRIMARY} />
                            <span className='mx-1'></span>
                            <Button click={() => { hideModal?.() }} wide={true} label='Close' textColor='red' type={ButtonType.SECONDARY} />
                        </div>

                    </div>
                </div>
            }
            {
                type === ModalType.SETTINGSCHANGEEMAIL &&
                <div className={`d-flex flex-column align-items-center px-3 ${styles.overflow}`}>
                    <span className={`align-self-start fw-700 text-13`}>Change Email</span>
                    <span className={`align-self-start mt-1 color-gray-500`}>Only use a work/company email, you’ll receieve a validation mail to your new email address. Click the "Confirm email" button to complete the change.</span>

                    <div className={`w-100 mt-3 d-flex flex-column`}>
                        <ControlInput type='email' placeholder='New email' wide={true} />
                        <ControlInput type='password' placeholder='Enter your Storedash password' wide={true} />
                        <span className={`color-safety-blue hover link`}>Forgot Password?</span>
                    </div>
                    <div className={`mt-5 w-100 d-flex justify-content-between`}>
                        <div className={`flex-fill`}>&nbsp;</div>
                        <div className={`w-30 d-flex justify-content-between`}>
                            <Button click={() => { hideModal?.() }} wide={true} label='Update' type={ButtonType.PRIMARY} />
                            <span className='mx-1'></span>
                            <Button click={() => { hideModal?.() }} wide={true} label='Close' textColor='red' type={ButtonType.SECONDARY} />
                        </div>

                    </div>
                </div>
            }
            {
                type === ModalType.SETTINGSCHANGEPASSWORD &&
                <div className={`d-flex flex-column align-items-center px-3 ${styles.overflow}`}>
                    <span className={`align-self-start fw-700 text-13`}>Change Password</span>
                    <span className={`align-self-start mt-1 color-gray-500`}>Choose a strong password with a minimum of 8 characters, passwords are case sensitive  </span>

                    <div className={`w-100 mt-3 d-flex flex-column`}>
                        <ControlInput type='password' placeholder='Current password' wide={true} />
                        <ControlInput type='password' placeholder='New password' wide={true} />
                        <ControlInput type='password' placeholder='Confirm password' wide={true} />
                        <span className={`color-safety-blue hover link`}>Forgot Password?</span>
                    </div>
                    <div className={`mt-5 w-100 d-flex justify-content-between`}>
                        <div className={`flex-fill`}>&nbsp;</div>
                        <div className={`w-30 d-flex justify-content-between`}>
                            <Button click={() => { hideModal?.() }} wide={true} label='Update' type={ButtonType.PRIMARY} />
                            <span className='mx-1'></span>
                            <Button click={() => { hideModal?.() }} wide={true} label='Close' textColor='red' type={ButtonType.SECONDARY} />
                        </div>

                    </div>
                </div>
            }
            {
                type === ModalType.SETTINGSCHANGE2FA &&
                <div className={`d-flex flex-column align-items-center px-3 ${styles.overflow}`}>
                    <span className={`align-self-start fw-700 text-13`}>Two-factor authentication</span>
                    <span className={`align-self-start mt-1 color-gray-500`}>Two-factor authentication (2FA) ensures an additional layer of security by requiring a 4-digit PIN to authorize logins. follow the setup to get started</span>

                    <div className={`w-100 mt-3 d-flex flex-column`}>
                        <Alert title='' label='SMS charges may apply depending on your network carrier ' type={AlertType.WARNING} />
                        <ControlInput type='text' placeholder='Enter phone number' wide={true} />
                        <ControlInput type='password' placeholder='Enter your StoreDash password' wide={true} />
                        <span className={`color-safety-blue hover link`}>Forgot Password?</span>
                    </div>
                    <div className={`mt-5 w-100 d-flex justify-content-between`}>
                        <div className={`flex-fill`}>&nbsp;</div>
                        <div className={`w-30 d-flex justify-content-between`}>
                            <Button click={() => { hideModal?.() }} wide={true} label='Enable' type={ButtonType.PRIMARY} />
                            <span className='mx-1'></span>
                            <Button click={() => { hideModal?.() }} wide={true} label='Close' textColor='red' type={ButtonType.SECONDARY} />
                        </div>

                    </div>
                </div>
            }
            {
                type === ModalType.ADDSTAFFMEMBER &&
                <div className={`d-flex flex-column align-items-center px-3 ${styles.overflow}`}>
                    <span className={`align-self-start fw-700 text-13`}>Add staff info</span>
                    <span className={`align-self-start mt-1 color-gray-500`}>You can update your staff information </span>

                    <div className={`w-100 mt-3 d-flex flex-column`}>
                        <div className={`w-20 mt-3 d-flex flex-column align-items-center`}>
                            <div className={`${styles.staffprofile}`}>
                                <FontAwesomeIcon color="#6B7280" size='lg' icon={faUserPlus} />
                            </div>
                            <span className={`color-safety-blue mt-2 fw-500 text-09 hover link`}>Add photo</span>

                        </div>
                        <div className={`d-flex flex-column mt-5`}>
                            <span className={`fw-700 text-09`}>Name</span>
                            <div className={`w-100 d-flex align-items-center`}>
                                <ControlInput type='text' placeholder='First name' wide={true} />
                                <span className='mx-2'>&nbsp;</span>
                                <ControlInput type='text' placeholder='Last name' wide={true} />
                            </div>
                        </div>
                        <div className={`d-flex flex-column mt-5`}>
                            <span className={`fw-700 text-09`}>Email</span>
                            <div className={`w-100 d-flex align-items-center`}>
                                <ControlInput type='text' placeholder='staffname@ company.com' wide={true} />
                            </div>
                        </div>
                        <div className={`d-flex flex-column mt-5`}>
                            <span className={`fw-700 text-09`}>Phone number</span>
                            <div className={`w-100 d-flex align-items-center`}>
                                <ControlInput type='text' placeholder='Enter phone number' wide={true} />

                            </div>
                        </div>
                        <div className={`d-flex flex-column mt-5`}>
                            <span className={`fw-700 text-09`}>Role</span>
                            <div className={`w-100 d-flex align-items-center`}>
                                <ControlSelect options={dropdownOptions.options} wide={true} />
                            </div>
                        </div>
                        <div className={`d-flex flex-column mt-5`}>
                            <span className={`fw-700 text-09`}>ID number</span>
                            <div className={`w-100 d-flex align-items-center`}>
                                <ControlInput type='text' placeholder="Enter staff's identity number" wide={true} />

                            </div>
                        </div>
                    </div>
                    <div className={`mt-5 w-100 d-flex justify-content-between`}>
                        <div className={`flex-fill`}>&nbsp;</div>
                        <div className={`w-30 d-flex justify-content-between`}>
                            <Button click={() => { hideModal?.() }} wide={true} label='Save' type={ButtonType.PRIMARY} />
                            <span className='mx-1'></span>
                            <Button click={() => { hideModal?.() }} wide={true} label='Cancel' textColor='red' type={ButtonType.SECONDARY} />
                        </div>

                    </div>
                </div>
            }


        </ReactModal>
    );


}

export default Modal;