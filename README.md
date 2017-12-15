# pr-approval-emoji

> Emoji to use on your GitHub PR approvals.

1. List all emoji available GitHub
2. Filter out emoji with negative sentiment
3. Filter out emoji on the blacklist
4. Group emoji by the first character of their name
5. Filter out name-groups that have fewer than 10 members
6. Determine the ISO-8601 week number
7. Index into the name-groups via the week number
8. Sample two random emoji from the name-group
9. Convert them to their text-input equivalent
10. Copy the text to the system clipboard

## Usage

```
$ pr-approval-emoji
```

## Installation

```
$ git clone https://github.com/mewdriller/pr-approval-emoji.git
$ cd pr-approval-emoji
$ npm i -g .
```

## License

MIT
