import { useState, useEffect } from 'react';

function ProductFormModal({ isOpen, mode, product, onClose, onSave }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && product) {
        setName(product.name);
        setPrice(String(product.price));
      } else {
        setName('');
        setPrice('');
      }
      setError('');
    }
  }, [isOpen, mode, product]);

  if (!isOpen) return null;

  const isEdit = mode === 'edit';

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const numericPrice = Number(price);

    if (!trimmedName) {
      setError('Nama produk wajib diisi.');
      return;
    }

    if (!price || isNaN(numericPrice) || numericPrice <= 0) {
      setError('Harga harus lebih dari 0.');
      return;
    }

    onSave({
      id: isEdit && product ? product.id : undefined,
      name: trimmedName,
      price: numericPrice,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEdit ? 'Edit Produk' : 'Tambah Produk'}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup"
          >
            &times;
          </button>
        </div>

        <p className="modal-subtitle">
          {isEdit
            ? 'Perbarui informasi produk yang dipilih.'
            : 'Masukkan informasi produk baru.'}
        </p>

        {isEdit && product && (
          <p className="modal-product-id">ID: {product.id}</p>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="product-name" className="form-label">
              Nama Produk
            </label>
            <input
              id="product-name"
              type="text"
              className="form-input"
              placeholder="Contoh: Pulpen"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-price" className="form-label">
              Harga (Rp)
            </label>
            <input
              id="product-price"
              type="number"
              className="form-input"
              placeholder="Contoh: 5000"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (error) setError('');
              }}
            />
            <span className={`form-helper ${error ? 'form-helper-error' : ''}`}>
              {error || 'Harga harus lebih dari 0.'}
            </span>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-outline-blue modal-btn-cancel"
              onClick={onClose}
            >
              Batal
            </button>
            <button type="submit" className="btn-primary-blue modal-btn-submit">
              {isEdit ? 'Simpan Perubahan' : 'Simpan Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;
