export type StockOutChangeLog = {
    id: number;
    quantity_after: number;
    quantity_before: number;
    stock_out_id: number;
    created_at: string;
    updated_at: string;
}