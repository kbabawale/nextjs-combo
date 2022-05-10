import Footer from "../../layouts/Footer/Footer";
import Header from "../../layouts/Header/Header";
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../../public/logo/logo.svg';
import Input from "../../elements/Input/Input";
import Button from "../../elements/Button/Button";
import { ButtonType } from "../../../model/buttonType";
import { PasswordAction } from "../../../model/PasswordAction";

type AppProps = {
    type?: PasswordAction;
    buttonText: string;
    heading: string;
    subHeading: string;
}

const Password = ({ buttonText, heading, subHeading, type = PasswordAction.RESETPASSWORD }: AppProps) => {
    return (
        <div className={`d-flex flex-column`}>
            <Header />
            <main className={`mt-5 d-flex flex-column flex-fill justify-content-center align-items-center text-left`}>
                <Image className="" src={logo} alt="Logo" />
                <span className={`fw-600 text-12`}>Storedash</span>

                <form className={`d-flex flex-column w-30 mx-auto`}>
                    <span className={`mt-5 fw-800 color-black text-15`}>{heading}</span>
                    <span className={`my-2 fw-400 text-11`}>{subHeading}</span>

                    <Input type="password" placeholder="Enter password" />
                    {type === PasswordAction.SETNEWPASSWORD && <Input type="password" placeholder="Re-enter password" />}
                    <Button textColor="white" label={buttonText} type={ButtonType.PRIMARY} />

                    {type === PasswordAction.RESETPASSWORD && <Link href="/"><a className="mt-2">Back to login</a></Link>}
                </form>
            </main>
            <Footer />

        </div>
    )
}

export default Password;