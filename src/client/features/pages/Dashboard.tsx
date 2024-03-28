import * as React from 'react';
import { MainLayout } from '../../../client/components/Layout/MainLayout';
import { Affix, Container, Grid, SimpleGrid, Skeleton, rem, Paper } from '@mantine/core';
import { LightDarkToggle } from '../lightDarkToggle/LightDarkToggle';
import { AccountList } from '../accounts/accountList/components/AccountList';
import { DataDisplay } from '../dataDisplay/dataDisplay';

const PRIMARY_COL_HEIGHT = rem(500);

export const Dashboard = () => {
  // const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <MainLayout>
      <Container size="xl" my="md">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          {/* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} /> */}
          <Paper shadow="lg" p="xl">
            <AccountList />
          </Paper>
          <Grid gutter="md">
            <Grid.Col>
              {/* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} /> */}
              <Paper shadow="lg" p="xl">
                <DataDisplay />
              </Paper>
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Container>
      <Affix position={{ bottom: 20, right: 20 }}>
        <LightDarkToggle />
      </Affix>
    </MainLayout>
  );
};
