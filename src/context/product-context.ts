import { createContext, useContext } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { Product, ProductValues, ViewMode } from "../types/product"

export interface ProductContextValue {
    products: Product[]
    setProducts: Dispatch<SetStateAction<Product[]>>
    viewMode: ViewMode
    setViewMode: Dispatch<SetStateAction<ViewMode>>
    addProduct: (values: ProductValues) => Product
    updateProduct: (id: number, values: ProductValues) => void
    deleteProduct: (id: number) => void
}

export const ProductContext = createContext<ProductContextValue | null>(null)

export function useProductContext(): ProductContextValue {
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error(
            "useProductContext harus digunakan di dalam ProductProvider",
        )
    }
    return context
}
