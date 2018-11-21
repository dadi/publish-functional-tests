Feature('Media Page - @smoke')

BeforeSuite(async (articlePage, loginPage) => {
  await loginPage.deleteUser('media')
  await loginPage.addUser('media', '123456')
  await loginPage.createSession('media', '123456', '/media')
})

AfterSuite(async (I, loginPage) => {
  await I.clearCookie('accessToken')
  await loginPage.deleteUser('media')
})

Before(async (loginPage) => {})

After(async (loginPage) => {})

Scenario('Media', async (mediaPage, homePage, loginPage) => {
  await mediaPage.validateMediaPage()
  // await articlePage.addArticle()
})