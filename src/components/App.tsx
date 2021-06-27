import React from 'react';

import { RouterProvider } from "react-router5";

import Scaffold from "./common/Scaffold";

import { router, routes } from "../pages/Router";

import RouterContainer from './common/RouterContainer';

import { INITIAL_ROUTE } from '../config';

function App() {
  return (
    <RouterProvider router={router}>
      <Scaffold pages={routes}>
        <RouterContainer defaultPage={INITIAL_ROUTE} />
      </Scaffold>
    </RouterProvider>
  );
}

export default App;
