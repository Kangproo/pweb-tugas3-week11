import { Link } from "react-router"
import { TbPackage } from "react-icons/tb"
import type { Product, ViewMode } from "../../../types/product"
import Button from "../../atoms/Button"
import { formatRupiah } from "../../../utils/formatRupiah"
import styles from "./styles.module.css"

type Props = {
    product: Product
    viewMode?: ViewMode
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
}

export default function ProductCard({
    product,
    viewMode = "grid",
    onEdit,
    onDelete,
}: Props) {
    const isList = viewMode === "list"

    return (
        <article className={isList ? styles.cardList : styles.card}>
            <div>
                <div className={isList ? styles.headerList : styles.header}>
                    <span className={styles.id}>ID: {product.id}</span>
                    <TbPackage className={styles.icon} aria-hidden="true" />
                </div>
                <h2 className={styles.name}>
                    <Link
                        to={`/products/${product.id}`}
                        className={styles.nameLink}
                    >
                        {product.name}
                    </Link>
                </h2>
                <p className={isList ? styles.priceList : styles.price}>
                    {formatRupiah(product.price)}
                </p>
            </div>
            <div className={isList ? styles.actionsList : styles.actions}>
                <Link
                    to={`/products/${product.id}`}
                    className={styles.detailLink}
                >
                    Lihat
                </Link>
                <Button
                    variant="secondary"
                    className={styles.actionBtn}
                    onClick={() => onEdit(product)}
                >
                    Edit
                </Button>
                <Button
                    variant="subtleDanger"
                    className={styles.actionBtn}
                    onClick={() => onDelete(product)}
                >
                    Hapus
                </Button>
            </div>
        </article>
    )
}
