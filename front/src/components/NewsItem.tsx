import React from 'react';
import { List } from 'antd';

interface NewsItemProps {
  item: any;
}

const NewsItem: React.FC<NewsItemProps> = ({ item }) => {
  if (!item) {
    return null; 
  }

  return (
    <List.Item>
      <List.Item.Meta
        title={<a href={`/news/${item.id}`}>{item.title}</a>}
        description={`${item.by} | ${new Date(item.time * 1000).toLocaleString()} | Оценка: ${item.score}`}
      />
    </List.Item>
  );
};

export default NewsItem;
