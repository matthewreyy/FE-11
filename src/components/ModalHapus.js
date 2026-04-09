import React from 'react';

export default function ModalHapus({ produk, onKonfirmasi, onBatal }) {
  if (!produk) return null;

  const name = produk.title.length > 50
    ? produk.title.slice(0, 50) + '…'
    : produk.title;

  return (
    <div className="overlay" onClick={onBatal}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>Delete Product?</h3>
        <p>
          Are you sure you want to delete <strong>"{name}"</strong>?
          This action cannot be undone.
        </p>
        <div className="aksi-modal">
          <button className="tombol-konfirmasi-batal" onClick={onBatal}>Cancel</button>
          <button className="tombol-konfirmasi-hapus" onClick={onKonfirmasi}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
}
