import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { QuotePage } from '../pages/QuotePage';

test('Get a New Quote', async ({ page }) => {
    const homePage = new HomePage(page);
    const quotePage = new QuotePage(page);

    await homePage.navigateToHomePage();
    await homePage.selectCountry('United States');
    await homePage.selectDate("2026-09-25", "2026-09-26");
    await homePage.selectLivingCountry('United States');
    await homePage.selectVehicleType('Car');
    await homePage.clickButtonInForm('Get Your Instant Quote');

    await homePage.verifyPopUpVisible();
    await homePage.selectState('California');
    await homePage.clickButtonInModal('Get Your Instant Quote')
    await quotePage.verifyHeadingTitleCorrect('Your protection');
});