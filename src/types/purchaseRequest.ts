export type PurchaseRequest = {
    id: number;
    date: string;
    pr_number: string;
    department?: string | null;
    budget_number?: string;
    fixed_asset_number: string | null;
    type: string | null;
    transportation: string | null;
    kind_of_request: string;
    acc: string;
    item_code: string | null;
    item_name: string | null;
    description_of_goods: string;
    specification: string;
    part: string | null;
    quantity: number;
    unit: string;
    est_unit_price: number;
    est_amount: number;
    currency: string;
    req_delivery: string;
    supplier: string;
    status: string;
    remark: string | null;
    purpose: string;
    requested: string;
    gen_manager: string;
    supervisor: string | null;
    purchase_request_details: PurchaseRequestDetail[];
    createdAt: string;
    updatedAt: string; 
}

export type PurchaseRequestDetail = {
    id: number;
    purchase_request_id: number;
    item_code: string;
    item_name: string;
    quantity: number;
    unit: string;
    est_unit_price: number;
    est_amount: number;
    description_of_good: string;
    createdAt: string;
    updatedAt: string;
}

