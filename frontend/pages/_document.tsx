import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='icon' href='/favicon.ico' />
          <meta
            name='description'
            content='NextRole lets you customize your resume for any role.'
          />
          <meta property='og:site_name' content='nextrole.app' />
          <meta
            property='og:description'
            content='NextRole lets you customize your resume for any role.'
          />
          <meta property='og:title' content='NextRole Resume Customization' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='NextRole Resume Customization' />
          <meta
            name='twitter:description'
            content='NextRole lets you customize your resume for any role.'
          />
          <meta
            property='og:image'
            content='https://placehold.co/600x400'
          />
          <meta
            name='twitter:image'
            content='https://placehold.co/600x400'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
