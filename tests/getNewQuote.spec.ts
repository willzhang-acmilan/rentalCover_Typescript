import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { QuotePage } from '../pages/QuotePage';

test('Get a New Quote', async ({ page }) => {
    const homePage = new HomePage(page);
    const quotePage = new QuotePage(page);

    await homePage.navigateToHomePage();
    await homePage.selectCountry('United States');
    await homePage.selectDate("2026-01-25", "2026-01-26");
    await homePage.selectLivingCountry('United States');
    await homePage.selectVehicleType('Car');
    await homePage.clickButtonInForm('Get Your Instant Quote');

    await homePage.verifyPopUpVisible();
    await homePage.selectState('California');
    await homePage.clickButtonInModal('Get Your Instant Quote')
    await quotePage.verifyHeadingTitleCorrect('Your protection');
    await quotePage.editQuote("2025-10-25", "2025-10-26");
    await quotePage.sendQuoteByEmail('test@example.com');
    await quotePage.clickButton('Proceed To Payment');
    // await quotePage.fillPersonalDetails('test@example.com', 'John Doe', '12345');
    await quotePage.fillPaymentMethods('4242424242424242', '12/34', '123', 'United States', '12345');

});