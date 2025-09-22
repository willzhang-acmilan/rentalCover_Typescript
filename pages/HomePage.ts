import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

type VehicleType = 'Car' | 'Minibus' | '4*4' | 'Motorhome/RV' | 'Campervan';

export class HomePage extends BasePage {
    readonly bookingForm: Locator;
    readonly modal: Locator;

    constructor(page: Page) {
        super(page);
        this.bookingForm = this.page.locator('.booking-form');
        this.modal = this.page.locator('div[data-test-id="Modal"]')
    }

    async selectCountry(countryName: string) {
        // Click Country dropdown to open options and select
        await this.selectDropdownOption('In which country are you renting your vehicle?', countryName);
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

            // Open the calendar 
            await this.page.locator('#coverageDates-startDate').click();

            // Navigate to the correct month/year
            while (true) {
                const visibleMonth = await this.page.locator('//div[@class="CalendarMonth CalendarMonth_1" and @data-visible="true"]').locator('//div[@class="CalendarMonth_caption CalendarMonth_caption_1"]').allTextContents();
                if (visibleMonth.includes(monthYear)) break;
                await this.page.locator('svg.next-svg').click();
                await this.page.waitForTimeout(500); // wait for the calendar to update
            }

            // Click the day
            await this.page.locator(`td[aria-label*="${dayLabel}"]`).click();
        }

        await selectSingleDate(startDate);
        await selectSingleDate(endDate);

  }

    async selectLivingCountry(countryName: string) {
        // Click Change button if visible
        const btn = this.page.locator('button[data-test-id="cor-change-button"]');
        await btn.waitFor({ state: 'visible' });   // wait until it’s visible
        await btn.click();

        // Click Country dropdown to open options and select
        await this.selectDropdownOption('Country of Residence', countryName);
    }


    async selectVehicleType(vehicleType: VehicleType) {
        // Click Change button if visible
        const btn = this.page.locator('button[data-test-id="vehicle-change-button"]');
        await btn.waitFor({ state: 'visible' });   // wait until it’s visible
        await btn.click();

        // Click Vehicle Type dropdown to open options and select
        await this.selectDropdownOption('Vehicle Type', vehicleType);

    }  

    async selectState(stateName: string) {
        // Click State dropdown to open options and select
        await this.selectDropdownOption('Select or type a state', stateName);
    }

    async clickButtonInForm(buttonText: string) {
        const button = this.bookingForm.getByRole('button', { name: buttonText });
        await button.click();
    }

    async clickButtonInModal(buttonText: string) {
        const button = this.modal.getByRole('button', { name: buttonText });
        await button.click();
    }

} 