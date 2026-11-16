import { Link, NavLink, Outlet } from "react-router"
import { TbBox, TbSettings } from "react-icons/tb"
import ProductProvider from "../../../context/ProductProvider"
import styles from "./styles.module.css"

export default function PageLayout() {
    return (
        <ProductProvider>
            <div className={styles.wrapper}>
                <header className={styles.navbar}>
                    <div className={styles.navInner}>
                        <Link to="/products" className={styles.brand}>
                            <span className={styles.brandBadge}>MP</span>
                            <span>Manajemen Produk</span>
                        </Link>
                        <nav
                            aria-label="Navigasi utama"
                            className={styles.navLinks}
                        >
                            <NavLink
                                to="/products"
                                className={({ isActive }) =>
                                    `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                                }
                            >
                                <TbBox aria-hidden="true" />
                                <span>Produk</span>
                            </NavLink>
                            <NavLink
                                to="/settings"
                                className={({ isActive }) =>
                                    `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                                }
                            >
                                <TbSettings aria-hidden="true" />
                                <span>Settings</span>
                            </NavLink>
                        </nav>
                    </div>
                </header>
                <main className={styles.container}>
                    <Outlet />
                </main>
            </div>
        </ProductProvider>
    )
}
