import React from 'react';
import ReactDOM from 'react-dom';

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { Provider } from "mobx-react";

import ErrorBoundary from './components/common/ErrorBoundary';

import App from './components/App';
import ErrorReporter from './components/ErrorReporter';

import DrawningStore from './store/DrawningStore';

const THEME_DARK = createMuiTheme({
  palette: {
      type: 'dark',
      primary: {
          main: '#f48fb1',
      },
      secondary: {
          main: '#90cbf9',
      },
      text: {
          primary: "#fff",
          secondary: "rgba(255, 255, 255, 0.7)",
          disabled: "rgba(255, 255, 255, 0.5)",
          hint: "rgba(255, 255, 255, 0.5)",
      },
      background: {
          paper: "#424242",
          default: "#212121",
      },
  },
});

const MAX_SNACK = 15;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const THEME_LIGHT = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#1976d2",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
    background: {
      default: "#fff",
      paper: "#f5f5f5",
    },
  },
});

const drawningStore = new DrawningStore();

ReactDOM.render(
  <ErrorBoundary ErrorPlaceholder={<ErrorReporter />}>
    <MuiThemeProvider theme={THEME_DARK}>
      <SnackbarProvider maxSnack={MAX_SNACK}>
        <Provider {...{ drawningStore }}>
          <App />
        </Provider>
      </SnackbarProvider>
    </MuiThemeProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);
