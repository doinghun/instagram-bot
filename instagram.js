const puppeteer = require("puppeteer")

const BASE_URL = "https://instagram.com/"
const TAG_URL = tag => `https://www.instagram.com/explore/tags/${tag}`

const instagram = {
  browser: null,
  page: null,

  initialize: async () => {
    instagram.browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    })

    instagram.page = await instagram.browser.newPage()
  },

  login: async (username, password) => {
    await instagram.page.goto(BASE_URL, { waitUntil: "networkidle2" })

    let loginButton = await instagram.page.$x('//a[contains(text(), "Log in")]')

    // Click on the login URL button

    await loginButton[0].click()

    await instagram.page.waitForNavigation({ waitUntil: "networkidle2" })

    await instagram.page.waitFor(1000)

    // Writing the username & password
    await instagram.page.type('input[name="username"]', username, {
      delay: 50
    })
    await instagram.page.type('input[name="password"]', password, {
      delay: 50
    })

    //Click on the login button
    loginButton = await instagram.page.$x('//div[contains(text(), "Log In")]')

    await loginButton[0].click()
    console.log("Logged In")

    await instagram.page.waitForNavigation({ waitUntil: "networkidle2" })

    let NotNowButton = await instagram.page.$x(
      '//button[contains(text(), "Not Now")]'
    )
    if (NotNowButton) {
      await NotNowButton[0].click()
    }
  },

  likeTagsProcess: async (tags = []) => {
    for (let tag of tags) {
      // Go to the tag page
      await instagram.page.goto(TAG_URL(tag), { waitUntil: "networkidle2" })
      await instagram.page.waitFor(1000)

      await instagram.page.waitForSelector(
        'article > div:nth-child(3) img[decoding="auto"]'
      )
      let posts = await instagram.page.$$(
        'article > div:nth-child(3) img[decoding="auto"]'
      )

      for (let i = 0; i < 3; i++) {
        let post = posts[i]
        // Click on the post
        await post.click()

        // Wait for modal to appear
        await instagram.page.waitFor('[style="overflow: hidden;"]')
        await instagram.page.waitFor(1000)

        let likeButton = await instagram.page.$(
          'span[class^="glyphsSpriteHeart__outline"]'
        )

        if (likeButton) {
          await likeButton.click()
          console.log("Post Liked")
        }
        await instagram.page.waitFor(1000)

        // Close the modal
        let closeModalButton = await instagram.page.$x(
          '//button[contains(text(), "Close")]'
        )
        await closeModalButton[0].click()

        await instagram.page.waitFor(2000)
      }

      await instagram.page.waitFor(1000)
    }
  }
}

module.exports = instagram
