import { useState } from "react"
import type { FormEvent } from "react"
import type { Product, ProductValues } from "../../../types/product"
import Button from "../../atoms/Button"
import styles from "./styles.module.css"

type Props = {
    isOpen: boolean
    mode: "add" | "edit"
    product: Product | null
    onClose: () => void
    onSave: (values: ProductValues) => void
}

type FormBodyProps = Omit<Props, "isOpen">

function ProductFormDialog({ mode, product, onClose, onSave }: FormBodyProps) {
    const isEdit = mode === "edit"
    const [name, setName] = useState(isEdit && product ? product.name : "")
    const [price, setPrice] = useState(
        isEdit && product ? String(product.price) : "",
    )
    const [error, setError] = useState("")

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const trimmedName = name.trim()
        const numericPrice = Number(price)

        if (!trimmedName) {
            setError("Nama produk wajib diisi.")
            return
        }

        if (
            !price ||
            !Number.isInteger(numericPrice) ||
            numericPrice <= 0
        ) {
            setError("Harga harus lebih dari 0.")
            return
        }

        onSave({
            name: trimmedName,
            price: numericPrice,
        })
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-form-title"
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.header}>
                    <h2 id="modal-form-title" className={styles.title}>
                        {isEdit ? "Edit Produk" : "Tambah Produk"}
                    </h2>
                    <button
                        type="button"
                        className={styles.closeBtn}
                        onClick={onClose}
                        aria-label="Tutup"
                    >
                        &times;
                    </button>
                </div>

                <p className={styles.subtitle}>
                    {isEdit
                        ? "Perbarui informasi produk yang dipilih."
                        : "Masukkan informasi produk baru."}
                </p>

                {isEdit && product && (
                    <span className={styles.productId}>ID: {product.id}</span>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="product-name" className={styles.label}>
                            Nama Produk
                        </label>
                        <input
                            id="product-name"
                            type="text"
                            className={styles.input}
                            placeholder="Contoh: Pulpen"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                if (error) setError("")
                            }}
                            autoFocus
                        />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="product-price" className={styles.label}>
                            Harga (Rp)
                        </label>
                        <input
                            id="product-price"
                            type="number"
                            className={styles.input}
                            placeholder="Contoh: 5000"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value)
                                if (error) setError("")
                            }}
                        />
                        <span
                            className={
                                error ? styles.helperError : styles.helper
                            }
                        >
                            {error || "Harga harus lebih dari 0."}
                        </span>
                    </div>

                    <div className={styles.actions}>
                        <Button
                            variant="secondary"
                            className={styles.cancelBtn}
                            onClick={onClose}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className={styles.submitBtn}
                        >
                            {isEdit ? "Simpan Perubahan" : "Simpan Produk"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default function ProductFormModal({
    isOpen,
    mode,
    product,
    onClose,
    onSave,
}: Props) {
    if (!isOpen) return null

    return (
        <ProductFormDialog
            key={`${mode}-${product?.id ?? "new"}`}
            mode={mode}
            product={product}
            onClose={onClose}
            onSave={onSave}
        />
    )
}
