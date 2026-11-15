import { useState } from 'react';
import { initialProducts } from './data/initialProducts';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import ProductFormModal from './components/ProductFormModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import './App.css';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null); // 'add' | 'edit' | 'delete' | null
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const handleOpenAdd = () => {
    setSelectedProduct(null);
    setActiveModal('add');
  };

  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setActiveModal('edit');
  };

  const handleOpenDelete = (product) => {
    setSelectedProduct(product);
    setActiveModal('delete');
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedProduct(null);
  };

  const handleSaveProduct = (productData) => {
    if (activeModal === 'edit' && selectedProduct) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === selectedProduct.id
            ? { ...item, name: productData.name, price: productData.price }
            : item
        )
      );
    } else {
      setProducts((prev) => {
        const nextId =
          prev.length > 0 ? Math.max(...prev.map((item) => item.id)) + 1 : 1;
        return [
          ...prev,
          { id: nextId, name: productData.name, price: productData.price },
        ];
      });
    }
    handleCloseModal();
  };

  const handleConfirmDelete = (productId) => {
    setProducts((prev) => prev.filter((item) => item.id !== productId));
    handleCloseModal();
  };

  return (
    <main className="app-container">
      <header className="page-header">
        <div>
          <h1 className="page-title">Manajemen Produk</h1>
          <p className="page-subtitle">
            Kelola daftar produk dan harga dalam satu tempat.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary-blue"
          onClick={handleOpenAdd}
        >
          + Tambah Produk
        </button>
      </header>

      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        count={filteredProducts.length}
      />

      <ProductList
        products={filteredProducts}
        totalCount={products.length}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      <ProductFormModal
        isOpen={activeModal === 'add' || activeModal === 'edit'}
        mode={activeModal === 'edit' ? 'edit' : 'add'}
        product={selectedProduct}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
      />

      <DeleteConfirmModal
        isOpen={activeModal === 'delete'}
        product={selectedProduct}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}

export default App;
