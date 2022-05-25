export interface Customer {
    id: string;
    name: string;
    profileImage: string;
}

export enum PaymentType {
    CARD_PAYMENT = "CARD_PAYMENT",
    CASH_PAYMENT = "CASH_PAYMENT"
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

export interface HeadCell<T> {
    disablePadding: boolean;
    id: keyof T;
    label: string;
    numeric: boolean;
}

