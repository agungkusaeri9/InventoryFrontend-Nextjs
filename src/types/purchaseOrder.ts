import { Supplier } from "./supplier";

export type PurchaseOrder = {
    id: number;
    department:string;
    supplier:Supplier;
    po_number:string;
    po_date:string;
    pr_number:string;
    pr_date:string;
    purchase_order_details: PurchaseOrderDetail[];
    createdAt:string;
    updatedAt:string;
}

export type PurchaseOrderDetail = {
    id: number;
    purchase_order_id: number;
    spare_part_id: number;
    quantity: number;
    price: number;
    total_price: number;
    createdAt: string;
    updatedAt: string;
}