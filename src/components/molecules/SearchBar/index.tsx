import { TbSearch } from "react-icons/tb"
import type { ViewMode } from "../../../types/product"
import styles from "./styles.module.css"

type Props = {
    searchQuery: string
    onSearchChange: (value: string) => void
    count: number
    viewMode: ViewMode
}

export default function SearchBar({
    searchQuery,
    onSearchChange,
    count,
    viewMode,
}: Props) {
    return (
        <div className={styles.toolbar}>
            <div className={styles.searchWrapper}>
                <TbSearch className={styles.searchIcon} aria-hidden="true" />
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Cari nama produk..."
                    aria-label="Cari nama produk"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className={styles.meta}>
                <span className={styles.badge}>
                    Tampilan: {viewMode === "list" ? "List" : "Grid"}
                </span>
                <span>{count} produk</span>
            </div>
        </div>
    )
}
