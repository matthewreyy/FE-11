import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DaftarProduk from './pages/DaftarProduk';
import FormProduk from './pages/FormProduk';

export default function App() {
  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifikasi, setNotifikasi] = useState(null);

  const ambilProduk = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://dummyjson.com/products?limit=100');
      const data = await res.json();
      setProdukList(data.products);
    } catch {
      tampilNotifikasi('Failed to load products', 'gagal');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { ambilProduk(); }, []);

  const tampilNotifikasi = (pesan, tipe = 'sukses') => {
    setNotifikasi({ pesan, tipe });
    setTimeout(() => setNotifikasi(null), 3000);
  };

  const tambahProduk = async (data) => {
    await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const produkBaru = { ...data, id: Date.now(), rating: 4.0, stock: 0 };
    setProdukList(prev => [produkBaru, ...prev]);
    tampilNotifikasi('Product added successfully!');
  };

  const editProduk = async (id, data) => {
    await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setProdukList(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    tampilNotifikasi('Product updated successfully!');
  };

  const hapusProduk = async (id) => {
    await fetch(`https://dummyjson.com/products/${id}`, { method: 'DELETE' });
    setProdukList(prev => prev.filter(p => p.id !== id));
    tampilNotifikasi('Product deleted successfully!');
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <DaftarProduk
              produkList={produkList}
              loading={loading}
              onHapus={hapusProduk}
              onRefresh={ambilProduk}
            />
          }
        />
        <Route
          path="/tambah"
          element={<FormProduk onSimpan={tambahProduk} />}
        />
        <Route
          path="/edit/:id"
          element={<FormProduk onSimpan={editProduk} produkList={produkList} />}
        />
      </Routes>

      {notifikasi && (
        <div className={`notifikasi ${notifikasi.tipe}`}>
          {notifikasi.pesan}
        </div>
      )}
    </>
  );
}
