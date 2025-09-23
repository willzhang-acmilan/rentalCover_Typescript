import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class QuotePage extends BasePage {
    readonly personalDetailForm: Locator;
    readonly paymentMethodForm: Locator;

    constructor(page: Page) {
        super(page);
        this.personalDetailForm = this.page.locator('#personal-details-form');
        this.paymentMethodForm = this.page.locator('#payment-method-form');
    }

    async fillPersonalDetails(email: string, fullName: string, postcode: string) {
        await this.personalDetailForm.locator('#email').fill(email);
        await this.personalDetailForm.locator('#fullName').fill(fullName);
        await this.personalDetailForm.locator('#postalCode').fill(postcode);
    }

    async verifyHeadingTitleCorrect(expectedTitle: string) {
        await this.page.waitForURL('**/quote/**');
        await this.page.waitForLoadState()
        const heading = this.page.locator('header', { hasText: 'your protection'}).first();
        await expect(heading).toHaveText(expectedTitle);
    }

    async sendQuoteByEmail(email: string) {
        await this.page.locator('#email-save-quote').fill(email);
        await this.clickButton('SEND');
        const successMessage = this.page.locator('#emailHelpTextID div');
        expect(successMessage).toHaveText('Your quote has been successfully sent');
    }

    async fillPaymentMethods(cardNumber: string, expiryDate: string, cvc: string, country: string, postalCode?: string) {
        const paymentFrame = this.page.frameLocator('div.__PrivateStripeElement iframe');
        // Card Number
        await paymentFrame.locator('#Field-numberInput').click();
        await paymentFrame.locator('#Field-numberInput').fill(cardNumber);

        // Expiry
        await paymentFrame.locator('#Field-expiryInput').click();
        await paymentFrame.locator('#Field-expiryInput').fill(expiryDate);

        // CVC
        await paymentFrame.locator('#Field-cvcInput').click();
        await paymentFrame.locator('#Field-cvcInput').fill(cvc);

        // Country
        await paymentFrame.locator('#Field-countryInput').selectOption(country);

        // Postal Code
        if (await paymentFrame.locator('#Field-postalCodeInput').isVisible() && postalCode) {
            await paymentFrame.locator('#Field-postalCodeInput').fill(postalCode);
        }

        await this.clickButton('Submit Payment')
    }

    async editQuote(startDate: string, endDate: string) {
        await this.clickButton('Edit Quote');
        await this.verifyPopUpVisible();
        await this.selectDate(startDate, endDate);
        await Promise.all([
            this.page.waitForResponse('**/charges'),
            this.clickButtonInModal('Update Quote'),
        ]);
    }
}