import React from 'react';
import { Layout, Button } from 'antd';
import Header from '../components/Header';
import NewsList from '../components/NewsList';
import newsStore from '../store/NewsStore';
import '../styles/App.css';

const { Content } = Layout;

const HomePage: React.FC = () => (
  <Layout>
    <Header />
    <Content className="news-content">
    <Button onClick={newsStore.fetchNews}>Обновить новости</Button>
      <NewsList />
    </Content>
  </Layout>
);

export default HomePage;
