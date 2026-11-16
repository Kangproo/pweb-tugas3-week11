import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { TbArrowLeft, TbPackage } from "react-icons/tb"
import Button from "../../atoms/Button"
import ProductFormModal from "../../molecules/ProductFormModal"
import DeleteConfirmModal from "../../molecules/DeleteConfirmModal"
import { useProductContext } from "../../../context/product-context"
import { formatRupiah } from "../../../utils/formatRupiah"
import type { ProductValues } from "../../../types/product"
import styles from "./styles.module.css"

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { products, updateProduct, deleteProduct } = useProductContext()

    const [activeModal, setActiveModal] = useState<"edit" | "delete" | null>(
        null,
    )

    const numericId = Number(id)
    const product = Number.isInteger(numericId)
        ? products.find((item) => item.id === numericId)
        : undefined

    if (!product) {
        return (
            <section aria-labelledby="detail-not-found-title">
                <div className={styles.backRow}>
                    <Link to="/products" className={styles.backLink}>
                        <TbArrowLeft aria-hidden="true" />
                        <span>Kembali ke Daftar Produk</span>
                    </Link>
                </div>
                <div className={styles.notFoundCard}>
                    <h1
                        id="detail-not-found-title"
                        className={styles.notFoundTitle}
                    >
                        Produk Tidak Ditemukan
                    </h1>
                    <p className={styles.notFoundText}>
                        Data produk dengan ID <strong>{id}</strong> tidak
                        ditemukan atau telah dihapus dari daftar.
                    </p>
                    <Link to="/products" className={styles.primaryLink}>
                        <TbArrowLeft aria-hidden="true" />
                        <span>Kembali ke Daftar Produk</span>
                    </Link>
                </div>
            </section>
        )
    }

    function handleSaveEdit(values: ProductValues) {
        if (!product) return
        updateProduct(product.id, values)
        setActiveModal(null)
    }

    function handleConfirmDelete(productId: number) {
        deleteProduct(productId)
        setActiveModal(null)
        navigate("/products")
    }

    return (
        <section aria-labelledby="product-detail-heading">
            <div className={styles.backRow}>
                <Link to="/products" className={styles.backLink}>
                    <TbArrowLeft aria-hidden="true" />
                    <span>Kembali ke Daftar Produk</span>
                </Link>
            </div>

            <article className={styles.card}>
                <div className={styles.cardHeader}>
                    <span className={styles.badge}>ID: {product.id}</span>
                    <div className={styles.iconCircle}>
                        <TbPackage size={22} aria-hidden="true" />
                    </div>
                </div>

                <div className={styles.body}>
                    <p className={styles.label}>Detail Informasi Produk</p>
                    <h1 id="product-detail-heading" className={styles.name}>
                        {product.name}
                    </h1>
                    <p className={styles.price}>
                        {formatRupiah(product.price)}
                    </p>

                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoKey}>ID Produk</span>
                            <span className={styles.infoValue}>
                                {product.id}
                            </span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoKey}>Nama Produk</span>
                            <span className={styles.infoValue}>
                                {product.name}
                            </span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoKey}>
                                Harga Satuan
                            </span>
                            <span className={styles.infoValue}>
                                {formatRupiah(product.price)}
                            </span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoKey}>
                                Harga Numerik
                            </span>
                            <span className={styles.infoValue}>
                                Rp {product.price}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Link to="/products" className={styles.backLink}>
                        <TbArrowLeft aria-hidden="true" />
                        <span>Kembali</span>
                    </Link>
                    <div className={styles.actionGroup}>
                        <Button
                            variant="secondary"
                            onClick={() => setActiveModal("edit")}
                        >
                            Edit Produk
                        </Button>
                        <Button
                            variant="subtleDanger"
                            onClick={() => setActiveModal("delete")}
                        >
                            Hapus Produk
                        </Button>
                    </div>
                </div>
            </article>

            <ProductFormModal
                isOpen={activeModal === "edit"}
                mode="edit"
                product={product}
                onClose={() => setActiveModal(null)}
                onSave={handleSaveEdit}
            />

            <DeleteConfirmModal
                isOpen={activeModal === "delete"}
                product={product}
                onClose={() => setActiveModal(null)}
                onConfirm={handleConfirmDelete}
            />
        </section>
    )
}
