export type UserInputs = {
    email: string;
    password: string;
    phone?: string;
    role?: string;
    fullname?: string;
}

export type Order = {
    id: number;
    order_number: string;
    customer: number;
    sale_type: string;
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
    id?: number;
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
}

export type StockItem = {
    id?: number;
    OEM_number: string;
    VIN: string;
    car_model: number | CarModel;
    engine_number: string;
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
    // quantity: number;
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
    id?: string;
    name: string;
    contact: string;
    address: string;
    company_name: string;
    company_reg?: string;
    VAT_reg: string;
}
