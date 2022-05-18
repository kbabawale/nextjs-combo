import { useState } from 'react';
import ReactModal from 'react-modal';
import { ModalPosition, ModalType } from '../../../model/Modal';
import ModalUpdateProduct from '../../templates/Modals/UpdateProduct';
import ModalUploadProduct from '../../templates/Modals/UploadProduct';

type AppProps = {
    type: ModalType;
    modalIsOpen: boolean;
    position?: ModalPosition;
    afterOpenModal?: () => void;
    onRequestClose?: () => void;
    onAfterClose?: () => void;
    shouldCloseOnOverlayClick?: boolean;
}

const Modal = ({ modalIsOpen, type, afterOpenModal, onAfterClose, onRequestClose, position = ModalPosition.CENTER, shouldCloseOnOverlayClick = true }: AppProps) => {
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
            marginLeft: '38%',
            width: '60%',
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
            border: 'none'
        }

    }


    let customStyles: any;
    if (position === ModalPosition.CENTER) {
        customStyles = centercontent;
    } else {
        customStyles = rightcontent;
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
                type === ModalType.UPLOADPRODUCT && <ModalUploadProduct />
            }
            {
                type === ModalType.UPDATEPRODUCT && <ModalUpdateProduct />
            }


        </ReactModal>
    );


}

export default Modal;