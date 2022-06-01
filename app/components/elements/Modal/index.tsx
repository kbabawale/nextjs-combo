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
import { faClose, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Alert from '../Alert/Alert';
import { AlertType } from '../../../model/AlertType';

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


        </ReactModal>
    );


}

export default Modal;