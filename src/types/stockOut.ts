import { Area } from "./area";
import { Kanban } from "./kanban";
import { Machine } from "./machine";
import { Operator } from "./operator";
import { StockOutChangeLog } from "./stockOutChangeLog";

export type StockOut = {
    id: number;
    kanban_code:string;
    kanban:Kanban;
    quantity:number;
    machine_area:Area;
    machine:Machine;
    operator?:Operator;
    stock_out_change_logs:StockOutChangeLog[];
    created_at:string;
}