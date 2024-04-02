import * as React from 'react';
import { MainLayout } from '../../../client/components/Layout/MainLayout';
import { PageLoadSpinner } from '../../components/pageLoadSpinner/PageLoadSpinner';

export const Callback = () => {
  return (
    <MainLayout>
      <PageLoadSpinner />
    </MainLayout>
  );
};
