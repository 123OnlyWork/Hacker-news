import React from 'react';
import { observer } from 'mobx-react';
import { List } from 'antd';
import NewsItem from './NewsItem';
import newsStore from '../store/NewsStore';

const NewsList: React.FC = observer(() => (
  <List
    dataSource={newsStore.news}
    renderItem={(item: any) => <NewsItem key={item.id} item={item} />}
    loading={newsStore.isLoading}
  />
));

export default NewsList;
