import { ControlButtonType } from "../../../../model/buttonType";
import ControlButton from "../../../elements/ControlButton";
import ControlInput from "../../../elements/ControlInput";
import ControlTextArea from "../../../elements/ControlTextArea";
import styles from './index.module.scss';

const ModalUpdateProduct = () => {
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
                <div className={`d-flex`}>

                </div>
            </div>
        </div>
    )
}

export default ModalUpdateProduct;