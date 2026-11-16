import type { Product, ViewMode } from "../../../types/product"
import ProductCard from "../../molecules/ProductCard"
import styles from "./styles.module.css"

type Props = {
    products: Product[]
    viewMode?: ViewMode
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
}

export default function ProductGrid({
    products,
    viewMode = "grid",
    onEdit,
    onDelete,
}: Props) {
    return (
        <div
            data-view-mode={viewMode}
            className={viewMode === "list" ? styles.list : styles.grid}
        >
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}
