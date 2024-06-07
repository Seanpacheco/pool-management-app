import * as React from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import { UnstyledButton, Text, Paper, Group, rem, ActionIcon, Flex } from '@mantine/core';
import { modals } from '@mantine/modals';
import { Carousel } from '@mantine/carousel';
import { IconSwimming, IconBike, IconTrash, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import classes from './chemLogDataCard.module.css';
import { ChemLog } from '../types';
import { useDeleteChemLog } from '../api/deleteChemLog';
import { useAuth0 } from '@auth0/auth0-react';

interface ChemLogDataCardProps {
  chemLogData: ChemLog[];
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  setValue: (value: string | null) => void;
}

export function ChemLogDataCard({ chemLogData, selectedDate, setSelectedDate, setValue }: ChemLogDataCardProps) {
  const auth = useAuth0();
  const [date, setDate] = useState<Date | null>(selectedDate);
  const deleteChemLogMutation = useDeleteChemLog({}, auth, { log_id: '' });

  const openDeleteModal = (log_Id: string) =>
    modals.openConfirmModal({
      title: 'Delete this chem log?',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this chem log? This action is destructive and irreversible.
        </Text>
      ),
      labels: { confirm: 'Delete Chem Log', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () =>
        deleteChemLogMutation.mutateAsync({
          log_Id: log_Id,
          auth: auth,
        }),
    });

  let sortedDatesData: ChemLog[] = [];
  if (chemLogData) {
    sortedDatesData = [...chemLogData];
    for (let i = 0; i < sortedDatesData.length; i++) {
      for (let j = 0; j < sortedDatesData.length - i - 1; j++) {
        if (new Date(sortedDatesData[j].log_date).getTime() > new Date(sortedDatesData[j + 1].log_date).getTime()) {
          const temp = sortedDatesData[j];
          sortedDatesData[j] = sortedDatesData[j + 1];
          sortedDatesData[j + 1] = temp;
        }
      }
    }
  }

  const handleUpClick = () => {
    const nextDate = sortedDatesData.find((stat) =>
      dayjs(stat.log_date.toLocaleString()).isAfter(selectedDate, 'second'),
    );
    if (nextDate) {
      setDate(dayjs(nextDate.log_date).toDate());
      setSelectedDate(dayjs(nextDate.log_date).toDate());
    }
  };

  const handleDownClick = () => {
    const previousDate = sortedDatesData
      .reverse()
      .find((stat) => dayjs(stat.log_date).isBefore(selectedDate, 'second'));
    if (previousDate) {
      setDate(dayjs(previousDate.log_date).toDate());
      setSelectedDate(dayjs(previousDate.log_date).toDate());
    }
  };

  let filteredData: ChemLog[] = [];
  if (chemLogData) {
    filteredData = chemLogData.filter((stat) => dayjs(stat.log_date).isSame(selectedDate, 'second'));
  }

  const stats = filteredData.map((stat) => (
    <Carousel.Slide key={stat.log_id}>
      <Flex gap="xl" direction="column">
        <Group style={{ flex: 1 }}>
          <Paper className={classes.stat} radius="md" shadow="md" p="xs">
            <Text className={classes.icon}>{stat.sanitizer_level} ppm</Text>
            <div>
              <Text className={classes.value}>
                {stat.sanitizer_type.charAt(0).toUpperCase() + stat.sanitizer_type.slice(1)} &#128993;
              </Text>
            </div>
          </Paper>
          <Paper className={classes.stat} radius="md" shadow="md" p="xs">
            <Text className={classes.icon}>{stat.ph_level} ppm</Text>
            <div>
              <Text className={classes.value}>PH &#128308;</Text>
            </div>
          </Paper>
          <Paper className={classes.stat} radius="md" shadow="md" p="xs">
            <Text className={classes.icon}>{stat.alkalinity_level ? 'n/a' : stat.alkalinity_level} ppm</Text>
            <div>
              <Text className={classes.value}>Alkalinity &#128994;</Text>
            </div>
          </Paper>
          <Paper className={classes.stat} radius="md" shadow="md" p="xs">
            <Text className={classes.icon}>{stat.calcium_level ? 'n/a' : stat.calcium_level} ppm</Text>
            <div>
              <Text className={classes.value}>Calcium &#128309;</Text>
            </div>
          </Paper>
          <Paper className={classes.stat} radius="md" shadow="md" p="xs">
            <Text className={classes.icon}>
              {stat.total_dissolved_solids_level ? 'n/a' : stat.total_dissolved_solids_level} ppm
            </Text>
            <div>
              <Text className={classes.value}>Total Dissolved Solids</Text>
            </div>
          </Paper>
          <Paper className={classes.stat} radius="md" shadow="md" p="xs">
            <Text className={classes.icon}>{stat.cynauric_acid_level ? 'n/a' : stat.cynauric_acid_level} ppm</Text>
            <div>
              <Text className={classes.value}>Cyanauric Acid</Text>
            </div>
          </Paper>
        </Group>
        <Flex gap="md" justify="flex-end" align="flex-end">
          <Text>Created at: {dayjs(stat.created_at).format('MM/DD/YYYY HH:mm')}</Text>
          <ActionIcon component="div" variant="subtle" color="red">
            <IconTrash
              onClick={() => {
                openDeleteModal(stat.log_id);
              }}
              style={{ width: '75%', height: '75%' }}
              stroke={1.5}
            />
          </ActionIcon>
        </Flex>
      </Flex>
    </Carousel.Slide>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <UnstyledButton className={classes.control} onClick={handleUpClick}>
          <IconChevronUp style={{ width: rem(16), height: rem(16) }} className={classes.controlIcon} stroke={1.5} />
        </UnstyledButton>

        <div className={classes.date}>
          {selectedDate ? (
            <>
              <Text className={classes.day}>{dayjs(selectedDate).format('DD')}</Text>
              <Text className={classes.month}>{dayjs(selectedDate).format('MMMM')}</Text>
              <Text className={classes.month}>{dayjs(selectedDate).format('YYYY')}</Text>
            </>
          ) : (
            <Text className={classes.year}>n/a</Text>
          )}
        </div>

        <UnstyledButton className={classes.control} onClick={handleDownClick}>
          <IconChevronDown style={{ width: rem(16), height: rem(16) }} className={classes.controlIcon} stroke={1.5} />
        </UnstyledButton>
      </div>
      <Carousel
        classNames={{ control: classes.carouselControl, indicators: classes.carouselIndicators }}
        withIndicators
        onSlideChange={(newIndex) => {
          if (filteredData[newIndex]) {
            setValue(filteredData[newIndex].log_id);
          }
        }}
      >
        {stats}
      </Carousel>
    </div>
  );
}
