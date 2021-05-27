import '../styles/globals.css';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { CookiesProvider } from 'react-cookie';
import { Provider as AlertProvider, positions, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { StateMachineProvider, createStore } from 'little-state-machine';

const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE,
};

createStore({
  basicInfo: {},
});

function MyApp({ Component, pageProps }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <StateMachineProvider>
        <CookiesProvider>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Component {...pageProps} />
          </AlertProvider>
        </CookiesProvider>
      </StateMachineProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
