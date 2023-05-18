import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

function SingleComment(props) {
  const user = useSelector((state) => state.user); // get user.userData from redux store

  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState('');

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.CommentValue);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const commentVariables = {
      content: CommentValue,
      writer: user.userData._id,
      videoId: props.videoId,
      responseTo: props.comment._id,
    };

   // Put comment author, comment content, etc. into DB
    axios
      .post('/api/comment/saveComment', commentVariables)
      .then((response) => {
        if (response.data.success) {
          props.refreshFunction(response.data.newCommentData);
          setCommentValue('');
        } else {
          alert('Failed to write comment.');
        }
      });
  };

  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      reply
    </span>,
  ];

  return (
    <Container>
      <ReplyContainer>
        <UserImageContainer
          src={props.comment.writer.image}
          alt="author image"
        />
        <ReplyContents>
          <UserName>{props.comment.writer.name}</UserName>
          <CommentContent>{props.comment.content}</CommentContent>
          <Actions>{actions}</Actions>
          {OpenReply && (
            <SingleCommentForm action="" onSubmit={onSubmit}>
              <MainComment>
                <SmUserImageContainer>
                  <img src="" />
                </SmUserImageContainer>
                <CommentTextarea
                  name=""
                  id=""
                  cols="30"
                  rows="1"
                  placeholder="Add a comment..."
                  value={CommentValue}
                  onChange={onHandleChange}
                />
                <SubmitButton onClick={onSubmit}>comment</SubmitButton>
              </MainComment>
            </SingleCommentForm>
          )}
        </ReplyContents>
      </ReplyContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const ReplyContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;
const ReplyContents = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const SingleCommentForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const MainComment = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const UserImageContainer = styled.div`
  background-color: black;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  img {
    width: 100%;
  }
`;
const SmUserImageContainer = styled.div`
  background-color: black;
  width: 20px;
  height: 20px;
  border-radius: 50%;

  img {
    width: 100%;
  }
`;
const CommentTextarea = styled.textarea`
  height: 25px;
  flex: 1;
  resize: none;
  border: none;
  outline: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 4px;
  font-family: 'Roboto', 'Arial', sans-serif;
  transition: all 0.3s;

  &:focus {
    border-color: #000;
  }
`;
const SubmitButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 0 16px;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  border-radius: 18px;
  text-transform: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  cursor: pointer;
`;
const UserName = styled.p`
  font-size: 13px;
`;
const CommentContent = styled.p`
  font-size: 14px;
`;
const Actions = styled.div`
  background-color: transparent;
  font-size: 13px;
  width: 44px;
  height: 32px;
  border-radius: 18px;
  text-transform: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
    color: #000;
  }
`;

export default SingleComment;
