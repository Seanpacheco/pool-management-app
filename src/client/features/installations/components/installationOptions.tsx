import * as React from 'react';
import { Text, Container, Flex, Fieldset, Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';
import { useDeleteInstallation } from '../api/deleteInstallation';
import { useAuth0 } from '@auth0/auth0-react';

export function InstallationOptions({ installationId, site_id }: { installationId: string | null; site_id: string }) {
  const auth = useAuth0();
  const deleteInstallationMutation = useDeleteInstallation({}, auth, { site_id: site_id });

  const openDeleteModal = (installation_Id: string | null) =>
    modals.openConfirmModal({
      title: 'Delete this installation?',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this installation? This action is destructive and irreversible.
        </Text>
      ),
      labels: { confirm: 'Delete Installation', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () =>
        deleteInstallationMutation.mutateAsync({
          installation_Id: installation_Id,
          auth: auth,
        }),
    });

  return (
    <Container>
      <Fieldset legend="Installation Options">
        <Flex>
          <Button
            rightSection={<IconTrash size={16} />}
            color="red"
            onClick={() => {
              openDeleteModal(installationId);
            }}
          >
            Delete Installation
          </Button>
          {/* <ActionIcon component="div" variant="subtle" color="red"></ActionIcon> */}
        </Flex>
      </Fieldset>
    </Container>
  );
}
