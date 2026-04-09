import React from 'react';

export default function KartuProduk({ produk, onEdit, onHapus }) {
  const bintang = '★'.repeat(Math.round(produk.rating || 0));

  return (
    <div className="kartu">
      <div className="gambar-wrap">
        <img
          src={produk.thumbnail || produk.image}
          alt={produk.title}
          onError={e => { e.target.src = 'https://via.placeholder.com/150'; }}
        />
      </div>
      <div className="isi">
        <div className="kategori">{produk.category}</div>
        <div className="nama">{produk.title}</div>
        <div className="harga">${Number(produk.price).toFixed(2)}</div>
        <div className="rating">
          <span>{bintang}</span> {produk.rating} ({produk.stock ?? 0} stok)
        </div>
      </div>
      <div className="tombol-aksi">
        <button className="tombol-edit" onClick={() => onEdit(produk)}>Edit</button>
        <button className="tombol-hapus" onClick={() => onHapus(produk)}>Hapus</button>
      </div>
    </div>
  );
}
