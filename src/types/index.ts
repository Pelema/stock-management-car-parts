export type UserInputs = {
    email: string;
    password: string;
    role?: string;
}

export type Order = {
    id: number;
    order_number: string;
    customer_name: string;
    company_name: string;
    customer_phone: string;
    date: string;
    invoice?: string;
}

export type Supplier = {
    id: number;
    name: string;
    email: string;
    telephone: string;
    contact_person: string;
    address?: string;
    website?: string;
    company_reg?: string;
    VAT_reg?: string;
}

export type User = {
    id: number;
    name: string;
    email: string;
    lastLogin: string;
}