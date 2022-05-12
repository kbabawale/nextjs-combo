import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
    return = (): JSX.Element => (
        <Html>
            <Head>
                <link rel="shortcut icon" href="/logo/logo.png" />
            </Head>
            <body>
                <Main />
                <NextScript />

            </body>
        </Html>
    );
}

export default CustomDocument;