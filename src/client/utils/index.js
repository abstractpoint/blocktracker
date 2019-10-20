import RelativeTimeFormat from 'relative-time-format';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

RelativeTimeFormat.addLocale(en);
TimeAgo.addLocale(en);

export const getAverageTimePerBlock = blocks => {
  const [totalTimeInSeconds] = blocks.reduce((acc, next) => {
    const difference = acc[1] ? acc[1].timestamp - next.timestamp : 0;
    return [acc[0] + difference, next];
  }, [0, undefined]);

  return totalTimeInSeconds / blocks.length - 1;
};

export const getAverageTxPerBlock = blocks => {
  const totalTx = blocks.reduce((acc, each) => acc + each.transactions.length, 0);

  return totalTx / blocks.length;
};

export const relative = new RelativeTimeFormat('en', { style: 'long', numeric: 'auto' });

const timeAgoHelper = new TimeAgo('en-US');
export const timeAgo = timestamp => timeAgoHelper.format(timestamp, { flavour: 'long', graduation: 'canonical', units: ['second', 'minute'] });
