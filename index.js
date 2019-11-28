const config = require("./config")
const tags = require("./tags")
const ig = require("./instagram")

const run = async () => {
  await ig.initialize().catch(err => console.log(err))

  await ig.login(config.IG_ID, config.IG_PW).catch(err => console.log(err))

  await ig.likeTagsProcess(tags).catch(err => console.log(err))

  await ig.browser.close().catch(err => console.log(err))
}

run()
