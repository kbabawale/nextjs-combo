import AuthSideMenu from '../../layouts/AuthSideMenu/AuthSideMenu';
import styles from './index.module.scss';
import Link from 'next/link'
import Image from 'next/image'
import profile from '../../../../public/profile.svg';
import info from '../../../../public/info.svg';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { nFormatter } from '../../../util/numberFormatter';

type Product = {
    id?: number;
    name: string;
    image: string; //ariel.svg
    orders: string;
}

const ProductCard = (obj: Product) => {
    return (
        <div className={`d-flex align-items-center justify-content-between px-3 py-3`}>
            <img src={obj.image} alt="Product" />
            <span className={`ms-3 flex-fill color-black`}>{obj.name}</span>
            <div className={`d-flex flex-column`}>
                <span className={`fw-700 text-12`}>{obj.orders}</span>
                <span className={`text-07 color-gray-500`}>Orders</span>
            </div>
        </div>
    )
}

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState<string>('earnings');

    const products: Product[] = [
        {
            id: 1,
            name: 'Ariel Machine Expert Ultimate Clean 900g',
            image: `ariel.svg`,
            orders: nFormatter(18000)
        },
        {
            id: 2,
            name: 'Ariel Machine Expert Ultimate Clean 900g',
            image: `ariel.svg`,
            orders: nFormatter(18000)
        },
        {
            id: 3,
            name: 'Ariel Machine Expert Ultimate Clean 900g',
            image: `ariel.svg`,
            orders: nFormatter(18000)
        }
    ];

    return (
        <div className={`d-flex flex-column`}>
            <div className={`d-flex align-items-start`}>
                <AuthSideMenu />
                <div className={`flex-fill ${styles.borderleft} p-5 mh-90`}>
                    <section className={`w-40 d-flex align-items-center justify-content-between`}>
                        <Image src={profile} alt="Profile" />
                        <div className={`w-80 d-flex flex-column`}>
                            <span className={`fw-700 text-11`}>Acme distributions, Ikeja lagos</span>
                            <span className={`fw-400 text-09 color-gray-500`}>A.G Leventis building Iddo House, Herbert Macaulay Way, Lagos Mainland 101245, Lagos</span>

                        </div>
                    </section>

                    <section className={`d-flex align-items-center px-5 py-4 justify-content-between mt-5 border rounded`}>
                        <div className={`d-flex flex-column`}>
                            <span className={`fw-600 color-black`}>Available for payout</span>
                            <div className={`d-flex align-items-center`}>
                                <span className={`fw-600 text-22 color-black me-3`}>₦14.2M</span>
                                <OverlayTrigger
                                    key='bottom'
                                    placement='bottom'
                                    overlay={
                                        <Tooltip id={`tooltip-bottom`}>
                                            <div className={`d-flex flex-column`}>
                                                <span className={`color-gray-400 text-09`}>Available for payment</span>
                                                <span className={`fw-500 color-white text-11`}>₦14,243,473.88</span>
                                            </div>
                                        </Tooltip>
                                    }
                                >
                                    <div><Image src={info} alt="info" /></div>

                                </OverlayTrigger>
                            </div>



                            <Link href=''><a className={`fw-700 link hover color-safety-blue`}>Go to Payments</a></Link>
                        </div>
                        <div className={`${styles.hline}`}></div>

                        <div className={`d-flex flex-column`}>
                            <span className={`fw-600 color-black`}>Today revenue</span>
                            <div className={`d-flex align-items-center`}>
                                <span className={`fw-600 text-22 color-black me-3`}>₦300k</span>
                                <OverlayTrigger
                                    key='bottom'
                                    placement='bottom'
                                    overlay={
                                        <Tooltip id={`tooltip-bottom`}>
                                            <div className={`d-flex flex-column`}>
                                                <span className={`color-gray-400 text-09`}>Available for payment</span>
                                                <span className={`fw-500 color-white text-11`}>₦14,243,473.88</span>
                                            </div>
                                        </Tooltip>
                                    }
                                >
                                    <div><Image src={info} alt="info" /></div>

                                </OverlayTrigger>
                            </div>



                            <span className={`fw-500 color-gray-500`}>47 completed orders since 9:12 AM </span>
                        </div>


                        <div className={`${styles.hline}`}></div>

                        <div className={`d-flex flex-column`}>
                            <span className={`fw-600 color-black`}>Today order’s volume</span>
                            <div className={`d-flex align-items-center`}>
                                <span className={`fw-600 text-22 color-black me-3`}>124</span>
                            </div>



                            <Link href=''><a className={`fw-700 link hover color-safety-blue`}>Go to best selling product</a></Link>
                        </div>
                    </section>

                    <section className={`mt-5 d-flex align-items-center`}>
                        <aside className={`border rounded w-70`}>
                            <div className={`d-flex align-items-center border-bottom px-3`}>
                                <span onClick={() => setSelectedTab('earnings')} className={`link p-3 ${selectedTab === 'earnings' ? 'color-primary fw-800 border-bottom border-3 border-primary' : 'color-gray-500'} `}>Earnings</span>
                                <span onClick={() => setSelectedTab('productSales')} className={`link p-3 ${selectedTab === 'productSales' ? 'color-primary fw-800 border-bottom border-3 border-primary' : 'color-gray-500'}`}>Product Sales</span>
                                <span onClick={() => setSelectedTab('orderVolume')} className={`link p-3 ${selectedTab === 'orderVolume' ? 'color-primary fw-800 border-bottom border-3 border-primary' : 'color-gray-500'}`}>Order Volume</span>
                                <div className={`bg-gray-100 ${styles.rounded} px-3 py-2 link hover`}>
                                    <span className={`pe-2 fw-600 text-09`}>Past week</span>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </div>
                            </div>
                            <div id='earnings' className={`${styles.tabbox} ${selectedTab === 'earnings' ? 'd-block' : 'd-none'} p-3`}>
                                <span>Earnings</span>
                            </div>
                            <div id='productsales' className={`${styles.tabbox} ${selectedTab === 'productSales' ? 'd-block' : 'd-none'} p-3`}>
                                <span>Product Sales</span>
                            </div>
                            <div id='ordervolume' className={`${styles.tabbox} ${selectedTab === 'orderVolume' ? 'd-block' : 'd-none'} p-3`}>
                                <span>Order Volume</span>
                            </div>
                        </aside>
                        <div className='px-4'>&nbsp;</div>
                        <aside className={`bg-safety-blue ${styles.tabboxfullheight} d-flex flex-column justify-content-center align-items-center border rounded w-30`}>
                            <span className={`fw-700 color-white`}>New Pick-Up</span>
                            <div className={`${styles.profile} bg-gray-200 mt-4`}></div>
                            <span className={`fw-700 color-white mt-3`}>Temisan Okafor</span>
                            <div className={`d-flex align-items-center`}>
                                <span className={`fw-400 text-09 color-white`}>Toyota Corolla, Green</span>
                                <div className={`${styles.dots} mx-1`}></div>
                                <span className={`fw-400 text-09 color-white`}>AD 724 KJA</span>
                            </div>
                            <div className={`${styles.boxes} d-flex align-items-center mt-3`}>
                                <div className={`${styles.box} fw-700 text-12 me-2`}>3</div>
                                <div className={`${styles.box} fw-700 text-12 me-2`}>0</div>
                                <div className={`${styles.box} fw-700 text-12 me-2`}>9</div>
                                <div className={`${styles.box} fw-700 text-12 me-2`}>1</div>
                            </div>
                            <div className={`${styles.button} text-center fw-700 px-5 py-2 link hover mt-4`}>
                                View Order Details
                            </div>
                        </aside>
                    </section>

                    <section className={`mt-5 d-flex align-items-center`}>
                        <aside className={`border rounded w-50`}>
                            <div className={`d-flex align-items-center border-bottom p-3`}>
                                <div className={`d-flex flex-column`}>
                                    <span className={`fw-600`}>Top Selling Products</span>
                                    <span className={`text-09 color-gray-500`}>Products are ranked by order volume</span>
                                </div>
                                <div className={`bg-gray-100 ${styles.rounded} px-3 py-2 link hover`}>
                                    <span className={`pe-2 fw-600 text-09`}>Feb 27 - Mar 06</span>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </div>
                            </div>
                            <div className={`${styles.tabbox2} d-flex flex-column p-3`}>
                                {products.map(x => (<ProductCard name={x.name} image={x.image} orders={x.orders} key={x.id} />))}
                                <Link href=""><a className={`mt-3 color-safety-blue fw-700 text-center text-decoration-underline`}>View all products</a></Link>
                            </div>

                        </aside>
                        <div className='px-4'>&nbsp;</div>
                        <aside className={`${styles.tabboxfullheight2} d-flex flex-column justify-content-between align-items-center  rounded w-50`}>
                            <div className={`d-flex align-items-center justify-content-between border w-100 p-3`}>
                                <div className={`${styles.profileimage}`}>&nbsp;</div>
                                <div className={`d-flex flex-column flex-fill ms-3`}>
                                    <span className={`fw-700 text-12`}>Temisan Okafor</span>
                                    <span className={`color-gray-500`}>15mins ago</span>
                                </div>
                                <Link href=""><a className='d-flex fw-700 color-safety-blue text-decoration-underline'>Process Order</a></Link>
                            </div>
                            <div className={`d-flex align-items-center justify-content-between border w-100 p-3`}>
                                <div className={`${styles.profileimage}`}>&nbsp;</div>
                                <div className={`d-flex flex-column flex-fill ms-3`}>
                                    <span className={`fw-700 text-12`}>Temisan Okafor</span>
                                    <span className={`color-gray-500`}>15mins ago</span>
                                </div>
                                <Link href=""><a className='d-flex fw-700 color-safety-blue text-decoration-underline'>Process Order</a></Link>
                            </div>
                            <div className={`d-flex align-items-center justify-content-between border w-100 p-3`}>
                                <div className={`${styles.profileimage}`}>&nbsp;</div>
                                <div className={`d-flex flex-column flex-fill ms-3`}>
                                    <span className={`fw-700 text-12`}>Temisan Okafor</span>
                                    <span className={`color-gray-500`}>15mins ago</span>
                                </div>
                                <Link href=""><a className='d-flex fw-700 color-safety-blue text-decoration-underline'>Process Order</a></Link>
                            </div>
                            <div className={`d-flex align-items-center justify-content-between border w-100 p-3`}>
                                <div className={`${styles.profileimage}`}>&nbsp;</div>
                                <div className={`d-flex flex-column flex-fill ms-3`}>
                                    <span className={`fw-700 text-12`}>Temisan Okafor</span>
                                    <span className={`color-gray-500`}>15mins ago</span>
                                </div>
                                <Link href=""><a className='d-flex fw-700 color-safety-blue text-decoration-underline'>Process Order</a></Link>
                            </div>
                        </aside>
                    </section>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;