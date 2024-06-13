import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Layout, Typography, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import Header from '../components/Header';
import CommentItem from '../components/comments/CommentItem';

const { Content } = Layout;
const { Link } = Typography;

interface CommentItem {
  id: number;
  by: string;
  text: string;
  time: number;
  kids?: number[];
}

interface NewsItem {
  id: number;
  title: string;
  by: string;
  time: number;
  url: string;
  descendants: number;
  kids?: number[];
}

const CommentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedComments, setExpandedComments] = useState<{ [key: number]: CommentItem[] }>({});
  const [expandedState, setExpandedState] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const newsResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        const newsData: NewsItem = newsResponse.data;
        setNews(newsData);

        if (newsData.kids) {
          const commentsData = await fetchComments(newsData.kids);
          setComments(commentsData);
        }
      } catch (error) {
        console.error("Failed to fetch news details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]); 

  const fetchComments = async (ids: number[]): Promise<CommentItem[]> => {
    const comments = await Promise.all(ids.map(fetchComment));
    return comments;
  };

  const fetchComment = async (id: number): Promise<CommentItem> => {
    const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    return response.data;
  };

  const handleRefreshComments = async () => {
    if (news?.kids) {
      const commentsData = await fetchComments(news.kids);
      setComments(commentsData);
    }
  };

  const handleBackToNews = () => {
    history.push('/');
  };

  const loadNestedComments = async (commentId: number, kids: number[]) => {
    if (expandedState[commentId]) {
      setExpandedState((prevState) => ({
        ...prevState,
        [commentId]: false,
      }));
      setExpandedComments((prevExpanded) => ({
        ...prevExpanded,
        [commentId]: [],
      }));
    } else {
      const nestedComments = await fetchComments(kids);
      setExpandedComments((prevExpanded) => ({
        ...prevExpanded,
        [commentId]: nestedComments,
      }));
      setExpandedState((prevState) => ({
        ...prevState,
        [commentId]: true,
      }));
    }
  };

  const renderComments = (comments: CommentItem[], level: number = 0) => (
    comments.map((comment) => (
      <div key={comment.id} style={{ marginLeft: level * 20 }}>
        <CommentItem
          comment={comment}
          expanded={expandedState[comment.id] || false}
          toggleExpanded={() => loadNestedComments(comment.id, comment.kids || [])}
          loadNestedComments={() => loadNestedComments(comment.id, comment.kids || [])}
          level={level}
        />
        {expandedState[comment.id] && expandedComments[comment.id] && (
          <div className="nested-comments">
            {renderComments(expandedComments[comment.id], level + 1)}
          </div>
        )}
      </div>
    ))
  );

  if (loading || !news) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Header />
      <Content style={{ padding: '10px 20px' }}>
        <Button onClick={handleBackToNews} style={{ marginRight: '20px' }}>
          <LeftOutlined /> Список новостей
        </Button>
        <Button onClick={handleRefreshComments}>
          Обновить комментарии
        </Button>
        <div className="NewsName">
          {news.by} | {new Date(news.time * 1000).toLocaleString()}
        </div>
        <Link href={news.url} target="_blank" rel="noopener noreferrer">
          {news.title}
        </Link>
        {renderComments(comments)}
      </Content>
    </Layout>
  );
};

export default CommentPage;
