import * as React from 'react';
import { Text, SimpleGrid, UnstyledButton, Group, FloatingIndicator, ThemeIcon, rem } from '@mantine/core';
import { IconPool, IconChevronRight, IconAt, IconPhoneCall } from '@tabler/icons-react';
import classes from './SiteList.module.css';

const mockdata = [
  { address: '123 Main St.', email: 'mainst@gmail.com', phone: '123-456-7890' },
  { address: '456 Horn St.', email: 'hornst@gmail.com', phone: '123-456-7890' },
];

export function SiteList() {
  const [rootRef, setRootRef] = React.useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = React.useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = React.useState(0);

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const items = mockdata.map((item, index) => (
    <UnstyledButton
      key={item.address}
      className={classes.item}
      ref={setControlRef(index)}
      onClick={() => setActive(index)}
      mod={{ active: active === index }}
    >
      <Group>
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

        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  ));

  return (
    <div className={classes.card} dir="ltr" ref={setRootRef}>
      <FloatingIndicator target={controlsRefs[active]} parent={rootRef} className={classes.indicator} />
      <Group justify="space-between">
        <Text className={classes.title}>Sites</Text>
      </Group>
      <SimpleGrid cols={1} mt="md">
        {items}
      </SimpleGrid>
    </div>
  );
}
