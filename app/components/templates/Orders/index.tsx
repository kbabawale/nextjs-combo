import { useState } from "react";
import { AlertType } from "../../../model/AlertType";
import Alert from "../../elements/Alert/Alert";
import ControlInput from "../../elements/ControlInput";
import NewOrderDataTable from "../../elements/NewOrderDataTable";
import ProcessedOrderDataTable from "../../elements/ProcessedOrderDataTable";
import AuthSideMenu from "../../layouts/AuthSideMenu/AuthSideMenu";
import styles from './index.module.scss';

const Order = () => {
    const [selectedTab, setSelectedTab] = useState<string>('new');

    let productlink: { url: string, label: string } = {
        url: '/',
        label: 'Process delayed order(s)'
    }




    return (
        <div className={`d-flex flex-column`}>
            <div className={`d-flex align-items-start`}>
                <AuthSideMenu />
                <div className={`flex-fill ${styles.borderleft} py-5 mh-90`}>
                    <main className={`d-flex flex-column`}>
                        <div className={`d-flex align-items-center border-bottom px-5`}>
                            <span onClick={() => setSelectedTab('new')} className={`link p-3 ${selectedTab === 'new' ? 'color-primary fw-800 border-bottom border-3 border-primary' : 'color-gray-500'} `}>New Orders</span>
                            <span onClick={() => setSelectedTab('processed')} className={`link p-3 ${selectedTab === 'processed' ? 'color-primary fw-800 border-bottom border-3 border-primary' : 'color-gray-500'}`}>Processed Orders</span>
                        </div>
                        {/* "New" tab */}
                        <section className={`w-100 my-3 ${selectedTab === 'new' ? 'd-block' : 'd-none'}`}>
                            <div className={`px-5 d-flex flex-column`}>
                                <Alert title='Delayed Orders' label='You have 2 urgent orders, be sure to process an order with 15 - 30 mins' type={AlertType.DANGER} link={productlink} />
                                <span className={`fw-800 text-15 mt-5`}>New Orders</span>
                                <span className={`fw-400 text-11 w-60 mt-2`}>These order have been purchased and a driver is on their way to pick up from your warehouse location, please  package and label the order while waiting.</span>
                            </div>
                            <div className={`px-5 mt-4 w-100 d-flex align-items-center justify-content-between`}>
                                <div className={`d-flex align-items-center`}>
                                    <ControlInput placeholder='Search orders' />
                                </div>
                            </div>
                            <div className={`px-5 mt-4 w-100 d-flex align-items-center justify-content-between`}>
                                <NewOrderDataTable />
                            </div>
                        </section>

                        {/* "Processed" tab */}
                        <section className={`w-100 my-3 ${selectedTab === 'processed' ? 'd-block' : 'd-none'}`}>
                            <div className={`px-5 d-flex flex-column`}>
                                <span className={`fw-800 text-15 mt-5`}>Processed Orders</span>
                                <span className={`fw-400 text-11 w-60 mt-2`}>These order have been purchased and a driver is on their way to pick up from your warehouse location, please  package and label the order while waiting.</span>
                            </div>
                            <div className={`px-5 mt-4 w-100 d-flex align-items-center justify-content-between`}>
                                <div className={`d-flex align-items-center`}>
                                    <ControlInput placeholder='Search orders' />
                                </div>
                            </div>
                            <div className={`px-5 mt-4 w-100 d-flex align-items-center justify-content-between`}>
                                <ProcessedOrderDataTable />
                            </div>

                        </section>
                    </main>
                </div>
            </div>
        </div>
    )
};

export default Order;