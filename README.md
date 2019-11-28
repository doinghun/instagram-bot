# Instagram Bot

This is a nodeJS instagram bot that uses [puppeteer](https://github.com/puppeteer/puppeteer) library to like 3 most recent photos of targeted tags.

_Credit to this [tutorial](https://www.youtube.com/watch?v=jw4exv4qv2E&t=1889s)_

## Installation

Clone this respository

```bash
git clone https://github.com/doinghun/instagram-bot.git
```

Install dependencies using npm

```bash
npm install
```

## Usage

1. Create `config.js` file with `IG_ID` & `IG_PW` in _key value pairs_.

2. Create `tags.js` file with instagram hashtags in _array_ to like the 3 most recent photos of each tag.

3. Run program.
   ```bash
   npm start
   ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
