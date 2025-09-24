export type VehicleType = 'Car' | 'Minibus' | '4*4' | 'Motorhome/RV' | 'Campervan';

export interface BookingInformation {
    residence: string;
    destination: string;
    bookingDate: BookingDate;
    pickupState: string;
    vehicleType: VehicleType;
}

export interface BookingDate {
    startDate: string; // Februaray 25, 2025
    endDate: string;   // February 28, 2025
}   

export interface PaymentDetails {
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    country: string;
    postalCode?: string;
}

export interface PersonalDetail {
    email: string;
    fullName: string;
    postcode: string;
}