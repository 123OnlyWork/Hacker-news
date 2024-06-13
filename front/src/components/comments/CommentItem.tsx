import React from 'react';
import { Button } from 'antd';
import './CommentItem.css'; 
import CommentContent from './CommentContent';

interface CommentItemProps {
  comment: any;
  expanded: boolean;
  toggleExpanded: () => void;
  loadNestedComments: () => void;
  level: number; // Уровень вложенности
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, expanded, loadNestedComments, level }) => {
  return (
    <div className={`comment level-${level}`}>
      <div className="Comments">{`${comment.by} | ${new Date(comment.time * 1000).toLocaleString()}`}</div>
      <CommentContent text={comment.text} />
      {comment.kids && comment.kids.length > 0 && (
        <Button onClick={() => loadNestedComments()}>
          {expanded ? 'Свернуть ветку комментариев' : 'Развернуть ветку комментариев'}
        </Button>
      )}
    </div>
  );
};

export default CommentItem;
