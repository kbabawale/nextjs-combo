import Footer from "../../layouts/Footer/Footer";
import Header from "../../layouts/Header/Header";
import { ReactNode } from "react";

type AppProps = {
    children: ReactNode;
}

const AuthLayout = ({ children }: AppProps) => {
    return (
        <div className={`d-flex flex-column`}>
            <Header />
            {children}
            <Footer />

        </div>
    )
}

export default AuthLayout;