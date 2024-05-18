import * as React from 'react';
import { MainLayout } from '../../../client/components/Layout/MainLayout';
import { Affix, Container, Grid, SimpleGrid, rem, Paper } from '@mantine/core';
import { LightDarkToggle } from '../lightDarkToggle/LightDarkToggle';
import { AccountList } from '../accounts/components/AccountList';
import { DataDisplay } from '../dataDisplay/dataDisplay';
import { useInstallations } from '../installations/api/getInstallations';
import { useAuth0 } from '@auth0/auth0-react';
import { Installation } from '../installations/types';

const PRIMARY_COL_HEIGHT = rem(500);

export const Dashboard = () => {
  // const auth = useAuth0();
  // const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
  const [selectedSiteId, setSelectedSiteId] = React.useState<string>('');
  // const { installations, error, isLoading, isSuccess } = useInstallations(auth, selectedSiteId);
  // const [installationData, setInstallationData] = React.useState<Installation[]>([]);

  // React.useEffect(() => {
  //   if (isSuccess) setInstallationData([installations?.data]);
  //   console.log(installations?.data);
  // }, [installations?.data, isSuccess]);

  function handleSiteSelection(site_id: string) {
    console.log('site ID:', site_id);
    setSelectedSiteId(site_id);
    console.log(selectedSiteId);
  }

  return (
    <MainLayout>
      <Container size="xl" my="md">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          {/* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} /> */}
          <Paper shadow="lg" p="xl">
            <AccountList setSiteSelection={setSelectedSiteId} />
          </Paper>
          <Grid gutter="md">
            <Grid.Col>
              {/* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} /> */}
              <Paper shadow="lg" p="xl">
                <DataDisplay selectedSiteId={selectedSiteId} />
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
