import { useRouter } from "next/router";
import { ReactNode } from "react";
import AuthHeader from "../../layouts/AuthHeader/AuthHeader";

type AppProps = {
    children: ReactNode;
}

const DefaultLayout = ({ children }: AppProps) => {
    const { pathname } = useRouter();

    //hide header for some routes
    let showRoute = true;

    let restrictedRoutes: string[] = ['/sitemap'];

    if (restrictedRoutes.includes(pathname)) showRoute = false;

    return (
        <div className={`d-flex flex-column`}>
            {showRoute && <AuthHeader />}
            {children}
        </div>

    )
}

export default DefaultLayout;