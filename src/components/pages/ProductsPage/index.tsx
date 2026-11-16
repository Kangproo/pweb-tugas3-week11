import { useState } from "react"
import { TbPlus, TbRefresh } from "react-icons/tb"
import Button from "../../atoms/Button"
import SearchBar from "../../molecules/SearchBar"
import ProductFormModal from "../../molecules/ProductFormModal"
import DeleteConfirmModal from "../../molecules/DeleteConfirmModal"
import ProductGrid from "../../organisms/ProductGrid"
import ProductRemote from "../../../data/product/source/product-remote"
import ProductRepository from "../../../data/product/repository/product-repository"
import { useProductContext } from "../../../context/product-context"
import type { Product, ProductValues } from "../../../types/product"
import styles from "./styles.module.css"

const repository = ProductRepository(
    ProductRemote({ baseUrl: import.meta.env.VITE_API_BASE_URL ?? "" }),
)

export default function ProductsPage() {
    const {
        products,
        setProducts,
        viewMode,
        addProduct,
        updateProduct,
        deleteProduct,
    } = useProductContext()

    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [activeModal, setActiveModal] = useState<
        "add" | "edit" | "delete" | null
    >(null)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const filteredProducts = products.filter((product) =>
        product.name
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase()),
    )

    async function handleLoadProducts() {
        setIsLoading(true)
        setError("")
        setMessage("Memuat produk…")
        try {
            const models = await repository.getProductList()
            setProducts(models.map((model) => model.toJSON()))
            setMessage(`${models.length} produk berhasil dimuat dari API.`)
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Gagal memuat produk.",
            )
            setMessage("")
        } finally {
            setIsLoading(false)
        }
    }

    function handleOpenAdd() {
        setSelectedProduct(null)
        setActiveModal("add")
    }

    function handleOpenEdit(product: Product) {
        setSelectedProduct(product)
        setActiveModal("edit")
    }

    function handleOpenDelete(product: Product) {
        setSelectedProduct(product)
        setActiveModal("delete")
    }

    function handleCloseModal() {
        setActiveModal(null)
        setSelectedProduct(null)
    }

    function handleSaveProduct(values: ProductValues) {
        if (activeModal === "edit" && selectedProduct) {
            updateProduct(selectedProduct.id, values)
            setMessage(`Produk "${values.name}" berhasil diperbarui.`)
        } else {
            const created = addProduct(values)
            setMessage(`Produk "${created.name}" berhasil ditambahkan.`)
        }
        handleCloseModal()
    }

    function handleConfirmDelete(id: number) {
        const deletedName = selectedProduct?.name ?? "Produk"
        deleteProduct(id)
        setMessage(`Produk "${deletedName}" berhasil dihapus.`)
        handleCloseModal()
    }

    return (
        <>
            <header className={styles.header}>
                <div>
                    <p className={styles.eyebrow}>Manajemen Inventori</p>
                    <h1 className={styles.title}>Manajemen Produk</h1>
                    <p className={styles.description}>
                        Kelola daftar produk dan harga dalam satu tempat.
                    </p>
                </div>
                <div className={styles.headerActions}>
                    {import.meta.env.VITE_API_BASE_URL && (
                        <Button
                            variant="secondary"
                            onClick={handleLoadProducts}
                            disabled={isLoading}
                        >
                            <TbRefresh aria-hidden="true" />
                            <span>
                                {isLoading ? "Memuat…" : "Muat dari API"}
                            </span>
                        </Button>
                    )}
                    <Button variant="primary" onClick={handleOpenAdd}>
                        <TbPlus aria-hidden="true" />
                        <span>Tambah Produk</span>
                    </Button>
                </div>
            </header>

            <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                count={filteredProducts.length}
                viewMode={viewMode}
            />

            {error && (
                <p role="alert" className={styles.error}>
                    {error}
                </p>
            )}

            <section aria-label="Daftar produk" aria-busy={isLoading}>
                {filteredProducts.length === 0 ? (
                    <div className={styles.emptyState}>
                        Tidak ada produk yang cocok dengan pencarian.
                    </div>
                ) : (
                    <ProductGrid
                        products={filteredProducts}
                        viewMode={viewMode}
                        onEdit={handleOpenEdit}
                        onDelete={handleOpenDelete}
                    />
                )}
            </section>

            <div className={styles.footerBar}>
                <p>
                    Menampilkan {filteredProducts.length} dari {products.length}{" "}
                    produk
                </p>
                {message && (
                    <p role="status" className={styles.statusText}>
                        {message}
                    </p>
                )}
            </div>

            <ProductFormModal
                isOpen={activeModal === "add" || activeModal === "edit"}
                mode={activeModal === "edit" ? "edit" : "add"}
                product={selectedProduct}
                onClose={handleCloseModal}
                onSave={handleSaveProduct}
            />

            <DeleteConfirmModal
                isOpen={activeModal === "delete"}
                product={selectedProduct}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
        </>
    )
}
