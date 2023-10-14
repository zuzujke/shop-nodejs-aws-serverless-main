export interface ProductInterface {
    id: string,
    title: string,
    description: string,
    price: number,
    logo: string,
}

export interface ProductInterface {
    title: string,
    description: string,
    price: number,
    logo: string,
}

export interface StockInterface {
  product_id: string,
  count: number,
}

export interface ProductServiceInterface {
    getProductById: (id: string) => Promise<ProductInterface>,
    getStockByProductId: (id: string) => Promise<StockInterface>,
    getAllProducts: () => Promise<ProductInterface[]>,
    create: (product: Omit<ProductInterface, 'id'>) => Promise<ProductInterface>,
}
