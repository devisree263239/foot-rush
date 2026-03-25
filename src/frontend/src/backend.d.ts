import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Sku {
    id: SkuId;
    size: bigint;
    stock: bigint;
}
export interface ShippingAddress {
    street: string;
    country: string;
    city: string;
    postalCode: string;
    name: string;
}
export type Quantity = bigint;
export type SkuId = string;
export type SessionId = string;
export type ProductId = bigint;
export interface CartItem {
    productId: ProductId;
    skuId: SkuId;
    quantity: Quantity;
}
export interface Product {
    id: ProductId;
    name: string;
    description: string;
    sizes: Array<Sku>;
    imageUrl: string;
    category: ProductCategory;
    price: bigint;
}
export enum ProductCategory {
    sandals = "sandals",
    sneakers = "sneakers",
    heels = "heels",
    boots = "boots",
    formal = "formal"
}
export interface backendInterface {
    addProduct(product: Product): Promise<ProductId>;
    addToCart(sessionId: SessionId, cartItem: CartItem): Promise<void>;
    filterProductsByPriceRange(minPrice: bigint, maxPrice: bigint): Promise<Array<Product>>;
    getAllProducts(): Promise<Array<Product>>;
    getProduct(productId: ProductId): Promise<Product>;
    getProductsByCategory(category: ProductCategory): Promise<Array<Product>>;
    placeOrder(user: Principal, sessionId: SessionId, shippingAddress: ShippingAddress): Promise<bigint>;
    removeFromCart(sessionId: SessionId, productId: ProductId, skuId: SkuId): Promise<void>;
}
