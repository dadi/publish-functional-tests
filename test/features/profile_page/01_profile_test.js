Feature('Profile Page - @smoke')

BeforeSuite( async (loginPage) => {
  await loginPage.deleteUser('syst_three')
  await loginPage.addUser('syst_three', '123456')
})

AfterSuite( async (loginPage) => {
  await loginPage.deleteUser('syst_three')
})

Before(async (loginPage) => {
  await loginPage.validateSignInPage()
})

After(async (loginPage) => {
  await loginPage.validateSignOut()
})

Scenario('Change Personal Details', async (I, loginPage, profilePage) => {
  await loginPage.validateSignIn('syst_three', '123456')
  await profilePage.changePersonalDetails('First', 'Last')
})