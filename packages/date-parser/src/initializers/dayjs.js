import dayjs from 'dayjs';
import en from 'dayjs/locale/en';
import utcPlugin from 'dayjs/plugin/utc';
import weekdayPlugin from 'dayjs/plugin/weekday';

// https://github.com/iamkun/dayjs/issues/215#issuecomment-471280396
// note that this makes weekday(0) -> monday
dayjs.locale({
  ...en,
  weekStart: 1,
});
dayjs.extend(weekdayPlugin);
dayjs.extend(utcPlugin);
