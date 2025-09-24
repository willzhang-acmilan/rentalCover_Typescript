import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { BookingInformation, VehicleType } from '../interface/interface';

export class HomePage extends BasePage {
    readonly bookingForm: Locator;
    

    constructor(page: Page) {
        super(page);
        this.bookingForm = this.page.locator('.booking-form');
        
    }

    async selectCountry(countryName: string) {
        // Click Country dropdown to open options and select
        await this.selectDropdownOption('In which country are you renting your vehicle?', countryName);
    }

    async selectLivingCountry(countryName: string) {
        // Click Change button if visible
        const btn = this.page.locator('button[data-test-id="cor-change-button"]');
        if (await btn.isVisible()) {
            await btn.click();
        }

        // Click Country dropdown to open options and select
        await this.selectDropdownOption('Country of Residence', countryName);
    }


    async selectVehicleType(vehicleType: VehicleType) {
        // Click Change button if visible
        const btn = this.page.locator('button[data-test-id="vehicle-change-button"]');
        if (await btn.isVisible()) {
            await btn.click();
        }

        // Click Vehicle Type dropdown to open options and select
        await this.selectDropdownOption('Vehicle Type', vehicleType);

    }  

    async selectState(stateName: string) {
        // Click State dropdown to open options and select
        await this.modal.waitFor({ state: 'visible' });
        await this.selectDropdownOption('Select or type a state', stateName);
    }

    async clickButtonInForm(buttonText: string) {
        const button = this.bookingForm.getByRole('button', { name: buttonText });
        await button.click();
    }

} 