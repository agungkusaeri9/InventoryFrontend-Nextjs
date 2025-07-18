import { Kanban } from "./kanban";
import { Operator } from "./operator";

export type StockIn = {
    id: number;
    kanban:Kanban;
    quantity:number;
    operator?: Operator;
    created_at:string;
}