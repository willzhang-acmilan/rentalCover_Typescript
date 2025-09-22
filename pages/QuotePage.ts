import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class QuotePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async verifyHeadingTitleCorrect(expectedTitle: string) {
        await this.page.waitForURL('**/quote/**');
        await this.page.waitForLoadState()
        const heading = this.page.locator('header', { hasText: 'your protection'}).first();
        await expect(heading).toHaveText(expectedTitle);
    }


}