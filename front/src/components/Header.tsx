// src/components/Header.tsx
import React from 'react';
import '../styles/Header.css';
import { GlobalOutlined } from '@ant-design/icons';


const Header: React.FC = () => (
  <header className="header">
    <h1>
      Hacker News<GlobalOutlined name=" GlobalOutlined" className =" icon" />
    </h1>
  </header>
);

export default Header;
