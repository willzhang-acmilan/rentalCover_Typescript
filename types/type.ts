export type VehicleType = 'Car' | 'Minibus' | '4*4' | 'Motorhome/RV' | 'Campervan';

export type BookingInformation = {
    residence: string;
    destination: string;
    bookingDate: BookingDate;
    pickupState: string;
    vehicleType: VehicleType;
}

export type BookingDate = {
    startDate: string; // Februaray 25, 2025
    endDate: string;   // February 28, 2025
}   

export type PaymentDetails = {
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    country: string;
    postalCode?: string;
}

export type PersonalDetail = {
    email: string;
    fullName: string;
    postcode: string;
}