import type { NextPage } from 'next';
import OTP from '../../app/components/templates/OTP';
import { memo } from 'react';

const OTPPage: NextPage = memo(() => {
  return <OTP heading="Two-factor authentication" phoneNumber="090******83" />;
});

export default OTPPage;
