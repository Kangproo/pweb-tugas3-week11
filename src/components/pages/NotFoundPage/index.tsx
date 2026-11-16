import { Link, useLocation } from "react-router"
import { TbArrowLeft } from "react-icons/tb"
import styles from "./styles.module.css"

export default function NotFoundPage() {
    const location = useLocation()

    return (
        <section aria-labelledby="not-found-heading" className={styles.card}>
            <span className={styles.badge}>Error 404</span>
            <h1 id="not-found-heading" className={styles.title}>
                Halaman Tidak Ditemukan
            </h1>
            <p className={styles.description}>
                Halaman dengan alamat{" "}
                <strong>{location.pathname}</strong> tidak tersedia. Silakan
                periksa kembali URL atau kembali ke halaman utama daftar produk.
            </p>
            <Link to="/products" className={styles.backLink}>
                <TbArrowLeft aria-hidden="true" />
                <span>Kembali ke Daftar Produk</span>
            </Link>
        </section>
    )
}
