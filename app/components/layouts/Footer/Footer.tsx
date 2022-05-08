import Link from 'next/link'

const Footer = () => {
    return (
        <footer className={`mb-4 w-100 d-flex align-items-center justify-content-center text-center position-absolute bottom-0`}>
            <div className={`w-50 text-09 color-gray-600 fw-500`}>
                StoreDash Manager, StoreDash Driver, StoreDash Retailer are registered products of StoreDash LLC read <Link href="/"><a>Terms & Conditions</a></Link> or contact <Link href="/"><a>StoreDash Support</a></Link> for enquiries
            </div>

        </footer>
    )
}

export default Footer;