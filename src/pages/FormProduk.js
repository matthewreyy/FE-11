import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const CATEGORIES = ['tops', 'womens-dresses', 'womens-shoes', 'mens-shirts', 'mens-shoes', 'womens-bags', 'womens-jewellery', 'sunglasses'];

const emptyForm = { title: '', price: '', category: 'tops', image: '', description: '' };

export default function FormProduk({ onSimpan, produkList }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const productEdit = location.state?.produk || produkList?.find(p => p.id === Number(id));
  const isEdit = !!productEdit;

  const [form, setForm] = useState(
    isEdit
      ? { title: productEdit.title, price: productEdit.price, category: productEdit.category, image: productEdit.thumbnail || productEdit.image || '', description: productEdit.description }
      : emptyForm
  );
  const [error, setError] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (error[field]) setError(prev => { const next = { ...prev }; delete next[field]; return next; });
  };

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = 'Product title is required';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) err.price = 'Price must be greater than 0';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) { setError(err); return; }

    setSaving(true);
    try {
      const payload = {
        title: form.title,
        price: Number(form.price),
        category: form.category,
        thumbnail: form.image || 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        description: form.description,
      };

      if (isEdit) {
        await onSimpan(productEdit.id, payload);
      } else {
        await onSimpan(payload);
      }
      navigate('/');
    } catch {
      alert('Failed to save product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="halaman-form">
      <div className="form-header">
        <h1 className="judul-form">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
        <div className="form-header-actions">
          <button type="button" className="tombol-batal-header" onClick={() => navigate('/')}>Products</button>
          <button type="submit" form="product-form" className="tombol-simpan-header" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </div>

      <form id="product-form" className="form-produk" onSubmit={handleSubmit} noValidate>
        <div className="baris-form">
          <div className="grup-input">
            <label className="label-input">Title <span className="wajib">*</span></label>
            <input
              placeholder="Product title"
              value={form.title}
              onChange={e => handleChange('title', e.target.value)}
              className={error.title ? 'error' : ''}
            />
            {error.title && <span className="pesan-error">{error.title}</span>}
          </div>

          <div className="grup-input">
            <label className="label-input">Price (USD) <span className="wajib">*</span></label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="99.99"
              value={form.price}
              onChange={e => handleChange('price', e.target.value)}
              className={error.price ? 'error' : ''}
            />
            {error.price && <span className="pesan-error">{error.price}</span>}
          </div>
        </div>

        <div className="baris-form">
          <div className="grup-input">
            <label className="label-input">Category <span className="wajib">*</span></label>
            <input
              placeholder="electronics, clothing, etc."
              value={form.category}
              onChange={e => handleChange('category', e.target.value)}
              list="category-list"
            />
            <datalist id="category-list">
              {CATEGORIES.map(c => <option key={c} value={c} />)}
            </datalist>
          </div>

          <div className="grup-input">
            <label className="label-input">Image URL</label>
            <input
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={e => handleChange('image', e.target.value)}
            />
          </div>
        </div>

        <div className="grup-input">
          <label className="label-input">Description</label>
          <textarea
            placeholder="Product description..."
            rows={5}
            value={form.description}
            onChange={e => handleChange('description', e.target.value)}
          />
        </div>

        <div className="aksi-form">
          <button type="submit" className="tombol-simpan" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Product'}
          </button>
          <button type="button" className="tombol-batal" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
