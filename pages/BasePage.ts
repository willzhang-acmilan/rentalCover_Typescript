import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly modal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modal = this.page.locator('div[data-test-id="Modal"]')
        
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

    async clickButton(buttonText: string) {
        const button = this.page.getByRole('button', { name: buttonText });
        await button.click();
    }

    async clickButtonInModal(buttonText: string) {
        const button = this.modal.getByRole('button', { name: buttonText });
        await button.click();
    }

    async selectDate(startDate: string, endDate: string) {

        // Convert "2025-09-25" → "September 25, 2025"
        const formatDate = (isoDate: string) => {
            const date = new Date(isoDate);
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        }

        const selectSingleDate = async (dateStr: string) => {
            const targetDate = new Date(dateStr);
            const monthYear = targetDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
            const dayLabel = formatDate(dateStr);

            // Function to parse "Month YYYY" into a Date object
            const parseMonthYear = (text: string) => {
                return new Date(`${text} 1`);
            };

            while (true) {
                const visibleMonthText = await this.page
                    .locator('//div[@class="CalendarMonth CalendarMonth_1" and @data-visible="true"]//div[@class="CalendarMonth_caption CalendarMonth_caption_1"]')
                    .first()
                    .textContent();

                if (!visibleMonthText) throw new Error("Could not read visible month");
                const visibleDate = parseMonthYear(visibleMonthText);

                if (visibleMonthText == monthYear) break;

                if (targetDate > visibleDate) {
                    // Go right (future)
                    await this.page.locator('svg.next-svg').click();
                } else {
                    // Go left (past)
                    await this.page.locator('svg.prev-svg').click();
                }

                await this.page.waitForTimeout(500); // wait for the calendar to update
            }

            // Click the day
            await this.page.locator(`td[aria-label*="${dayLabel}"]`).click();
        };
         // Open the calendar 
        await this.page.locator('#coverageDates-startDate').click();
        await selectSingleDate(startDate);
        await selectSingleDate(endDate);
        await this.page.locator('div.DayPicker_transitionContainer').waitFor({ state: 'hidden' });

    }

    async verifyPopUpVisible() {
        await expect(this.modal, 'Modal should be visible').toBeVisible({ timeout: 10000 });
    }

}