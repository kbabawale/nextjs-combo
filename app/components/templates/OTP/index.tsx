import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/logo/logo.svg';
import OTPInput from '../../elements/OTPInput/OTPInput';

type AppProps = {
  heading: string;
  phoneNumber: string;
};

const OTP = ({ heading, phoneNumber }: AppProps) => {
  return (
    <div className={`d-flex flex-column`}>
      <main
        className={`mt-5 d-flex flex-column flex-fill justify-content-center align-items-center text-left`}
      >
        <Image className="" src={logo} alt="Logo" />
        <span className={`fw-600 text-12`}>Storedash</span>

        <form className={`d-flex flex-column w-30 mx-auto`}>
          <span className={`mt-5 fw-800 color-black text-15`}>{heading}</span>
          <div className="my-2">
            <span
              className={`fw-400 text-11`}
            >{`Enter the 4-digit PIN sent to ${phoneNumber} to authorize login or `}</span>
            <Link href="/" className={`fw-400 text-11 link hover`}>
              <a>resend PIN</a>
            </Link>
          </div>

          <div className="mt-2">
            <OTPInput placeholder="0" />
          </div>

          <span className={`error fw-500`}>Pin Incorrect</span>
        </form>
      </main>
    </div>
  );
};

export default OTP;
