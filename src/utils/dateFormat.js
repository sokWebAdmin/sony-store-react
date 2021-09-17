import moment, { Moment, MomentInput, unitOfTime } from 'moment'; // eslint-disable-line

export const getUnitDigitStr = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
};

export function changeDateFormat(time, format) {
  if (typeof time === 'string' && time === '') {
    return moment().language('ko').format(format);
  }
  return moment(time).format(format);
}

export function getStrDate(date, format = 'YYYY-MM-DD') {
  return moment(date).format(format);
}
export function getStrHms(date) {
  return moment(date).format('HH:mm:ss');
}
export function getToday(format = 'YYYY-MM-DD') {
  return getStrDate(new Date(), format);
}

export function getDownToday() {
  return moment(new Date()).format('YYYYMMDD_HHmmss');
}

export function getBeforeDate(firstDay) {
  let beforeDay = new Date().getDate() - 1;
  if (firstDay && beforeDay < firstDay) {
    beforeDay = firstDay;
  }
  const beforeDate = new Date().setDate(beforeDay);

  return getStrDate(moment(beforeDate).toDate());
}

export function firstDayOfMonth() {
  const firstDate = new Date().setDate(1);

  return getStrDate(moment(firstDate).toDate());
}

export function getFirstAndEndDay(year = moment().year(), month = moment().month() + 1) {
  const startYmd = getStrDate(new Date(year, month - 1, 1));
  const endYmd = getStrDate(new Date(year, month, 0));
  return { startYmd, endYmd };
}

export function getStrYMDHMSS(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

export function getStrYMDHM(date) {
  return moment(date).format('YYYY-MM-DD HH:mm');
}

export function getStrHM(date) {
  return moment(date).format('HH:mm');
}

export function addDay(date, days) {
  return moment(date).add(days, 'days').format('YYYY-MM-DD');
}

export function addMonth(date, months) {
  return moment(date).add(months, 'months').format('YYYY-MM-DD');
}

export function getDay(date) {
  const week = ['일', '월', '화', '수', '목', '금', '토', '일'];
  return week[moment(date).day()];
}

export function getSelectYears(endWord, isPast = true, length = 3) {
  const year = new Date().getFullYear();
  const result = [];
  if (isPast) {
    for (let i = length; i >= 0; i--) {
      const selectYear = { value: year - i, name: `${year - i}${endWord}` };
      result.push(selectYear);
    }
  } else {
    for (let i = 0; i <= length; i++) {
      const selectYear = { value: year + i, name: `${year + i}${endWord}` };
      result.push(selectYear);
    }
  }
  return result;
}

export function getSelectMonths(endWord, start = 1, end = 12) {
  const result = [];
  for (let i = start; i <= end; i++) {
    const selectMonth = { value: i, name: `${i}${endWord}` };
    result.push(selectMonth);
  }
  return result;
}

export function getSelectDays(endWord, selectMonth) {
  const result = [];
  const oddMonth = [1, 3, 5, 7, 8, 10, 12];
  const evenMonth = [4, 6, 9, 11];
  let days = 31;
  if (oddMonth.includes(selectMonth)) {
    days = 31;
  } else if (evenMonth.includes(selectMonth)) {
    days = 30;
  } else {
    days = 29;
  }
  for (let i = 1; i <= days; i++) {
    const selectDay = { value: i, name: `${i}${endWord}` };
    result.push(selectDay);
  }
  return result;
}

/**
 * 생년월일 년도 금년 기준으로 120년 이전까지
 * */
export function getSelectBirthDayYears(endWord) {
  const year = new Date().getFullYear();
  const result = [];
  for (let i = 0; i <= 120; i++) {
    const selectYear = { value: year - i, name: `${year - i}${endWord}` };
    result.push(selectYear);
  }
  return result;
}

/**
 * Mutates the original moment by adding time.
 * https://momentjs.com/docs/#/manipulating/add/
 * @author AZu
 * @param date string
 * @param addDays []
 * @param format string
 */
export function momentAdd(date, addDays, format) {
  return moment(date)
    .add(...addDays)
    .format(format);
}

// 남은 시간 : 03:23
export function drawRemainingDurationTime(remaining) {
  return moment.utc(remaining).format('mm:ss');
}

/**
 * 비교 대상 날짜가 n년 전에 속하는지 아닌지를 판별하는 함수
 * @param comparisonTarget 오늘 날짜와 비교할 대상 날짜 ex) moment()
 * @param periodYear 기준 년도 default: 3
 */
export function overPeriodYear(comparisonTarget, periodYear = 3) {
  const startDate = moment().startOf('month').add(-1, 'month');
  return startDate.diff(comparisonTarget, 'years', true) > periodYear;
}

export function isDateType(value) {
  const pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
  return pattern.test(value);
}

export function getDateDiff(start, end = '', unitOfTime = 'month') {
  if (end === '') {
    end = getToday();
  }
  return moment(end).diff(moment(start), unitOfTime);
}

export function isAfter(comparisonYmdt, asOfYmdt = '') {
  return moment(asOfYmdt === '' ? getToday() : asOfYmdt).isAfter(comparisonYmdt);
}

export function isSameOrAfter(asOfYmdt = '', comparisonYmdt) {
  return moment(asOfYmdt === '' ? getToday() : asOfYmdt).isSameOrAfter(comparisonYmdt);
}

export function isBefore(asOfYmdt = '', comparisonYmdt) {
  return moment(asOfYmdt === '' ? getToday() : asOfYmdt).isBefore(comparisonYmdt);
}

export function isSameOrBefore(asOfYmdt = '', comparisonYmdt) {
  return moment(asOfYmdt === '' ? getToday() : asOfYmdt).isSameOrBefore(comparisonYmdt);
}

// 'YYYY-MM-DD hh:mm:ss' -> 'YYYY-MM-DD<br/>hh:mm:ss'
export function getDateSpaceTime(ymdt) {
  if (!ymdt) return '-';
  const [date, time] = ymdt.split(' ');
  return `${date}<br>${time}`;
}

/**
 * @param ymd  YYYY-MM-DD
 */
export function parseYmdDateFormat(ymd) {
  const [_, y, m, d] = ymd.match(/^(\d+)-(\d+)-(\d+)$/); //, h, m, s

  return new Date(Number(y), Number(m) - 1, Number(d));
}

export function addDay4YMDHMSS(date, days) {
  return moment(date).add(days, 'days').format('YYYY-MM-DD HH:mm:ss');
}

/**
 *
 * @param {string} date
 * @returns {string} 2021. 09. 15
 */
export function formatDateWithDot(date) {
  return getStrDate(date).replaceAll('-', '. ');
}

export function toLocalDateStr(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
