import type { NextPage } from 'next';
import Password from '../../app/components/templates/ResetPassword';
import { memo } from 'react';

const ResetPasswordPage: NextPage = memo(() => {
  return (
    <Password
      heading="Reset Password"
      subHeading="Enter email to reset your password"
      buttonText="Send reset link"
    />
  );
});

export default ResetPasswordPage;
