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

const Products = () => {
    const [selectedTab, setSelectedTab] = useState<string>('all');

    let [isOpen, setIsOpen] = useState(false);
    let [modalPosition, setModalPosition] = useState(ModalPosition.CENTER);

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
        url: '/',
        label: 'View Products'
    }
    let dropdownOptions: ControlSelectType = {
        options: [
            {
                label: 'All categories',
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
                            <span onClick={() => setSelectedTab('all')} className={`link p-3 ${selectedTab === 'all' ? 'color-primary fw-800 border-bottom border-3 border-primary' : 'color-gray-500'} `}>All</span>
                            <span onClick={() => setSelectedTab('onlineProducts')} className={`link p-3 ${selectedTab === 'onlineProducts' ? 'color-primary fw-800 border-bottom border-3 border-primary' : 'color-gray-500'}`}>Online Products</span>
                            <span onClick={() => setSelectedTab('unpublished')} className={`link p-3 ${selectedTab === 'unpublished' ? 'color-primary fw-800 border-bottom border-3 border-primary' : 'color-gray-500'}`}>Unpublished</span>
                        </div>
                        {/* "All" tab */}
                        <section className={`w-100 my-3 ${selectedTab === 'all' ? 'd-block' : 'd-none'}`}>
                            <div className={`px-5 d-flex flex-column`}>
                                <Alert title='Low Inventory' label='You have 3 products with less than 5 quantities available' type={AlertType.DANGER} link={productlink} />
                                <span className={`fw-800 text-15 mt-3`}>All Products</span>
                                <span className={`fw-400 text-11 w-60 mt-2`}>These order have been purchased and a driver is on their way to pick up from your warehouse location, please  package and label the order while waiting.</span>

                            </div>
                            <div className={`px-5 mt-4 w-100 d-flex align-items-center justify-content-between`}>
                                <div className={`d-flex align-items-center`}>
                                    <ControlInput placeholder='Search products' />
                                    <div className={`ms-4`}><ControlSelect options={dropdownOptions.options} /></div>
                                </div>

                                <div className={`d-flex align-items-center`}>
                                    <div className={`me-4`}><ControlButton click={toggleModal} textColor='white' type={ControlButtonType.PRIMARY} label='Add New Item' icon={faAdd} /></div>
                                    <div className={``}><ControlButton type={ControlButtonType.SECONDARY} label='Save changes' /></div>
                                </div>

                                <Modal hideModal={() => setIsOpen(false)} type={ModalType.UPLOADPRODUCT} position={modalPosition} onRequestClose={toggleModal} onAfterClose={afterCloseModal} afterOpenModal={afterOpenModal} modalIsOpen={isOpen} />

                            </div>

                            <ProductList title="Online Products" />

                            <div className='mt-5'><ProductList title="Low Inventory" /></div>

                        </section>

                        <section className={`w-100 my-3 ${selectedTab === 'onlineProducts' ? 'd-block' : 'd-none'}`}>
                            <div className={`px-5 d-flex flex-column`}>
                                <Alert title='Low Inventory' label='You have 3 products with less than 5 quantities available' type={AlertType.DANGER} link={productlink} />
                                <span className={`fw-800 text-15 mt-3`}>Online Products</span>
                                <span className={`fw-400 text-11 w-60 mt-2`}>These order have been purchased and a driver is on their way to pick up from your warehouse location, please  package and label the order while waiting.</span>

                            </div>
                            <div className={`px-5 mt-4 w-100 d-flex align-items-center justify-content-between`}>
                                <div className={`d-flex align-items-center`}>
                                    <ControlInput placeholder='Search products' />
                                    <div className={`ms-4`}><ControlSelect options={dropdownOptions.options} /></div>
                                </div>

                                <div className={`d-flex align-items-center`}>
                                    <div className={`me-4`}><ControlButton textColor='white' type={ControlButtonType.PRIMARY} label='Add New Item' icon={faAdd} /></div>
                                    <div className={``}><ControlButton type={ControlButtonType.SECONDARY} label='Save changes' /></div>
                                </div>

                            </div>

                            <ProductList title="Online Products" />
                        </section>


                        <section className={`w-100 my-3 ${selectedTab === 'unpublished' ? 'd-block' : 'd-none'}`}>
                            <div className={`px-5 d-flex flex-column`}>
                                <Alert title='Low Inventory' label='You have 3 products with less than 5 quantities available' type={AlertType.DANGER} link={productlink} />
                                <span className={`fw-800 text-15 mt-3`}>Unpublished Products</span>
                                <span className={`fw-400 text-11 w-60 mt-2`}>These order have been purchased and a driver is on their way to pick up from your warehouse location, please  package and label the order while waiting.</span>

                            </div>
                            <div className={`px-5 mt-4 w-100 d-flex align-items-center justify-content-between`}>
                                <div className={`d-flex align-items-center`}>
                                    <ControlInput placeholder='Search products' />
                                    <div className={`ms-4`}><ControlSelect options={dropdownOptions.options} /></div>
                                </div>

                                <div className={`d-flex align-items-center`}>
                                    <div className={`me-4`}><ControlButton textColor='white' type={ControlButtonType.PRIMARY} label='Add New Item' icon={faAdd} /></div>
                                    <div className={``}><ControlButton type={ControlButtonType.SECONDARY} label='Save changes' /></div>
                                </div>

                            </div>

                            <ProductList title="Low Inventory" />
                            <ProductList title="Incomplete Photos" />
                            <ProductList title="Unlisted" />
                        </section>
                    </main>
                </div>
            </div>
        </div>

    )
}

export default Products;