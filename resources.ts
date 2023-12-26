import { slugify } from '@/utils'

export interface Product {
  id: number,
  category: string,
  name: string,
  price: number,
  sizes: string[],
  image: string,
  best_seller: boolean,
  new_release: boolean,
  on_sale: boolean | number
  slug?: string
}

const productsSample: Product[] = [
  {
    id: 1,
    category: 'Men',
    name: 'Men Basic T-Shirt - SHINE',
    price: 12,
    sizes: ['M', 'L', 'XL'],
    image: '/img/tshirt/men/design_1.jpg',
    best_seller: true,
    new_release: true,
    on_sale: false,
  },
  {
    id: 2,
    category: 'Men',
    name: 'Men Basic T-Shirt - Man In Yellow',
    price: 14,
    sizes: ['M', 'L', 'XL'],
    image: '/img/tshirt/men/design_2.jpg',
    best_seller: false,
    new_release: true,
    on_sale: false
  },
  {
    id: 3,
    category: 'Men',
    name: 'Men Basic T-Shirt - Unknown',
    price: 10,
    sizes: ['M', 'L', 'XL'],
    image: '/img/tshirt/men/design_3.jpg',
    best_seller: false,
    new_release: false,
    on_sale: 10
  },
  {
    id: 4,
    category: 'Men',
    name: 'Men Basic T-Shirt - Wish You Were Here',
    price: 12,
    sizes: ['M', 'L', 'XL'],
    image: '/img/tshirt/men/design_4.jpg',
    best_seller: false,
    new_release: true,
    on_sale: 15
  },
  {
    id: 5,
    category: 'Women',
    name: 'Women Basic T-Shirt - MAKE ART',
    price: 12,
    sizes: ['M', 'L', 'XL'],
    image: '/img/tshirt/women/design_1.jpg',
    best_seller: false,
    new_release: false,
    on_sale: false
  },
  {
    id: 6,
    category: 'Women',
    name: 'Women Basic T-Shirt - The Future is FEMALE',
    price: 14,
    sizes: ['M', 'L', 'XL'],
    image: '/img/tshirt/women/design_2.jpg',
    best_seller: false,
    new_release: true,
    on_sale: 10
  },
  {
    id: 7,
    category: 'Women',
    name: 'Women Basic T-Shirt - RETRO',
    price: 10,
    sizes: ['M', 'L', 'XL'],
    image: '/img/tshirt/women/design_3.jpg',
    best_seller: true,
    new_release: false,
    on_sale: false
  },
  {
    id: 8,
    category: 'Women',
    name: 'Women Basic T-Shirt - girls',
    price: 12,
    sizes: ['M', 'L', 'XL'],
    image: '/img/tshirt/women/design_4.jpg',
    best_seller: false,
    new_release: false,
    on_sale: 15
  },
]

const promoCodes = [{
  code: 'ZEE24',
  percentage: 24
}]

const products = productsSample.map((item) => {
  return {
    ...item,
    slug: slugify(item.name)
  }
})

export {
  products,
  promoCodes
}