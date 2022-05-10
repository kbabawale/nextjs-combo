import type { NextPage } from 'next'
import Password from '../app/components/templates/ResetPassword';
import { PasswordAction } from '../app/model/PasswordAction';

const SetNewPasswordPage: NextPage = () => {
    return (

        <Password type={PasswordAction.SETNEWPASSWORD} heading='Set up new password' subHeading='Create a new password for your account' buttonText='Save' />

    )
}

export default SetNewPasswordPage
