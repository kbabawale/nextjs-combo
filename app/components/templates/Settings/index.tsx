import AuthSideMenu from '../../layouts/AuthSideMenu/AuthSideMenu';
import styles from './index.module.scss';
import { useState } from 'react';
import { faFileAlt, faCloudDownload, faPaperPlane, faArrowUpRightFromSquare, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ControlInput from '../../elements/ControlInput';
import ControlTextArea from '../../elements/ControlTextArea';
import Button from '../../elements/Button/Button';
import ControlButton from '../../elements/ControlButton';
import { ControlButtonType } from '../../../model/buttonType';
import Alert from '../../elements/Alert/Alert';
import { AlertType } from '../../../model/AlertType';
import { ModalPosition, ModalType } from '../../../model/Modal';
import Modal from '../../elements/Modal';
import { UtilFunction } from '../../../util/functions';



const Settings = () => {
    const [selectedTab, setSelectedTab] = useState<string>('settings');
    const [showAlert, setShowAlert] = useState<boolean>(true);
    const [currentModalType, setCurrentModalType] = useState<ModalType>(ModalType.SETTINGSCHANGENAME);

    let [isOpen, setIsOpen] = useState(false);
    let [modalPosition, setModalPosition] = useState(ModalPosition.CENTER);

    const toggleModal = (options?: any) => {
        setIsOpen(!isOpen);
    }

    const switchModalType = (type: ModalType) => {
        setCurrentModalType(type);
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
                            <span onClick={() => setSelectedTab('settings')} className={`link p-3 ${selectedTab === 'settings' ? 'color-primary fw-800 border-bottom border-3 border-primary' : 'color-gray-500'} `}>Settings</span>
                        </div>
                        {/* "settings" tab */}
                        <section className={`w-100 my-3 ${selectedTab === 'settings' ? 'd-block' : 'd-none'}`}>
                            <Modal type={currentModalType} hideModal={() => { toggleModal() }} position={modalPosition} onRequestClose={onRequestCloseFn} onAfterClose={afterCloseModal} afterOpenModal={afterOpenModal} modalIsOpen={isOpen} />
                            <div className={`px-5`}>
                                {showAlert && <Alert dismiss={() => setShowAlert(false)} title='Pending changes' label='Recent changes to your business profile is currently being reviewed, we’ll update you soon.' type={AlertType.INFO} />}
                            </div>

                            <div className={`w-60 mx-auto p-3 d-flex flex-column`}>

                                <div className={`d-flex align-items-center`}>
                                    <div className={`align-self-start mt-3 me-5 d-flex flex-column`}>
                                        <div className={`${styles.profile}`}></div>
                                        <span className={`color-safety-blue hover link`}>Change picture</span>
                                    </div>
                                    <div className={`flex-fill ms-5 d-flex flex-column`}>
                                        <div className={`d-flex flex-column`}>
                                            <span className={`color-gray-500`}>Full Name</span>
                                            <span className={`text-11 color-black`}>Emeka Adewale</span>
                                            <span onClick={() => { switchModalType(ModalType.SETTINGSCHANGENAME); toggleModal() }} className={`color-safety-blue hover link`}>Update</span>
                                        </div>

                                        <div className={`mt-4 d-flex flex-column`}>
                                            <span className={`color-gray-500`}>Workmail</span>
                                            <span className={`text-11 color-black`}>emekaadewale@company.com</span>
                                            <span onClick={() => { switchModalType(ModalType.SETTINGSCHANGEEMAIL); toggleModal() }} className={`color-safety-blue hover link`}>Update</span>
                                        </div>

                                        <div className={`mt-4 d-flex flex-column`}>
                                            <span className={`color-gray-500`}>Password</span>
                                            <span onClick={() => { switchModalType(ModalType.SETTINGSCHANGEPASSWORD); toggleModal() }} className={`color-safety-blue hover link`}>Change Password</span>
                                        </div>

                                        <div className={`mt-2 d-flex flex-column`}>
                                            <span onClick={() => { switchModalType(ModalType.SETTINGSCHANGE2FA); toggleModal() }} className={`color-safety-blue hover link`}>Enable two-factor authentication</span>
                                        </div>
                                    </div>
                                </div>


                                <hr className="" />

                                <div className={`d-flex align-items-center`}>
                                    <div className={`invisible align-self-start mt-3 me-5 d-flex flex-column`}>
                                        <div className={`${styles.profile}`}></div>
                                        <span className={`color-safety-blue hover link`}>Change picture</span>
                                    </div>
                                    <div className={`flex-fill ms-5 d-flex flex-column`}>
                                        <div className={`d-flex flex-column`}>
                                            <span className={`color-gray-500`}>Email notifications</span>
                                            <div className={`d-flex align-items-center`}>
                                                <span className={`text-11 color-black`}>Sent to</span>
                                                <span className={`ms-2 px-2 bg-chipAccent color-gray-700`}>emekaadewale@company.com</span>
                                            </div>
                                            <div className={`mt-2 d-flex align-items-center`}>
                                                <input type="checkbox" />
                                                <span className={`ms-2 color-safety-blue`}>Enable email notifications</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <hr className="" />

                                <div className={`d-flex align-items-center`}>
                                    <div className={`invisible align-self-start mt-3 me-5 d-flex flex-column`}>
                                        <div className={`${styles.profile}`}></div>
                                        <span className={`color-safety-blue hover link`}>Change picture</span>
                                    </div>
                                    <div className={`flex-fill ms-5 d-flex flex-column`}>
                                        <div className={`d-flex flex-column`}>
                                            <span className={`color-gray-500`}>Inventory management</span>
                                            <div className={`d-flex align-items-center`}>
                                                <span className={`text-11 color-black`}>Set low quantity</span>
                                                <span className={`ms-2`}><ControlInput placeholder='5' /></span>
                                            </div>
                                            <div className={`mt-2 d-flex align-items-center`}>
                                                <input type="checkbox" />
                                                <span className={`ms-2 color-safety-blue`}>Enable inventory notifications</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <div className={`d-flex align-items-center`}>
                                    <div className={`invisible align-self-start mt-3 me-5 d-flex flex-column`}>
                                        <div className={`${styles.profile}`}></div>
                                        <span className={`color-safety-blue hover link`}>Change picture</span>
                                    </div>
                                    <div className={`flex-fill ms-5 d-flex flex-column`}>
                                        <div className={`d-flex flex-column`}>
                                            <span className={`color-gray-500`}>Feedback and Suggestions</span>
                                            <ControlTextArea placeholder='Tell us how you’re using StoreDash and what you’d like to see. ' />
                                            <div className={`mt-2 d-flex align-items-center`}>
                                                <input type="checkbox" />
                                                <span className={`ms-2 color-safety-blue`}>Send feedback anonymously</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className={`d-flex align-items-center`}>
                                    <div className={`invisible align-self-start mt-3 me-5 d-flex flex-column`}>
                                        <div className={`${styles.profile}`}></div>
                                        <span className={`color-safety-blue hover link`}>Change picture</span>
                                    </div>
                                    <div className={`flex-fill ms-5 d-flex flex-column`}>
                                        <div className={`d-flex flex-column`}>
                                            <div className={`d-flex align-items-center`}>
                                                <ControlButton textColor='white' type={ControlButtonType.PRIMARY} label='Send' icon={faPaperPlane} />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <div className={`d-flex align-items-center`}>
                                    <div className={`invisible align-self-start mt-3 me-5 d-flex flex-column`}>
                                        <div className={`${styles.profile}`}></div>
                                        <span className={`color-safety-blue hover link`}>Change picture</span>
                                    </div>
                                    <div className={`flex-fill ms-5 d-flex flex-column`}>
                                        <div className={`d-flex flex-column`}>
                                            <span className={`color-gray-500`}>Account</span>
                                            <div className={`d-flex align-items-center`}>
                                                <span className={`color-safety-blue hover link`}>Request Help</span>
                                                <FontAwesomeIcon className='ms-2' color='#276EF1' icon={faArrowUpRightFromSquare} />
                                            </div>
                                            <div className={`mt-3 d-flex align-items-center`}>
                                                <span onClick={() => { UtilFunction.navigate('/') }} className={`error hover link`}>Sign out of all devices</span>
                                                <FontAwesomeIcon className='ms-2' color='#E62121' icon={faArrowRightFromBracket} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </section>


                    </main>
                </div>
            </div>
        </div>

    )
}

export default Settings;