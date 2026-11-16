import { useState } from "react"
import type { ReactNode } from "react"
import { initialProducts } from "../data/product/initial-products"
import type { Product, ProductValues, ViewMode } from "../types/product"
import { ProductContext } from "./product-context"

type Props = {
    children: ReactNode
}

export default function ProductProvider({ children }: Props) {
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [viewMode, setViewMode] = useState<ViewMode>("grid")

    function addProduct(values: ProductValues): Product {
        const nextId =
            products.length > 0
                ? Math.max(...products.map((item) => item.id)) + 1
                : 1
        const newProduct: Product = {
            id: nextId,
            name: values.name.trim(),
            price: values.price,
        }
        setProducts((prev) => [...prev, newProduct])
        return newProduct
    }

    function updateProduct(id: number, values: ProductValues) {
        setProducts((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, name: values.name.trim(), price: values.price }
                    : item,
            ),
        )
    }

    function deleteProduct(id: number) {
        setProducts((prev) => prev.filter((item) => item.id !== id))
    }

    return (
        <ProductContext.Provider
            value={{
                products,
                setProducts,
                viewMode,
                setViewMode,
                addProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}
