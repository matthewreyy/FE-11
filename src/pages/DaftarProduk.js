import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KartuProduk from "../components/KartuProduk";
import ModalHapus from "../components/ModalHapus";

export default function DaftarProduk({ produkList, loading, onHapus, onRefresh }) {
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await onHapus(productToDelete.id);
    } finally {
      setProductToDelete(null);
    }
  };

  return (
    <div className="halaman">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div>
          <h1 className="judul-halaman">All Products</h1>
          <p className="subjudul">
            {loading ? "Loading..." : `${produkList.length} products found`}
          </p>
        </div>
        <button
          onClick={onRefresh}
          style={{
            padding: "8px 16px",
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "white",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          ↻ Refresh
        </button>
      </div>

      {loading ? (
        <div className="loading-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton" />
          ))}
        </div>
      ) : produkList.length === 0 ? (
        <p className="teks-tengah">No products found.</p>
      ) : (
        <div className="grid-produk">
          {produkList.map((p) => (
            <KartuProduk
              key={p.id}
              produk={p}
              onEdit={() => navigate(`/edit/${p.id}`, { state: { produk: p } })}
              onHapus={setProductToDelete}
            />
          ))}
        </div>
      )}

      <ModalHapus
        produk={productToDelete}
        onKonfirmasi={handleDelete}
        onBatal={() => setProductToDelete(null)}
      />
    </div>
  );
}
