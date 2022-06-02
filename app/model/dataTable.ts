export interface Customer {
    id: string;
    name: string;
    profileImage: string;
}

export enum PaymentType {
    CARD_PAYMENT = "CARD PAYMENT",
    CASH_PAYMENT = "CASH PAYMENT"
}
export interface Data {
    customerName: string;
    customerProfileImage: string;
    orderNumber: number;
    amount: number;
    dateCreated: Date;
    type: PaymentType;
    blank: any;
}

export interface ProcessedOrderData {
    customerName: string;
    customerProfileImage: string;
    orderNumber: number;
    amount: number;
    dateCreated: Date;
    pin: string;
    blank: any;
}
export interface PickUpDeliveryData {
    driverName: string;
    driverProfileImage: string;
    orderNumber: number;
    numberPlate: string;
    vehicle: string;
    dateCreated: Date;
    pin: string;
    blank: any;
}
export interface PaymentData {
    paidTo: string;
    amount: number;
    description: string;
    status: string;
    dateCreated: Date;
    blank: any;
}
export interface StaffData {
    name: string;
    email: string;
    phoneNumber: string;//and area code
    trip: string;
    role: string;
    activity: string;
    blank: any;
}

export interface DropOffDeliveryData {
    driverName: string;
    driverProfileImage: string;
    orderNumber: number;
    numberPlate: string;
    vehicle: string;
    dateCreated: Date;
    status: string; //should be enum
    type: string; //should be enum
    blank: any;
}
export interface VehicleDeliveryData {
    model: string;
    color: string;
    year: number;
    VIN: string;
    registration: string;
    status: string; //should be enum
    blank: any;
}

export interface HeadCell<T> {
    disablePadding: boolean;
    id: keyof T;
    label: string;
    numeric: boolean;
}

