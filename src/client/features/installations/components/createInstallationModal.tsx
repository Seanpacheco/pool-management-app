import * as React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, ActionIcon, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { CreateInstallationForm } from './createInstallationForm';

export const CreateInstallationModal = ({ selectedSiteId }: { selectedSiteId: string }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={true} title="Add Installation" size="lg" centered>
        <CreateInstallationForm selectedSiteId={selectedSiteId} />
      </Modal>

      <Tooltip label="Add Installation" position="top" withArrow>
        <ActionIcon
          variant="gradient"
          size="lg"
          aria-label="Gradient action icon"
          gradient={{ from: 'seaGreen.4', to: 'seaGreen.8', deg: 90 }}
          onClick={open}
        >
          <IconPlus />
        </ActionIcon>
      </Tooltip>
    </>
  );
};
