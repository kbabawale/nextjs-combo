import { useState } from "react";
import { AlertType } from "../../../model/AlertType";
import Alert from "../../elements/Alert/Alert";
import ControlInput from "../../elements/ControlInput";
import DropOffDeliveryDataTable from "../../elements/DropOffDeliveryDataTable";
import PickUpDeliveryDataTable from "../../elements/PickUpDeliveryDataTable";
import ProcessedOrderDataTable from "../../elements/ProcessedOrderDataTable";
import AuthSideMenu from "../../layouts/AuthSideMenu/AuthSideMenu";
import styles from './index.module.scss';

const Delivery = () => {
    const [selectedTab, setSelectedTab] = useState<string>('pickup');


    return (
        <div className={`d-flex flex-column`}>
            <div className={`d-flex align-items-start`}>
                <AuthSideMenu />
                <div className={`flex-fill ${styles.borderleft} py-5 mh-90`}>
                    <main className={`d-flex flex-column`}>
                        <div className={`d-flex align-items-center border-bottom px-5`}>
                            <span onClick={() => setSelectedTab('pickup')} className={`link p-3 ${selectedTab === 'pickup' ? 'color-primary fw-800 border-bottom border-3 border-primary' : 'color-gray-500'} `}>Delivery (Pick-up)</span>
                            <span onClick={() => setSelectedTab('dropoff')} className={`link p-3 ${selectedTab === 'dropoff' ? 'color-primary fw-800 border-bottom border-3 border-primary' : 'color-gray-500'}`}>Delivery (Drop-off)</span>
                        </div>
                        {/* "New" tab */}
                        <section className={`w-100 my-3 ${selectedTab === 'pickup' ? 'd-block' : 'd-none'}`}>
                            <div className={`px-5 d-flex flex-column`}>
                                <span className={`fw-800 text-15 mt-5`}>Delivery (Pick-up)</span>
                                <span className={`fw-400 text-11 w-60 mt-2`}>These order have been purchased and a driver is on their way to pick up from your warehouse location, please  package and label the order while waiting.</span>
                            </div>
                            <div className={`px-5 mt-4 w-100 d-flex align-items-center justify-content-between`}>
                                <div className={`d-flex align-items-center`}>
                                    <ControlInput placeholder='Search incoming...' />
                                </div>
                            </div>
                            <div className={`px-5 mt-4 w-100 d-flex align-items-center justify-content-between`}>
                                <PickUpDeliveryDataTable />
                            </div>
                        </section>

                        {/* "Processed" tab */}
                        <section className={`w-100 my-3 ${selectedTab === 'dropoff' ? 'd-block' : 'd-none'}`}>
                            <div className={`px-5 d-flex flex-column`}>
                                <span className={`fw-800 text-15 mt-5`}>Delivery (Drop-off)</span>
                                <span className={`fw-400 text-11 w-60 mt-2`}>These order have been purchased and a driver is on their way to pick up from your warehouse location, please  package and label the order while waiting.</span>
                            </div>
                            <div className={`px-5 mt-4 w-100 d-flex align-items-center justify-content-between`}>
                                <div className={`d-flex align-items-center`}>
                                    <ControlInput placeholder='Search incoming...' />
                                </div>
                            </div>
                            <div className={`px-5 mt-4 w-100 d-flex align-items-center justify-content-between`}>
                                <DropOffDeliveryDataTable />
                            </div>

                        </section>
                    </main>
                </div>
            </div>
        </div>
    )
};

export default Delivery;