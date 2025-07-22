import { Category } from "./category";
import { Unit } from "./unit";

export interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
  price: string;
  category:Category;
  unit: Unit;
  stock:number;
  image: string;
}
