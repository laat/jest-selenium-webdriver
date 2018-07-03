import GooglePage from './PageObjects/GooglePage';

describe('Google.com', () => {
  it('should have the correct title', async () => {
    await GooglePage.open();
    await expect(driver).toHaveTitle('Google');
  });
  it("should have I'm Feeling lucky input", async () => {
    await GooglePage.open();
    expect(await GooglePage.imFeelingLucky.getAttribute('aria-label')).toEqual(
      'Jeg prøver lykken'
    );
  });
});
