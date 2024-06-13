import React from 'react';
import { List } from 'antd';

interface NextCommentItemProps {
  comment: any;
}

const NextCommentItem: React.FC<NextCommentItemProps> = ({ comment }) => {
  return (
    <div className="nested-comment">
      <List.Item>
        <List.Item.Meta
          title={`${comment.by} | ${new Date(comment.time * 1000).toLocaleString()}`}
        />
        <div dangerouslySetInnerHTML={{ __html: comment.text }} />
      </List.Item>
    </div>
  );
};

export default NextCommentItem;
