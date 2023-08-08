'use strict';
import { ProductCategories } from './enums/ProductCategories';

export interface ProductData {
  id?: number;
  category: ProductCategories;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}
