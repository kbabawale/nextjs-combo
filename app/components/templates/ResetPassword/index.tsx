import Footer from "../../layouts/Footer/Footer";
import Header from "../../layouts/Header/Header";
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../../public/logo/logo.svg';
import Input from "../../elements/Input/Input";
import Button from "../../elements/Button/Button";
import { ButtonType } from "../../../model/buttonType";

const ResetPassword = () => {
    return (
        <div className={`d-flex flex-column`}>
            <Header />
            <main className={`mt-5 d-flex flex-column flex-fill justify-content-center align-items-center text-left`}>
                <Image className="" src={logo} alt="Logo" />
                <span className={`fw-600 text-12`}>Storedash</span>

                <form className={`d-flex flex-column w-30 mx-auto`}>
                    <span className={`mt-5 fw-800 color-black text-15`}>Reset Password</span>
                    <span className={`my-2 fw-400 text-11`}>Enter email to reset your password</span>

                    <Input type="password" placeholder="Enter Password" />
                    <Button textColor="white" label="Send reset link" type={ButtonType.PRIMARY} />

                    <Link href="/"><a className="mt-2">Back to login</a></Link>
                </form>
            </main>
            <Footer />

        </div>
    )
}

export default ResetPassword;