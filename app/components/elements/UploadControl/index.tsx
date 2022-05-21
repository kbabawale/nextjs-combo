
import styles from './index.module.scss';

const UploadControl = () => {
    return (
        <div className={`d-flex flex-column align-items-center px-3 py-4 link hover mb-4 border rounded`}>
            <span className={`text-11 color-gray-400`}>Drop to upload</span>
            <span className={`text-11 color-gray-400`}>Or</span>
            <span className={`text-decoration-underline fw-700 text-11 color-gray-400`}>Browse File</span>
        </div>
    )
}

export default UploadControl;