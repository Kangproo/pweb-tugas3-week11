import { TbTrash } from "react-icons/tb"
import type { Product } from "../../../types/product"
import { formatRupiah } from "../../../utils/formatRupiah"
import Button from "../../atoms/Button"
import styles from "./styles.module.css"

type Props = {
    isOpen: boolean
    product: Product | null
    onClose: () => void
    onConfirm: (id: number) => void
}

export default function DeleteConfirmModal({
    isOpen,
    product,
    onClose,
    onConfirm,
}: Props) {
    if (!isOpen || !product) return null

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-delete-title"
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.topRow}>
                    <button
                        type="button"
                        className={styles.closeBtn}
                        onClick={onClose}
                        aria-label="Tutup"
                    >
                        &times;
                    </button>
                </div>

                <div className={styles.iconBox}>
                    <TbTrash size={24} aria-hidden="true" />
                </div>

                <h2 id="modal-delete-title" className={styles.title}>
                    Hapus Produk?
                </h2>
                <p className={styles.subtitle}>
                    Produk yang dihapus tidak dapat dikembalikan.
                </p>

                <div className={styles.preview}>
                    <span className={styles.previewId}>ID: {product.id}</span>
                    <h3 className={styles.previewName}>{product.name}</h3>
                    <p className={styles.previewPrice}>
                        {formatRupiah(product.price)}
                    </p>
                </div>

                <div className={styles.actions}>
                    <Button variant="secondary" onClick={onClose}>
                        Batal
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => onConfirm(product.id)}
                    >
                        Hapus Produk
                    </Button>
                </div>
            </div>
        </div>
    )
}
