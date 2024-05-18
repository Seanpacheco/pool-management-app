import * as React from 'react';
import {
  Text,
  SimpleGrid,
  UnstyledButton,
  Group,
  FloatingIndicator,
  ThemeIcon,
  rem,
  ActionIcon,
  Box,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPool, IconTrash, IconAt, IconPhoneCall } from '@tabler/icons-react';
import classes from './SiteList.module.css';
import { PageLoadSpinner } from '../../../components/pageLoadSpinner/PageLoadSpinner';

import { useAuth0 } from '@auth0/auth0-react';
import { useSites } from '../api/getSites';
import { useDeleteSite } from '../api/deleteSite';
import { Site } from '../types/index';

interface SiteListProps {
  account_Id: string;
  setSiteSelection: (site_id: string) => void;
  active: string;
  handleSetActive: (site_id: string) => void;
}

export function SiteList({ account_Id, setSiteSelection, active, handleSetActive }: SiteListProps) {
  const auth = useAuth0();
  const { sites, error, isLoading, isSuccess } = useSites(auth, account_Id);
  const [siteData, setSiteData] = React.useState<Site[] | null>([]);

  const deleteSiteMutation = useDeleteSite({}, auth, { account_id: account_Id });

  const openDeleteModal = (site_Id: string) =>
    modals.openConfirmModal({
      title: 'Delete this site?',
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this site? This action is destructive and irreversible.</Text>
      ),
      labels: { confirm: 'Delete site', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () =>
        deleteSiteMutation.mutateAsync({
          site_Id: site_Id,
          auth: auth,
        }),
    });

  React.useEffect(() => {
    if (isSuccess) setSiteData(sites?.data);
  }, [sites?.data, isSuccess]);

  const [rootRef, setRootRef] = React.useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = React.useState<Record<string, HTMLButtonElement | null>>({});
  // const [active, setActive] = React.useState('');

  const setControlRef = (site_Id: string) => (node: HTMLButtonElement) => {
    controlsRefs[site_Id] = node;
    setControlsRefs(controlsRefs);
  };

  const items = siteData?.map((item) => (
    <UnstyledButton
      key={item.site_id}
      className={classes.item}
      ref={setControlRef(item.site_id)}
      onClick={() => {
        handleSetActive(item.site_id);
      }}
      mod={{ active: active === item.site_id }}
    >
      <Group
        onClick={() => {
          setSiteSelection(item.site_id);
        }}
      >
        <ThemeIcon>
          <IconPool style={{ width: rem(24), height: rem(24) }} />
        </ThemeIcon>

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {item.address}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {item.email}
            </Text>
          </Group>
          <Group wrap="nowrap" gap={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {item.phone}
            </Text>
          </Group>
        </div>

        <ActionIcon component="div" variant="subtle" color="red">
          <IconTrash
            onClick={() => {
              openDeleteModal(item.site_id);
            }}
            style={{ width: '75%', height: '75%' }}
            stroke={1.5}
          />
        </ActionIcon>
      </Group>
    </UnstyledButton>
  ));

  if (isLoading) return <PageLoadSpinner />;

  if (isSuccess)
    return (
      <Box className={classes.card} dir="ltr" ref={setRootRef}>
        <Group justify="space-between">
          <Text className={classes.title}>Sites</Text>
        </Group>
        <SimpleGrid cols={1} mt="md">
          <FloatingIndicator target={controlsRefs[active]} parent={rootRef} className={classes.indicator} />
          {items}
        </SimpleGrid>
      </Box>
    );
  if (error) return <Text>Error: {error.message}</Text>;
}
