import Router from 'next/router';


export class UtilFunction {
    static navigate = (location: string) => {
        Router.push(location);
    }

}