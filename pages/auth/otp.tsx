import type { NextPage } from 'next'
import OTP from '../../app/components/templates/OTP'

const OTPPage: NextPage = () => {
    return (
        <OTP heading='Two-factor authentication' phoneNumber='090******83' />
    )
}

export default OTPPage
