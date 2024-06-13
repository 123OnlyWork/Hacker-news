import React from 'react';

interface CommentContentProps {
  text: string;
}

const CommentContent: React.FC<CommentContentProps> = ({ text }) => (
  <div dangerouslySetInnerHTML={{ __html: text }} />
);

export default CommentContent;
