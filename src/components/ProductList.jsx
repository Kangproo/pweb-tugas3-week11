import ProductCard from './ProductCard';

function ProductList({ products, totalCount, onEdit, onDelete }) {
  return (
    <div className="product-list-section">
      {products.length === 0 ? (
        <div className="empty-state">
          Tidak ada produk yang ditemukan.
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
      <p className="product-footer-count">
        Menampilkan {products.length} dari {totalCount} produk
      </p>
    </div>
  );
}

export default ProductList;
