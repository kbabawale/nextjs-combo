import AuthSideMenu from '../../layouts/AuthSideMenu/AuthSideMenu';
import styles from './index.module.scss';
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react';

const Products = () => {
    const [selectedTab, setSelectedTab] = useState<string>('all');
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
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Products;