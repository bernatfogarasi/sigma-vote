import "@fontsource/montserrat/900.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat";
import "@fontsource/bad-script";

import { AppContext } from "contexts";
import Head from "next/head";
import { useState } from "react";
import * as styled from "styled-components";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";

const GlobalStyle = styled.createGlobalStyle`
  body {
    margin: 0;
    font-family: Montserrat;
  }
`;

const App = ({ Component, pageProps }) => {
  const [message, setMessage] = useState();
  const [messageTimeout, setMessageTimeout] = useState();

  return (
    <>
      <AppContext.Provider
        value={{ message, setMessage, messageTimeout, setMessageTimeout }}
      >
        <GlobalStyle />
        <Head>
          <title>SigmaVote</title>
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AppContext.Provider>
    </>
  );
};

export default App;
