import type { NextPage } from 'next';
import Image from 'next/image';
import logo from '../public/logo/logo.svg';
import Link from 'next/link';
import { memo } from 'react';

const Sitemap: NextPage = memo(() => {
  return (
    <div className={`d-flex flex-column`}>
      <div className={`mt-5 d-flex flex-column mx-auto align-self-center`}>
        <Image className="" src={logo} alt="Logo" />
        <span className={`fw-600 text-12`}>Storedash Sitemap</span>
      </div>
      <div className={`mt-5 p-3 d-flex flex-column mx-auto align-self-center`}>
        <ol>
          <li>
            <Link href="/" className={`fw-400 text-11 link hover`}>
              <a>Index / Login</a>
            </Link>
          </li>
          <li>
            <Link
              href="/auth/reset-password"
              className={`fw-400 text-11 link hover`}
            >
              <a>Reset Password</a>
            </Link>
          </li>
          <li>
            <Link
              href="/auth/set-new-password"
              className={`fw-400 text-11 link hover`}
            >
              <a>Set New Password</a>
            </Link>
          </li>
          <li>
            <Link href="/auth/otp" className={`fw-400 text-11 link hover`}>
              <a>OTP</a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className={`fw-400 text-11 link hover`}>
              <a>Dashboard</a>
            </Link>
          </li>
          <li>
            <Link href="/products" className={`fw-400 text-11 link hover`}>
              <a>Products</a>
            </Link>
          </li>
          <li>
            <Link href="/orders" className={`fw-400 text-11 link hover`}>
              <a>Orders</a>
            </Link>
          </li>
          <li>
            <Link href="/payments" className={`fw-400 text-11 link hover`}>
              <a>Payments</a>
            </Link>
          </li>
          <li>
            <Link href="/staff" className={`fw-400 text-11 link hover`}>
              <a>Staff</a>
            </Link>
          </li>
          <li>
            <Link href="/vehicles" className={`fw-400 text-11 link hover`}>
              <a>Vehicles</a>
            </Link>
          </li>
          <li>
            <Link href="/documents" className={`fw-400 text-11 link hover`}>
              <a>Documents</a>
            </Link>
          </li>
          <li>
            <Link href="/settings" className={`fw-400 text-11 link hover`}>
              <a>Settings</a>
            </Link>
          </li>
        </ol>
      </div>
    </div>
  );
});

export default Sitemap;
