Feature('Articles Page - @smoke')

BeforeSuite(async (articlePage, loginPage) => {
  // await articlePage.deleteDocument('This is a new article')
  await loginPage.deleteUser('syst_two')
  await loginPage.addUser('syst_two', '123456')
})

AfterSuite(async (loginPage) => {
  await loginPage.deleteUser('syst_two')
})

Before(async (loginPage) => {
  await loginPage.validateSignInPage()
})

After(async (loginPage) => {
  await loginPage.validateSignOut()
})

Scenario('Create Article', async (articlePage, homePage, loginPage) => {
  await loginPage.validateSignIn('syst_two', '123456')
  await homePage.goToArticles()
  await articlePage.validateArticlePage()
  await articlePage.addArticle()
})

Scenario('Edit Article', async (articlePage, homePage, loginPage) => {
  await loginPage.validateSignIn('syst_two', '123456')
  await homePage.goToArticles()
  await articlePage.validateArticlePage()
  await articlePage.editArticle()
})

Scenario('Delete Article', async (articlePage, homePage, loginPage) => {
  await loginPage.validateSignIn('syst_two', '123456')
  await homePage.goToArticles()
  await articlePage.validateArticlePage()
  await articlePage.deleteArticle()
})