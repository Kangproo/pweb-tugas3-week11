import { Link } from "react-router"
import { TbArrowLeft, TbLayoutGrid, TbList } from "react-icons/tb"
import { useProductContext } from "../../../context/product-context"
import styles from "./styles.module.css"

export default function SettingsPage() {
    const { viewMode, setViewMode } = useProductContext()

    return (
        <section aria-labelledby="settings-heading">
            <header className={styles.header}>
                <p className={styles.eyebrow}>Preferensi Aplikasi</p>
                <h1 id="settings-heading" className={styles.title}>
                    Pengaturan Tampilan
                </h1>
                <p className={styles.description}>
                    Pilih tata letak daftar produk yang ditampilkan pada halaman
                    Manajemen Produk.
                </p>
            </header>

            <div className={styles.card}>
                <h2 className={styles.sectionTitle}>Tata Letak Produk</h2>
                <p className={styles.sectionHint}>
                    Ubah tampilan daftar produk antara mode Grid (kotak) atau
                    mode List (baris).
                </p>

                <div className={styles.optionsGrid}>
                    <button
                        type="button"
                        aria-pressed={viewMode === "grid"}
                        className={`${styles.optionBtn} ${viewMode === "grid" ? styles.optionBtnActive : ""}`}
                        onClick={() => setViewMode("grid")}
                    >
                        <span
                            className={`${styles.optionIcon} ${viewMode === "grid" ? styles.optionIconActive : ""}`}
                        >
                            <TbLayoutGrid size={20} aria-hidden="true" />
                        </span>
                        <span className={styles.optionLabel}>
                            Tampilan Grid
                        </span>
                        <span className={styles.optionDesc}>
                            Menampilkan produk dalam kartu berjajar 3 kolom.
                        </span>
                    </button>

                    <button
                        type="button"
                        aria-pressed={viewMode === "list"}
                        className={`${styles.optionBtn} ${viewMode === "list" ? styles.optionBtnActive : ""}`}
                        onClick={() => setViewMode("list")}
                    >
                        <span
                            className={`${styles.optionIcon} ${viewMode === "list" ? styles.optionIconActive : ""}`}
                        >
                            <TbList size={20} aria-hidden="true" />
                        </span>
                        <span className={styles.optionLabel}>
                            Tampilan List
                        </span>
                        <span className={styles.optionDesc}>
                            Menampilkan produk dalam daftar baris memanjang ke
                            bawah.
                        </span>
                    </button>
                </div>

                <div className={styles.statusBox}>
                    <p role="status">
                        Mode aktif saat ini:{" "}
                        <strong>
                            {viewMode === "list" ? "List" : "Grid"}
                        </strong>
                    </p>
                    <Link to="/products" className={styles.backLink}>
                        <TbArrowLeft aria-hidden="true" />
                        <span>Kembali ke Daftar Produk</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}
