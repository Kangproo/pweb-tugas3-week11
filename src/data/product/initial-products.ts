import ProductModel from "./model/product-model"
import type { Product } from "../../types/product"

const rawInitialProducts: Product[] = [
    { id: 1, name: "Pulpen", price: 5000 },
    { id: 2, name: "Buku Tulis", price: 12000 },
    { id: 3, name: "Spidol", price: 8000 },
    { id: 4, name: "Penggaris", price: 6000 },
    { id: 5, name: "Penghapus", price: 3000 },
]

export const initialProducts: Product[] = rawInitialProducts.map((item) =>
    ProductModel.fromResponse(item).toJSON(),
)
