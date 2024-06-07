import * as React from 'react';
import { Flex, Combobox, useCombobox, Input, InputBase } from '@mantine/core';
import { useChemLogs } from '../api/getChemLog';
import { useAuth0 } from '@auth0/auth0-react';
import dayjs from 'dayjs';
import { DatePickerInput } from '@mantine/dates';
import { ChemLog } from '../types';
import { ChemLogDataCard } from './chemLogDataCard';

export const ChemLogDataDisplay = ({ selectedInstallationId }: { selectedInstallationId: string | null }) => {
  const auth = useAuth0();
  const [chemLogData, setChemLogData] = React.useState<ChemLog[]>([]);
  const [value, setValue] = React.useState<string | null>(null);
  const [selectedChemLogDateString, setSelectedChemLogDateString] = React.useState<string | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [date, setDate] = React.useState<[Date, Date]>([
    dayjs(new Date()).subtract(7, 'day').toDate(),
    dayjs(new Date()).toDate(),
  ]);
  const { chemLogs, error, isLoading, isSuccess } = useChemLogs(auth, selectedInstallationId, date);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      if (eventSource === 'keyboard') {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex('active');
      }
    },
  });

  React.useEffect(() => {
    if (isSuccess) setChemLogData([chemLogs?.data]);
    setValue(null);
    setSelectedChemLogDateString(null);
    setSelectedDate(null);
    // setDate([dayjs(new Date()).subtract(7, 'day').toDate(), dayjs(new Date()).toDate()]);
    console.log(chemLogs?.data);
  }, [chemLogs?.data, isSuccess]);

  const options = chemLogs?.data.map((item: ChemLog) => (
    <Combobox.Option
      key={item.log_id}
      value={item.log_id}
      active={item.log_id === value}
      onClick={() => {
        setSelectedChemLogDateString(item.log_date.toString());
        setSelectedDate(dayjs(item.log_date).toDate());
      }}
    >
      {dayjs(item.log_date).isValid() ? dayjs(item.log_date).format('MM/DD/YYYY') : 'Chem Logs'}
    </Combobox.Option>
  ));
  return (
    <>
      <Flex align="flex-start" direction="column" gap="md">
        <DatePickerInput type="range" label="Date Range" placeholder="Date Range" value={date} onChange={setDate} />
        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            setValue(val);
            setSelectedChemLogDateString(val);
            combobox.updateSelectedOptionIndex('active');
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              component="button"
              type="button"
              pointer
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents="none"
              onClick={() => combobox.toggleDropdown()}
            >
              {dayjs(selectedChemLogDateString).isValid() ? (
                dayjs(selectedChemLogDateString).format('MM/DD/YYYY')
              ) : (
                <Input.Placeholder>Chem Logs</Input.Placeholder>
              )}
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>{options}</Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
        <ChemLogDataCard
          chemLogData={chemLogs?.data}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setValue={setValue}
          selectedInstallationId={selectedInstallationId}
        />
      </Flex>
    </>
  );
};
