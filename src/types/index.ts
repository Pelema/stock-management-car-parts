export type UserInputs = {
    id?: string;
    email: string;
    password: string;
    phone?: string;
    role?: Roles;
    fullname?: string;
}

export enum Roles {
    admin = "admin",
    sales = "sales",
    stock = "stock",
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
    full_name: string;
    email: string;
    last_login: string;
}

export type VAT = {
    id: number;
    label: string;
    percentage: number;
}

export type TModalProps = {
    openedModal: string;
    setOpenedModal: React.Dispatch<React.SetStateAction<string>>;
};

export type CarModel = {
    id: number;
    make: string;
    model: string;
    price: number;
}

export type ReStockItem = {
    id?: number;
    invoice_number: string;
    supplier_id: string;
    markup_perc: number | VAT;
    quantity_received: number;
    purchase_price: number;
    markup_price: number;
    selling_price?: number;
}

export type StockItem = {
    id?: number;
    OEM_number: string;
    name: string;
    VIN: string;
    car_model: number | CarModel;
    engine_number: string;
    description: string;
    manufacturer: string;
    model_range: string;
    selling_price: number;
    supplier: number | Supplier;
    // VAT: number | VAT;
    // available_stock: number;
    min_stock_level: number;
    quantity_on_hand: number;
    // net_price: number;
    // gross_price: number;
    quantity: number;
}

export type QueryProps = {
    table: string;
    is_single?: boolean;
    from?: number;
    to?: number;
    pageSize?: number;
    offset?: number;
    _id?: number;
    filter?: string;
    modifier?: string;
}

export type Customer = {
    id: number;
    name: string;
    email: string;
    telephone: string;
    address: string;
    company_name: string;
    company_reg?: string;
    VAT_reg: string;
}

export type Order = {
    id: number;
    order_number: string;
    customer_id: number;
    order_date: Date;
    status: 'pending' | 'confirmed' | 'shipped';
    total_amount?: number;
    created_at: Date;
    customer?: Customer;
    sales_order_items?: OrderItem[];
}

export type OrderItem = {
    id: number;
    sales_order_id: number;
    product_id: number;
    product?: StockItem;
    quantity: number;
    unit_price: number;
    total_price: number;
    created_at: Date;
}

export type Invoice = {
    id: number;
    invoice_number: string;
    sales_order_id: number;
    order?: Order;
    issue_date: Date;
    due_date: Date;
    status: 'unpaid' | 'partially_paid' | 'paid' | 'overdue';
    total_amount: number;
    created_at: Date;
}

export type Payment = {
    id: number;
    payment_reference: string;
    invoice_id: number;
    payement_date: Date;
    amount_paid: number;
    payment_method: 'credit-card' | 'bank-transfer' | 'cash';
    created_at: Date;
    invoice?: Invoice;
}

export type PaymentInput = {
    amount: number;
    method: 'credit-card' | 'bank-transfer' | 'cash';
}
