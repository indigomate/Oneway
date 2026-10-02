import { ASSETS } from './rawImages';

export type Size = 'S' | 'M' | 'L' | 'XL';

export interface Product {
  id: string;
  name: string;
  edition: string;
  category: 'tees' | 'hoodies';
  price: number;
  image: string;
  tag?: string;
  isRedEdition?: boolean;
  isBrownEdition?: boolean;
  description: string;
}

export interface CartItem {
  cartItemId: string; // unique per product + size
  productId: string;
  name: string;
  edition: string;
  size: Size;
  price: number;
  image: string;
  quantity: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'wyve-01-tee-black',
    name: 'Wyve 01 Tee',
    edition: 'Black Edition',
    category: 'tees',
    price: 68,
    image: ASSETS.teeBlack,
    description: 'Heavyweight 280 GSM combed cotton with oversized boxy cut, subtle chest wave embroidery, and reinforced rib collar.',
  },
  {
    id: 'wyve-01-tee-white',
    name: 'Wyve 01 Tee',
    edition: 'Bone White Edition',
    category: 'tees',
    price: 68,
    image: ASSETS.teeWhite,
    description: 'Off-white chalk tone in 280 GSM cotton jersey. Engineered drop shoulder for effortless drape without cling.',
  },
  {
    id: 'wyve-01-tee-red',
    name: 'Wyve 01 Tee',
    edition: 'Red Edition',
    category: 'tees',
    price: 72,
    image: ASSETS.teeRed,
    tag: 'Limited',
    isRedEdition: true,
    description: 'Rich oxblood dye treatment on 280 GSM organic cotton. Finished with contrast tonal chest branding.',
  },
  {
    id: 'wyve-hoodie-brown',
    name: 'Wyve Contrast Piped Hoodie',
    edition: 'Washed Brown Edition',
    category: 'hoodies',
    price: 135,
    image: ASSETS.hoodieBrown,
    tag: 'Limited',
    isBrownEdition: true,
    description: 'Luxury 450 GSM French terry with mineral wash and stark bone white cord piping along the raglan shoulders.',
  },
  {
    id: 'wyve-hoodie-black',
    name: 'Wyve Contrast Piped Hoodie',
    edition: 'Black Edition',
    category: 'hoodies',
    price: 135,
    image: ASSETS.hoodieBlack,
    description: 'Jet black 450 GSM terry fleece featuring white structural seam piping and deep double-layered sculptural hood.',
  },
  {
    id: 'wyve-hoodie-grey',
    name: 'Wyve Contrast Piped Hoodie',
    edition: 'Heather Grey Edition',
    category: 'hoodies',
    price: 125,
    image: ASSETS.hoodieGrey,
    description: 'Athletic melange grey fleece with contrast white piping. Heavyweight ribbed hem and cuffs for structured wear.',
  },
];
