Feature('Articles Page - @smoke')

// BeforeSuite((I, loginPage) => {
//     loginPage.addUser('buzz', 'lightyear')
// })

// AfterSuite((I, loginPage) => {
//     loginPage.removeVerifyTokens('syst_one@gmail.com')
//     // loginPage.removeClientStoreEntry('syst_one@gmail.com')
//     loginPage.removeUserFromDB('syst_one@gmail.com')
// })

BeforeSuite((loginPage) => {
  loginPage.addUser('syst_two', '123456')
})

AfterSuite((loginPage) => {
  loginPage.deleteUser('syst_two')
})

Before((loginPage) => {
  loginPage.validateSignInPage()
})

After((loginPage) => {
  loginPage.validateSignOut()
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