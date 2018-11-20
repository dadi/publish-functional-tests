Feature('Rich Text Editor - @smoke')

BeforeSuite(async (articlePage, loginPage) => {
  // await articlePage.deleteDocument('This Is A New Article')
  await articlePage.deleteDocument('Rich Text')
  await loginPage.deleteUser('rich_text')
  await loginPage.addUser('rich_text', '123456')
  await loginPage.createSession('rich_text', '123456', '/articles/new')
})

AfterSuite(async (I, loginPage) => {
  await I.clearCookie('accessToken')
  await loginPage.deleteUser('rich_text')
})

Before(async (loginPage) => {
})

After(async (loginPage) => {
})

Scenario('Rich Text', async (articlePage) => {
  await articlePage.richTextInput()
})
