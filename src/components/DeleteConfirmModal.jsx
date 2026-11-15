import { formatRupiah } from '../data/initialProducts';

function DeleteConfirmModal({ isOpen, product, onClose, onConfirm }) {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card modal-delete-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-delete-top">
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup"
          >
            &times;
          </button>
        </div>

        <div className="delete-icon-box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#dc2626"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </div>

        <h2 className="modal-title modal-delete-title">Hapus Produk?</h2>
        <p className="modal-subtitle modal-delete-subtitle">
          Produk yang dihapus tidak dapat dikembalikan.
        </p>

        <div className="delete-product-preview">
          <span className="product-id">ID: {product.id}</span>
          <h3 className="delete-preview-name">{product.name}</h3>
          <p className="delete-preview-price">{formatRupiah(product.price)}</p>
        </div>

        <div className="modal-actions modal-delete-actions">
          <button
            type="button"
            className="btn-outline-blue modal-btn-cancel"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            type="button"
            className="btn-danger-red modal-btn-delete"
            onClick={() => onConfirm(product.id)}
          >
            Hapus Produk
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
