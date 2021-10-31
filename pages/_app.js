import '../styles/globals.css';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { CookiesProvider } from 'react-cookie';
import { Provider as AlertProvider, positions, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { StateMachineProvider, createStore } from 'little-state-machine';
import { AuthProvider } from '../hooks/useAuth';
import { useEffect } from 'react';

const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE,
};

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    createStore({
      educationQualifications: { education: 0 },
      addresses: { address: 0 },
      familyInformation: {},
      extraInformation: {},
      partnerQualities: {},
      contactInformation: {},
      personalInformation: {},
      marriageInformation: {},
    });
  }, []);

  return (
    // <NextAuthProvider session={pageProps.session}>
    <AuthProvider>
      <StateMachineProvider>
        <CookiesProvider>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Component {...pageProps} />
          </AlertProvider>
        </CookiesProvider>
      </StateMachineProvider>
    </AuthProvider>
    // </NextAuthProvider>
  );
}

export default MyApp;
