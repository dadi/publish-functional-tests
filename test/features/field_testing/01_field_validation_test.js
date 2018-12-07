Feature('Field Test Page - @smoke')

BeforeSuite(async (loginPage) => {
  await loginPage.deleteUser('field')
  await loginPage.addUser('field', '123456')
  await loginPage.createSession('field', '123456', '/field-test')
})

AfterSuite(async (I, loginPage) => {
  await I.clearCookie('accessToken')
  await loginPage.deleteUser('field')
})

Before(async (loginPage) => {})

After(async (loginPage) => {})

Scenario('Field Validation Tests', async (fieldPage) => {
  await fieldPage.validateFields()
})
