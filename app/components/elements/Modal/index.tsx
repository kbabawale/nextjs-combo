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

type AppProps = {
    type: ModalType;
    modalIsOpen: boolean;
    position?: ModalPosition;
    afterOpenModal?: () => void;
    onRequestClose?: () => void;
    onAfterClose?: () => void;
    shouldCloseOnOverlayClick?: boolean;
    hideModal?: () => void;
}

const Modal = ({ modalIsOpen, type, hideModal, afterOpenModal, onAfterClose, onRequestClose, position = ModalPosition.CENTER, shouldCloseOnOverlayClick = true }: AppProps) => {
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
            width: '40%'
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


        </ReactModal>
    );


}

export default Modal;