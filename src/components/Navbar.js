import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">🛍 My Store</Link>
      <Link to="/tambah" className="tombol-tambah">+ Add Product</Link>
    </nav>
  );
}
