const clipboardy = require('clipboardy');
const dateFns = require('date-fns');
const gemoji = require('gemoji');
const _ = require('lodash');
const sentiment = require('sentiment');

const MIN_EMOJI_PER_GROUP = 10;
const MIN_EMOJI_SENTIMENT = 1;

const BLACKLIST = [
  'anger',
  'arrow_double_down',
  'back',
  'baby_symbol',
  'black_square_button',
  'chart_with_downwards_trend',
  'couple',
  'couplekiss_man_woman',
  'couple_with_heart_woman_man',
  'eggplant',
  'end',
  'kiss',
  'kissing_cat',
  'kissing_closed_eyes',
  'kissing_heart',
  'kissing_smiling_eyes',
  'lips',
  'mens',
  'mute',
  'no_bicycles',
  'no_smoking',
  'rose',
  'scream_cat',
  'six_pointed_star',
  'symbols',
  'syringe',
  'toilet',
  'tongue',
  'two_women_holding_hands',
  'u5272',
  'wc',
  'white_square_button',
  'x',
  'zzz',
];

const ALL_EMOJI = Object.values(gemoji.name).map(emoji =>
  Object.assign(emoji, { sentiment: sentiment(emoji.emoji) }),
);

const emojiAllowed = emoji => !BLACKLIST.includes(emoji.name);

const emojiPositive = emoji => emoji.sentiment.score >= MIN_EMOJI_SENTIMENT;

const CANDIDATES = _.uniqBy(
  ALL_EMOJI.filter(emojiAllowed).filter(emojiPositive),
  'emoji',
);

const CANDIDATE_GROUPS = Object.values(
  _.omitBy(
    _.groupBy(CANDIDATES, emoji => emoji.name.charAt(0)),
    letterGroup => letterGroup.length < MIN_EMOJI_PER_GROUP,
  ),
);

function prApprovalEmoji(date) {
  const weekNumber = dateFns.getISOWeek(date);
  const weekIndex = weekNumber % CANDIDATE_GROUPS.length;
  const emojiGroup = CANDIDATE_GROUPS[weekIndex];

  return _.sampleSize(emojiGroup, 2)
    .map(emoji => `:${emoji.name}:`)
    .join(' ');
}

const selectedEmoji = prApprovalEmoji(Date.now());

console.log('PR Approval Emoji\n');
console.log(`${selectedEmoji}\n`);
console.log('Copied to clipboard!');

clipboardy.writeSync(selectedEmoji);
