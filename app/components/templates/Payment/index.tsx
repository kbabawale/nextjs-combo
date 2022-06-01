import { useState } from "react";
import { ModalPosition, ModalType } from "../../../model/Modal";
import Modal from "../../elements/Modal";
import PaymentDataTable from "../../elements/PaymentDataTable";
import AuthSideMenu from "../../layouts/AuthSideMenu/AuthSideMenu";
import styles from './index.module.scss';

const Payment = () => {
    const [selectedTab, setSelectedTab] = useState<string>('payments');

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
                            <span onClick={() => setSelectedTab('payments')} className={`link p-3 ${selectedTab === 'payments' ? 'color-primary fw-800 border-bottom border-3 border-primary' : 'color-gray-500'} `}>Payments</span>
                        </div>


                        {/* "payments" tab */}
                        <section className={`w-100 px-5 mb-2 my-3 ${selectedTab === 'payments' ? 'd-block' : 'd-none'}`}>
                            <Modal type={ModalType.UPDATEBILLING} hideModal={() => { toggleModal() }} position={modalPosition} onRequestClose={onRequestCloseFn} onAfterClose={afterCloseModal} afterOpenModal={afterOpenModal} modalIsOpen={isOpen} />

                            <div className={`d-flex align-items-center px-5 py-4 justify-content-between mt-5 border rounded`}>
                                <div className={`d-flex flex-column`}>
                                    <span className={`fw-400 color-gray-800`}>Next payment due date</span>
                                    <div className={`d-flex align-items-center`}>
                                        <span className={`fw-600 text-22 color-black me-3`}>Mar 8, 2022</span>

                                    </div>
                                </div>
                                <div className={`${styles.hline}`}></div>

                                <div className={`d-flex flex-column`}>
                                    <span className={`fw-400 color-gray-800`}>Invoices sent to</span>
                                    <span className={`fw-500 color-black me-3`}>Joshakanji@company.com</span>
                                    <span onClick={toggleModal} className={`fw-500 color-safety-blue link hover mt-3`}>Change</span>

                                </div>


                                <div className={`${styles.hline}`}></div>

                                <div className={`d-flex flex-column`}>
                                    <span className={`fw-400 color-gray-800`}>Bank account</span>
                                    <span className={`fw-500 color-black me-3`}>Zenith Bank — Acme Distributions</span>
                                    <span className={`fw-500 color-black`}>8372645227</span>

                                </div>
                            </div>

                            <div className={`mt-5 w-100 d-flex align-items-center justify-content-between`}>
                                <PaymentDataTable />
                            </div>
                        </section>


                    </main>
                </div>
            </div>
        </div>
    )
};

export default Payment;