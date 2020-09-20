import '../styles/globals.css';
import React, { ComponentType, FC, useReducer } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloClient';
import reducer from '../reducer/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme';
import 'fontsource-roboto';
import { initialState } from '../reducer/app'
import { SnackbarComponent } from '../components/SnackBar';

interface MyAppProps {
    Component: ComponentType;
    pageProps: any;
}


export const MyApp: FC<MyAppProps> = ({ Component, pageProps }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SnackbarComponent dispatch={dispatch} notifications={state.notifications} />
                <Component {...pageProps} state={state} dispatch={dispatch} />
            </ThemeProvider>
        </ApolloProvider>
    );
};

export default MyApp;
