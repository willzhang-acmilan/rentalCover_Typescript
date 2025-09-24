import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { QuotePage } from '../pages/QuotePage';
import { BookingInformation, VehicleType,  BookingDate, PaymentDetails, PersonalDetail} from '../types/type';

const bookingInformation: BookingInformation = {
    residence: 'United States',
    destination: 'United States',
    bookingDate: {
        startDate: 'January 2, 2026',
        endDate: 'February 1, 2026',
    },
    pickupState: 'California',
    vehicleType: 'Car',
}
const newBookingDate: BookingDate = {
    startDate: 'October 25, 2025',
    endDate: 'October 29, 2025',
}

const paymentDetail: PaymentDetails = {
    cardNumber: '4242424242424242',
    expiryDate: '12/34',
    cvc: '123',
    country: 'United States',
    postalCode: '12345'
}

const personalDetail: PersonalDetail = {
    email: 'test@example.com',
    fullName: 'John Doe',
    postcode: '12345'
}

test('Get a New Quote', async ({ page }) => {
    const homePage = new HomePage(page);
    const quotePage = new QuotePage(page);

    await homePage.navigateToHomePage();
    await homePage.selectCountry(bookingInformation.residence);
    await homePage.selectDate(bookingInformation.bookingDate.startDate, bookingInformation.bookingDate.endDate);
    await homePage.selectLivingCountry(bookingInformation.residence);
    await homePage.selectVehicleType(bookingInformation.vehicleType);
    await homePage.clickButtonInForm('Get Your Instant Quote');

    await homePage.verifyPopUpVisible();
    await homePage.selectState(bookingInformation.pickupState);
    await homePage.clickButtonInModal('Get Your Instant Quote')
    
    await quotePage.verifyHeadingTitleCorrect('Your protection');
    await quotePage.validateBookingInformation(bookingInformation);
    await quotePage.editQuote(newBookingDate);
    await quotePage.changeCurrency('EUR');
    await quotePage.changeCurrency('CNY');
    await quotePage.sendQuoteByEmail('test@example.com');
    await quotePage.clickButton('Proceed To Payment');
    // await quotePage.fillPersonalDetails(personalDetail);
    // await quotePage.fillPaymentMethods(paymentDetail);

});