export interface Part {
    id: number;
    code: string;
    balance:number;
    description?: string;
    max_quantity:number;
    min_quantity:number;
    specification?:string;
}