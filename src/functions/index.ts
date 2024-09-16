import { toast } from "sonner";

export function formatCurrency(amount: number, currency: string = 'NAD', locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);
}

export function message(message: string, error: boolean = false) {
    if (error) toast.error(message)
    else toast.success(message)
}