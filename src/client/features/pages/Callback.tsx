import * as React from 'react';
import { MainLayout } from '../../../client/components/Layout/MainLayout';
import { Loader, Center } from '@mantine/core';

export const Callback = () => {
  return (
    <MainLayout>
      <Center>
        <Loader size={'xl'} />
      </Center>
    </MainLayout>
  );
};
