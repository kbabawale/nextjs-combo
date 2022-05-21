import { ControlButtonType } from "../../../../model/buttonType";
import ControlButton from "../../../elements/ControlButton";
import ControlDate from "../../../elements/ControlDate";
import ControlInput from "../../../elements/ControlInput";
import ControlSelect, { ControlSelectType } from "../../../elements/ControlSelect";
import ControlTextArea from "../../../elements/ControlTextArea";
import UploadControl from "../../../elements/UploadControl";
import styles from './index.module.scss';

const ModalUpdateProduct = () => {
    let dropdownOptions: ControlSelectType = {
        options: [
            {
                label: 'Baby Care',
                value: 0,
                default: true
            }
        ]
    }

    return (
        <div className={`d-flex flex-column px-3 ${styles.overflow}`}>
            <div className={`mt-3 d-flex align-items-center justify-content-between`}>
                <span className={`fw-700 text-15`}>Update Product</span>
                <ControlButton disabled={true} label="Save changes" type={ControlButtonType.PRIMARY} />
            </div>
            <div className={`mt-5 d-flex flex-column`}>
                <span className={`fw-400 text-11`}>Product name</span>
                <ControlInput placeholder="Enter name" wide={true} />
            </div>
            <div className={`mt-5 d-flex flex-column`}>
                <span className={`fw-400 text-11`}>Description</span>
                <ControlTextArea placeholder="Enter description" wide={true} />
            </div>
            <div className={`mt-5 d-flex flex-column`}>
                <span className={`fw-400 text-11`}>SKU</span>
                <ControlInput placeholder="Enter your SKU number" wide={true} />
            </div>
            <div className={`mt-5 d-flex flex-column`}>
                <span className={`fw-400 text-11`}>Photos (Add up to 8 photos)</span>
                <div className={`mt-3 d-flex justify-content-between align-items-center flex-wrap`}>
                    <UploadControl />
                    <UploadControl />
                    <UploadControl />
                    <UploadControl />
                    <div className="w-100"></div>
                    <UploadControl />
                    <UploadControl />
                    <UploadControl />
                    <UploadControl />
                </div>
            </div>

            <hr />

            <div className={`mt-5 d-flex flex-column`}>
                <span className={`fw-400 text-11`}>Categories</span>
                <ControlSelect options={dropdownOptions.options} wide={true} />
            </div>

            <div className={`mt-3 d-flex justify-content-between align-items-center`}>
                <span className={`fw-600 text-12`}>Price</span>
                <div>
                    <span className="me-2">₦</span><ControlInput />
                </div>
            </div>

            <div className={`mt-3 d-flex justify-content-between align-items-center`}>
                <span className={`fw-600 text-12`}>VAT</span>
                <div>
                    <ControlInput /><span className="ms-2">%</span>
                </div>
            </div>

            <div className={`mt-5 d-flex flex-column`}>
                <span className={`fw-700 text-15`}>Promotions</span>
                <div className={`mt-2 d-flex  align-items-center`}>
                    <input type="checkbox" />
                    <span className={`ms-3 fw-400 text-11`}>Enable promotions to give customers special deals on your product </span>
                </div>
                <div className={`mt-3 d-flex justify-content-between align-items-center`}>
                    <span className={`fw-600 text-12`}>Promo Price</span>
                    <div>
                        <span className="me-2">₦</span><ControlInput />
                    </div>
                </div>
                <div className={`mt-3 d-flex justify-content-between align-items-center`}>
                    <span className={`fw-600 text-12`}>Promo Runtime</span>
                    <div className={`d-flex align-items-center`}>
                        <div className="me-2"><ControlDate /></div>
                        <div className=""><ControlDate /></div>
                    </div>
                </div>
            </div>

            <div className={`${styles.dangerBG} mb-5 p-2 mt-5 d-flex  align-items-center`}>
                <input type="checkbox" />
                <div className="ms-3">
                    <span className="fw-800">Unpublish:</span>
                    <span className="ms-2">Mark Product as out of stock to send to unpublished list </span>
                </div>
            </div>
        </div>
    )
}

export default ModalUpdateProduct;