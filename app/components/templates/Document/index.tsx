import AuthSideMenu from '../../layouts/AuthSideMenu/AuthSideMenu';
import styles from './index.module.scss';
import { useState } from 'react';
import { faFileAlt, faCloudDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type VehicleDocumentProps = {
    title: string;
    filesize: number;
    expired?: boolean;
}

const VehicleDocumentComponent = ({ title, filesize, expired = false }: VehicleDocumentProps) => {
    return (
        <div className={`d-flex flex-column me-3 mb-1 w-30`}>
            <div className={`border border-secondary rounded p-2 d-flex justify-content-between align-items-center`}>
                <FontAwesomeIcon color='#276EF1B2' size='2x' icon={faFileAlt} />
                <div className={`ms-3 d-flex flex-column`}>
                    <span className={`fw-600 text-09`}>{title}</span>
                    <span className={`fw-500 text-09 color-gray-600`}>{filesize}MB</span>
                </div>
                <FontAwesomeIcon className={`hover link`} size='lg' icon={faCloudDownload} />
            </div>
            <span className={`${expired ? 'error fw-800 text-09' : 'color-white'}`}>{expired ? 'Expired' : 'Not'}</span>

        </div>
    )
}

const DocumentTemplate = () => {
    const [selectedTab, setSelectedTab] = useState<string>('invoices');


    return (
        <div className={`d-flex flex-column`}>
            <div className={`d-flex align-items-start`}>
                <AuthSideMenu />
                <div className={`flex-fill ${styles.borderleft} py-5 mh-90`}>
                    <main className={`d-flex flex-column`}>
                        <div className={`d-flex align-items-center border-bottom px-5`}>
                            <span onClick={() => setSelectedTab('invoices')} className={`link p-3 ${selectedTab === 'invoices' ? 'color-primary fw-800 border-bottom border-3 border-primary' : 'color-gray-500'} `}>Invoices</span>
                            <span onClick={() => setSelectedTab('others')} className={`link p-3 ${selectedTab === 'others' ? 'color-primary fw-800 border-bottom border-3 border-primary' : 'color-gray-500'}`}>Others</span>
                        </div>
                        {/* "invoices" tab */}
                        <section className={`w-100 my-3 ${selectedTab === 'invoices' ? 'd-block' : 'd-none'}`}>
                            <div className={`px-5 d-flex flex-column`}>
                                <span className={`fw-600 mt-3`}>Wed Mar 10, 2022</span>

                                <div className={`mt-3 d-flex flex-wrap align-items-center`}>
                                    <VehicleDocumentComponent title="Jan, 2021 payment slip" filesize={1.84} />
                                    <VehicleDocumentComponent title="Jan, 2021 payment slip" filesize={1.84} />
                                    <VehicleDocumentComponent title="Jan, 2021 payment slip" filesize={1.84} />
                                    <VehicleDocumentComponent title="Jan, 2021 payment slip" filesize={1.84} />
                                    <VehicleDocumentComponent title="Jan, 2021 payment slip" filesize={1.84} />
                                </div>

                            </div>
                            <div className={`mt-3 px-5 d-flex flex-column`}>
                                <span className={`fw-600 mt-3`}>Thu Mar 11, 2022</span>

                                <div className={`mt-3 d-flex flex-wrap align-items-center`}>
                                    <VehicleDocumentComponent title="Jan, 2021 payment slip" filesize={1.84} />
                                    <VehicleDocumentComponent title="Jan, 2021 payment slip" filesize={1.84} />
                                    <VehicleDocumentComponent title="Jan, 2021 payment slip" filesize={1.84} />
                                    <VehicleDocumentComponent title="Jan, 2021 payment slip" filesize={1.84} />
                                    <VehicleDocumentComponent title="Jan, 2021 payment slip" filesize={1.84} />
                                </div>

                            </div>


                        </section>

                        {/* "others" tab */}
                        <section className={`w-100 my-3 ${selectedTab === 'others' ? 'd-block' : 'd-none'}`}>
                            <div className={`px-5 d-flex flex-column`}>
                                <span className={`fw-600 mt-3`}>Wed Mar 10, 2022</span>

                                <div className={`mt-3 d-flex flex-wrap align-items-center`}>
                                    <VehicleDocumentComponent title="Jan, 2021 payment slip" filesize={1.84} />
                                    <VehicleDocumentComponent title="Jan, 2021 payment slip" filesize={1.84} />
                                    <VehicleDocumentComponent title="Jan, 2021 payment slip" filesize={1.84} />
                                    <VehicleDocumentComponent title="Jan, 2021 payment slip" filesize={1.84} />
                                    <VehicleDocumentComponent title="Jan, 2021 payment slip" filesize={1.84} />
                                </div>

                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>

    )
}

export default DocumentTemplate;