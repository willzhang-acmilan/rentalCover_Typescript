import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        
    }

    async navigateToHomePage() {
        await this.page.goto('/');
    }

    async selectDropdownOption(labelName: string, optionText: string) {
        // Locate the dropdown container by label
        const dropdown = this.page.locator('label', { hasText: labelName })
            .locator('..') // go up to parent container
            .locator('.react-select__control');

        // Open the dropdown
        await dropdown.click();

        // Select option by visible text
        const option = this.page.locator(`.react-select__option`, { hasText: optionText });
        await option.click();
        await option.waitFor({ state: 'hidden' });

        // verify the dropdown selection
        await dropdown.locator('.react-select__single-value').waitFor({ state: 'visible' });
        const selected = await dropdown.locator('.react-select__single-value').textContent();
        expect(selected).toBe(optionText);

    }  

}