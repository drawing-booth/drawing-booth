import * as React from 'react';

import createRouter from 'router5';

import FormatPaint from '@material-ui/icons/FormatPaint';
import Settings from '@material-ui/icons/Settings';

import DrawningPage from './DrawningPage';
import SettingsPage from './SettingsPage';

const spacify = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => ` ${letter}`);

const createRoute = (
  component: React.ComponentType,
  icon: React.ComponentType,
  name = component.displayName || 'UnknownPage',
) => {
  const label = spacify(name);
  const path = `/${name}`;
  return {
    name,
    path,
    label,
    icon,
    component,
  };
};

export const routes = [
  createRoute(DrawningPage, FormatPaint, 'DrawningPage'),
  createRoute(SettingsPage, Settings, 'SettingsPage'),
];

export const router = createRouter(routes);

router.start();

