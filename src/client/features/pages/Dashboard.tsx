import * as React from 'react';
import { MainLayout } from '../../../client/components/Layout/MainLayout';
import { Affix } from '@mantine/core';
import { LightDarkToggle } from '../LightDarkToggle/LightDarkToggle';

export const Dashboard = () => {
  return (
    <MainLayout>
      <h1>Dashboard</h1>
      <Affix position={{ bottom: 20, right: 20 }}>
        <LightDarkToggle />
      </Affix>
    </MainLayout>
  );
};
