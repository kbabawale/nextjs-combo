import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ControlButtonType } from "../../../model/buttonType";
import { ModalPosition, ModalType } from "../../../model/Modal";
import Alert from "../../elements/Alert/Alert";
import ControlButton from "../../elements/ControlButton";
import ControlInput from "../../elements/ControlInput";
import Modal from "../../elements/Modal";
import StaffDataTable from "../../elements/StaffDataTable";
import AuthSideMenu from "../../layouts/AuthSideMenu/AuthSideMenu";
import styles from './index.module.scss';

const Staff = () => {
    const [selectedTab, setSelectedTab] = useState<string>('staff');

    let [isOpen, setIsOpen] = useState(false);
    let [modalPosition, setModalPosition] = useState(ModalPosition.CENTER);

    const toggleModal = (options?: any) => {
        setIsOpen(!isOpen);
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

    return (
        <div className={`d-flex flex-column`}>
            <div className={`d-flex align-items-start`}>
                <AuthSideMenu />
                <div className={`flex-fill ${styles.borderleft} py-5 mh-90`}>
                    <main className={`d-flex flex-column`}>
                        <div className={`d-flex align-items-center border-bottom px-5`}>
                            <span onClick={() => setSelectedTab('staff')} className={`link p-3 ${selectedTab === 'staff' ? 'color-primary fw-800 border-bottom border-3 border-primary' : 'color-gray-500'} `}>Staff</span>
                        </div>
                        {/* "Staff" tab */}
                        <Modal hideModal={() => { toggleModal() }} type={ModalType.ADDSTAFFMEMBER} position={modalPosition} onRequestClose={onRequestCloseFn} onAfterClose={afterCloseModal} afterOpenModal={afterOpenModal} modalIsOpen={isOpen} />

                        <section className={`w-100 my-3 ${selectedTab === 'staff' ? 'd-block' : 'd-none'}`}>
                            <div className={`px-5 d-flex flex-column`}>
                                <span className={`fw-800 text-15 mt-5`}>Staff members</span>
                            </div>
                            <div className={`px-5 mt-4 w-100 d-flex align-items-center justify-content-between`}>
                                <div className={`d-flex align-items-center`}>
                                    <ControlInput placeholder='Search staff' />
                                </div>
                                <div className={`d-flex align-items-center`}>
                                    <div className={`me-4`}><ControlButton click={toggleModal} textColor='white' type={ControlButtonType.PRIMARY} label='Add Staff Member' icon={faAdd} /></div>
                                    <div className={``}><ControlButton type={ControlButtonType.SECONDARY} label='Save changes' /></div>
                                </div>
                            </div>
                            <div className={`px-5 mt-4 w-100 d-flex align-items-center justify-content-between`}>
                                <StaffDataTable />
                            </div>
                        </section>


                    </main>
                </div>
            </div>
        </div>
    )
};

export default Staff;