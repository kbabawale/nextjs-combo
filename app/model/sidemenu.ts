export enum ExtraIconType {
    BADGE = "BADGE",
    HAZARD = "HAZARD"
}

export type ExtraIcon = {
    active: boolean;
    type: ExtraIconType;
    value?: number;
}
export interface SideMenuItem {
    unfilledIcon: string;
    filledIcon: string;
    url: string;
    label: string;
    extraIcon?: ExtraIcon;
    id: number;
}

export let SideMenuItems: SideMenuItem[] = [
    {
        id: 1,
        label: 'Dashboard',
        url: '/dashboard',
        filledIcon: 'DashboardFilled',
        unfilledIcon: 'DashboardUnfilled'
    },
    {
        id: 2,
        label: 'Products',
        url: '/products',
        filledIcon: 'ProductsFilled',
        unfilledIcon: 'ProductsUnfilled',
        extraIcon: {
            active: true,
            type: ExtraIconType.HAZARD
        }
    },
    {
        id: 3,
        label: 'Orders',
        url: '/orders',
        filledIcon: 'OrdersFilled',
        unfilledIcon: 'OrdersUnfilled',
        extraIcon: {
            active: true,
            type: ExtraIconType.BADGE,
            value: 99
        }
    },
    {
        id: 4,
        label: 'Delivery',
        url: '/delivery',
        filledIcon: 'DeliveryFilled',
        unfilledIcon: 'DeliveryUnfilled'
    },
    {
        id: 5,
        label: 'Payments',
        url: '/payments',
        filledIcon: 'PaymentsFilled',
        unfilledIcon: 'PaymentsUnfilled'
    },
    {
        id: 6,
        label: 'Staff',
        url: '/staff',
        filledIcon: 'StaffFilled',
        unfilledIcon: 'StaffUnfilled'
    },
    {
        id: 7,
        label: 'Vehicles',
        url: '/vehicles',
        filledIcon: 'VehiclesFilled',
        unfilledIcon: 'VehiclesUnfilled'
    },
    {
        id: 8,
        label: 'Documents',
        url: '/documents',
        filledIcon: 'DocumentsFilled',
        unfilledIcon: 'DocumentsUnfilled'
    },
    {
        id: 9,
        label: 'Settings',
        url: '/settings',
        filledIcon: 'SettingsFilled',
        unfilledIcon: 'SettingsUnfilled'
    }
];