import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { BookingInformation, PaymentDetails, PersonalDetail, BookingDate} from '../interface/interface';


export class QuotePage extends BasePage {
    readonly personalDetailForm: Locator;
    readonly paymentForm: Locator;

    constructor(page: Page) {
        super(page);
        this.personalDetailForm = this.page.locator('#personal-details-form');
        this.paymentForm = this.page.locator('div.StripeElement');
    }

    async sendQuoteByEmail(email: string) {
        await this.page.locator('#email-save-quote').fill(email);
        await this.clickButton('SEND');
        await this.page.getByRole('button', { name: 'SEND' }).waitFor({ state: 'hidden', timeout: 10000 });
        // await expect(this.page.locator('small#emailHelpTextID', { hasText: 'Your quote has been successfully sent' }))
        // .toBeVisible({ timeout: 20000 });
    }

    async fillPersonalDetails(personalDetail: PersonalDetail) {
        await this.personalDetailForm.locator('#email').fill(personalDetail.email);
        await this.personalDetailForm.locator('#fullName').fill(personalDetail.fullName);
        await this.personalDetailForm.locator('#postalCode').fill(personalDetail.postcode);
    }

    async fillPaymentMethods(paymentDetail: PaymentDetails) {
        const paymentFrame = this.paymentForm.frameLocator('div.__PrivateStripeElement iframe:visible');
        // Card Number
        await paymentFrame.locator('#Field-numberInput').waitFor({ state: 'visible', timeout: 20000 });
        await paymentFrame.locator('#Field-numberInput').click();
        await paymentFrame.locator('#Field-numberInput').fill(paymentDetail.cardNumber);

        // Expiry
        await paymentFrame.locator('#Field-expiryInput').waitFor({ state: 'visible' });
        await paymentFrame.locator('#Field-expiryInput').click();
        await paymentFrame.locator('#Field-expiryInput').fill(paymentDetail.expiryDate);

        // CVC
        await paymentFrame.locator('#Field-cvcInput').waitFor({ state: 'visible' });
        await paymentFrame.locator('#Field-cvcInput').click();
        await paymentFrame.locator('#Field-cvcInput').fill(paymentDetail.cvc);

        // Country
        await paymentFrame.locator('#Field-countryInput').selectOption(paymentDetail.country);

        // Postal Code
        if (await paymentFrame.locator('#Field-postalCodeInput').isVisible() && paymentDetail.postalCode) {
            await paymentFrame.locator('#Field-postalCodeInput').fill(paymentDetail.postalCode);
        }

        // await this.clickButton('Submit Payment')
    }

    async editQuote(newBookingDate: BookingDate) {
        await this.clickButton('Edit Quote');
        await this.verifyPopUpVisible();
        await this.selectDate(newBookingDate.startDate, newBookingDate.endDate);
        await this.clickButtonInModal('Update Quote');
        // await this.modal.waitFor({ state: 'hidden', timeout: 20000 });
    }

    async changeCurrency(newCurrency: string) {
        const currencySelection = this.page.locator('div[data-test-id="currency-select"]');
        // click currency dropdown
        await currencySelection.locator('.react-select__control').click();
        await this.page.locator('div.react-select__menu').waitFor({ state: 'visible', timeout: 10000 });
        // get common currency in dropdown area
        const commonCurrencyText = await this.page.locator(`.react-select__option`).allTextContents();
        const commonCurrency = commonCurrencyText.slice(0, -1).map(c => c.trim().match(/^[A-Z]{3}/)?.[0] || c.trim());

        if (commonCurrency.includes(newCurrency)) {
            // if target currency is visible in dropdown 
            await this.page.locator(`.react-select__option`, { hasText: newCurrency }).click();
        } else {
            // Click More to find currency
            await currencySelection.locator('div.react-select__menu').getByText('More').click();
            await this.modal.waitFor({ state: 'visible', timeout: 10000 });
            await this.modal.locator(`span`, { hasText: newCurrency }).click();
        }
        await this.page.getByText('Loading…').waitFor({ state: 'hidden', timeout: 10000 });
        const container = this.page.locator('.react-select__value-container');
        await expect(container).toBeVisible({ timeout: 10000 });
        const paymentCurrency = await container.textContent();
        expect(paymentCurrency).toBe(newCurrency);

    }

    async validateBookingInformation(expectedInfo: BookingInformation) {
        const liveCountry = await this.page.locator('dd[data-test-id="quote-residence"]').textContent();
        const destination = await this.page.locator('dd[data-test-id="quote-destination"]').textContent();
        const startDate = await this.page.locator('dd[data-test-id="quote-from-date"]').textContent();
        const endDate = await this.page.locator('dd[data-test-id="quote-to-date"]').textContent();
        

        expect(liveCountry).toBe(expectedInfo.residence);
        expect(destination).toBe(expectedInfo.destination);
        expect(startDate).toBe(expectedInfo.bookingDate.startDate);
        expect(endDate).toBe(expectedInfo.bookingDate.endDate);
        if (expectedInfo.pickupState) {
            const pickupState = await this.page.locator('dd[data-test-id="quote-destination-state"]').textContent();
            expect(pickupState).toBe(expectedInfo.pickupState);
        }
    }

    async verifyHeadingTitleCorrect(expectedTitle: string) {
        await this.page.waitForURL('**/quote/**');
        await this.page.waitForLoadState()
        const heading = this.page.locator('header', { hasText: 'your protection'}).first();
        await expect(heading).toHaveText(expectedTitle);
    }
}