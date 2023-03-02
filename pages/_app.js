import '../styles/globals.css'
import { Amplify } from "aws-amplify";
import config from '../src/aws-exports'

// Amplify.configure({
//   ...config,
//   ssr: true
// });

const amplifyConfig = {
  ssr: true,

  Auth: {
    // identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
    region: 'us-east-1',
    userPoolId: 'us-east-1_jLRIhUCY3',
    userPoolWebClientId: '32ho2n158io7qdbjp3dmrac53s',
  },

  API: {
    endpoints: [
      {
        name: "MyAPI",
        endpoint: 'https://qlcxwlf6f2.execute-api.us-east-1.amazonaws.com/dev',
      },
    ],
  },
};

Amplify.configure(amplifyConfig);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
