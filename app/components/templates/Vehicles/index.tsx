import AuthSideMenu from '../../layouts/AuthSideMenu/AuthSideMenu';
import styles from './index.module.scss';
import { useState } from 'react';
import Alert from '../../elements/Alert/Alert';
import { AlertType } from '../../../model/AlertType';
import ControlInput from '../../elements/ControlInput';
import ControlSelect, { ControlSelectType } from '../../elements/ControlSelect';
import ControlButton from '../../elements/ControlButton';
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { ControlButtonType } from '../../../model/buttonType';
import Modal from '../../elements/Modal';
import { ModalPosition, ModalType } from '../../../model/Modal';
import VehicleDataTable from '../../elements/VehicleDataTable';
// import { useDispatch, useSelector } from "react-redux";
// import { bindActionCreators } from 'redux';
// import { modalActionCreators, State } from '../../../store';

type ProductType = {
    image: string;
    name: string;
    stockCount: number;
    price: number;
}

const ProductCard = ({ name, image, stockCount, price }: ProductType) => {
    // const dispatch = useDispatch();
    // const { toggleModal } = bindActionCreators(modalActionCreators, dispatch);
    // const modalState = useSelector((state: State) => state.modal);

    let [isOpen, setIsOpen] = useState(false);
    let [modalPosition, setModalPosition] = useState(ModalPosition.RIGHT);

    const afterOpenModal = () => {
        document.body.style.overflow = 'hidden';
    }
    const afterCloseModal = () => {
        document.body.style.overflow = 'unset';
    }

    const toggleModal = () => {
        setIsOpen(!isOpen);
        //set other modal options

    }

    return (
        <div className={`px-5 border-bottom py-3 d-flex align-items-center justify-content-between`}>
            <img src={image} alt="product" />
            <div className={`flex-fill ms-4 d-flex flex-column`}>
                <span className={`text-14 fw-600`}>{name}</span>
                <span className={``}>Qty: {stockCount}</span>
            </div>
            <div className={`me-5 px-5 py-2 bg-gray-100 text-11 fw-500`}>₦{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)}</div>
            <span onClick={toggleModal} className={`link color-safety-blue text-decoration-underline`}>Update product</span>

            <Modal type={ModalType.UPDATEPRODUCT} position={modalPosition} onRequestClose={toggleModal} onAfterClose={afterCloseModal} afterOpenModal={afterOpenModal} modalIsOpen={isOpen} />

        </div>
    )
}

const ProductList = ({ title }: any) => {

    let products: ProductType[] = [
        {
            name: 'Gillette Fusion Power Men\'s Shaving Razor 5\'s',
            image: 'ariel.svg',
            stockCount: 64,
            price: 4500
        },
        {
            name: 'Gillette Fusion Power Men\'s Shaving Razor 5\'s',
            image: 'ariel.svg',
            stockCount: 64,
            price: 4500
        },
        {
            name: 'Gillette Fusion Power Men\'s Shaving Razor 5\'s',
            image: 'ariel.svg',
            stockCount: 64,
            price: 4500
        },
        {
            name: 'Gillette Fusion Power Men\'s Shaving Razor 5\'s',
            image: 'ariel.svg',
            stockCount: 64,
            price: 4500
        }
    ]

    return (
        <div className={`mt-4 d-flex flex-column`}>
            <div className={`border-bottom py-2`}>
                <span className={`px-5 text-12 fw-700`}>{title}</span>
            </div>
            {products.map((x, i) => (
                <ProductCard key={i} {...x} />
            ))}
        </div>
    )
}

const Vehicle = () => {
    const [selectedTab, setSelectedTab] = useState<string>('vehicles');

    let [isOpen, setIsOpen] = useState(false);
    let [modalPosition, setModalPosition] = useState(ModalPosition.RIGHT);

    const toggleModal = (options?: any) => {
        setIsOpen(!isOpen);
        //set other modal options
    }

    const afterOpenModal = () => {
        document.body.style.overflow = 'hidden';
    }
    const afterCloseModal = () => {
        document.body.style.overflow = 'unset';
    }

    let productlink: { url: string, label: string } = {
        url: '/orders',
        label: 'Go to orders'
    }
    let dropdownOptions: ControlSelectType = {
        options: [
            {
                label: 'Model',
                value: 0,
                default: true
            }
        ]
    }

    return (
        <div className={`d-flex flex-column`}>
            <div className={`d-flex align-items-start`}>
                <AuthSideMenu />
                <div className={`flex-fill ${styles.borderleft} py-5 mh-90`}>
                    <main className={`d-flex flex-column`}>
                        <div className={`d-flex align-items-center border-bottom px-5`}>
                            <span onClick={() => setSelectedTab('vehicles')} className={`link p-3 ${selectedTab === 'vehicles' ? 'color-primary fw-800 border-bottom border-3 border-primary' : 'color-gray-500'} `}>Vehicles</span>
                            <span onClick={() => setSelectedTab('unlisted')} className={`link p-3 ${selectedTab === 'unlisted' ? 'color-primary fw-800 border-bottom border-3 border-primary' : 'color-gray-500'}`}>Unlisted</span>
                        </div>
                        <Modal hideModal={() => setIsOpen(false)} type={ModalType.ADDVEHICLE} position={modalPosition} onRequestClose={toggleModal} onAfterClose={afterCloseModal} afterOpenModal={afterOpenModal} modalIsOpen={isOpen} />
                        {/* "vehicles" tab */}
                        <section className={`w-100 my-3 ${selectedTab === 'vehicles' ? 'd-block' : 'd-none'}`}>
                            <div className={`px-5 d-flex flex-column`}>
                                <Alert title='En Route' label='18 Vehicles are currently making deliveries' type={AlertType.INFO} link={productlink} />
                                <span className={`fw-800 text-15 mt-3`}>All Vehicles</span>
                            </div>
                            <div className={`px-5 mt-4 w-100 d-flex align-items-center justify-content-between`}>
                                <div className={`d-flex align-items-center`}>
                                    <ControlInput placeholder='Search VIN or Registration' />
                                    <div className={`ms-4`}><ControlSelect options={dropdownOptions.options} /></div>
                                </div>

                                <div className={`d-flex align-items-center`}>
                                    <div className={`me-4`}><ControlButton click={toggleModal} textColor='white' type={ControlButtonType.PRIMARY} label='Add Vehicle(s)' icon={faAdd} /></div>
                                    <div className={``}><ControlButton type={ControlButtonType.SECONDARY} label='Save changes' /></div>
                                </div>


                            </div>

                            <div className={`px-5 mt-4 w-100 d-flex align-items-center justify-content-between`}>
                                <VehicleDataTable />
                            </div>

                        </section>

                        {/* "Unlisted" tab */}
                        <section className={`w-100 my-3 ${selectedTab === 'unlisted' ? 'd-block' : 'd-none'}`}>
                            <div className={`px-5 d-flex flex-column`}>
                                <span className={`fw-800 text-15 mt-3`}>Unlisted Vehicles</span>
                            </div>
                            <div className={`px-5 mt-4 w-100 d-flex align-items-center justify-content-between`}>
                                <div className={`d-flex align-items-center`}>
                                    <ControlInput placeholder='Search VIN or Registration' />
                                    <div className={`ms-4`}><ControlSelect options={dropdownOptions.options} /></div>
                                </div>
                            </div>

                            <div className={`px-5 mt-4 w-100 d-flex align-items-center justify-content-between`}>
                                <VehicleDataTable />
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>

    )
}

export default Vehicle;