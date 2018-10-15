Feature('Profile Page - @smoke')

BeforeSuite((loginPage) => {
  loginPage.addUser('syst_three', '123456')
})

AfterSuite((loginPage) => {
  loginPage.deleteUser('syst_three')
})

Before((I, loginPage) => {
  loginPage.validateSignInPage()
})

After((I, loginPage) => {
  loginPage.validateSignOut()
})

Scenario('Change Personal Details', async (I, loginPage, profilePage) => {
  await loginPage.validateSignIn('syst_three', '123456')
  await profilePage.changePersonalDetails('First', 'Last')
})