import Chrono from 'chrono-node';
import Moment from 'moment';
import dateStructFromDate from '../helpers/dateStructFromDate';
import truncateDateStruct from '../helpers/truncateDateStruct';
import chronoDateStructFromMoment from '../helpers/chronoDateStructFromMoment';
import { weekdays } from '../constants';

const parser = new Chrono.Parser();

parser.pattern = () => {
  /* eslint-disable-next-line max-len */
  return new RegExp(`(${Object.keys(weekdays).join('|')}) (last|this|next) ?((?<= )\\d+)? week`, 'i');
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 */
parser.extract = (text, ref, match) => {
  const weekday = match[1].toLowerCase();
  const modifier = match[2];
  let value;
  if (modifier === 'this') {
    value = 0;
  } else if (modifier === 'last') {
    value = parseInt(match[3] || 1) * -1;
  } else {
    value = parseInt(match[3] || 1);
  }

  const refDateStruct = truncateDateStruct(dateStructFromDate(ref), 'day');
  const startMoment = Moment.utc(refDateStruct);
  startMoment.add(value, 'week');
  startMoment.isoWeekday(weekdays[weekday]);

  const endMoment = startMoment.clone();
  endMoment.add(1, 'day');

  return new Chrono.ParsedResult({
    ref,
    text: match[0],
    index: match.index,
    start: chronoDateStructFromMoment(startMoment),
    end: chronoDateStructFromMoment(endMoment),
  });
};

export default parser;
