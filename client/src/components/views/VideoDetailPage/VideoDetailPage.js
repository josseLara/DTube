import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function VideoDetailPage() {
  const videoId = useParams().videoId; // get video id from url
  const videoVariable = { videoId: videoId }; // You have to send it in json format so that it can be properly received from the server

  const [VideoDetail, setVideoDetail] = useState([]);
  const [Comments, setComments] = useState([]);

  useEffect(() => {
   // send the id to get the corresponding video information
    axios.post('/api/video/getVideoDetail', videoVariable).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.videoDetail);
      } else {
        alert('Failed to get information into video.');
      }
    });
  }, []);

  // Because it is rendered before calling VideoDetail.writer.image, if there is a writer, it is rendered
  if (VideoDetail && VideoDetail.writer) {
// A function that makes the subscribe button visible only when the user's ID and the video creator's ID are different
    const subscribeButton = VideoDetail.writer._id !==
      localStorage.getItem('userId') && (
      <Subscribe
        userTo={VideoDetail.writer._id}
        userFrom={localStorage.getItem('userId')}
      />
    );

    return (
      <Container>
        <MainSection className="main-section sections">
          {/* Video Section */}
          <VideoScreen
            src={`http://localhost:8080/${VideoDetail.filePath}`}
            controls
          />

          <VideoTitle>{VideoDetail.title}</VideoTitle>
          <UserInfo>
            <UserImage src={VideoDetail.writer.image} alt="author image" />
            <div>
              <UserName>{VideoDetail.writer.name}</UserName>
              <SubscribeNumber>0 subscribers</SubscribeNumber>
            </div>
            {subscribeButton}
          </UserInfo>
          <VideoDescription>{VideoDetail.description}</VideoDescription>

          {/* Side Video Section */}
          <SideSection className="main-side-section sections">
            <SideVideo />
          </SideSection>

          {/* Comment Section */}
          <Comment
            commentLists={Comments}
            videoId={videoId}
            refreshFunction={refreshFunction}
          />
        </MainSection>
        <SideSection className="side-section sections">
          <SideVideo />
        </SideSection>
      </Container>
    );
  } else {
    return <div>loading...</div>;
  }
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  gap: 1.4rem;

  @media (min-width: 481px) and (max-width: 1024px) {
    flex-direction: column;
    gap: 3rem;

    .sections {
      width: 100%;
    }

    .main-section {
      .main-side-section {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 2rem;

        .side-left-section {
          width: auto;
          height: 100%;
        }
      }
    }

    .side-section {
      display: none;
    }
  }
`;
const MainSection = styled.section`
  width: 70%;

  .main-side-section {
    display: none;
  }
`;
const SideSection = styled.section`
  width: 27%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const VideoScreen = styled.video`
  width: 100%;
`;
const VideoTitle = styled.h2`
  font-size: 20px;
  margin-top: 0.5rem;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;
const VideoDescription = styled.div`
  background-color: #f2f2f2;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  border-radius: 0.75rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;
const UserName = styled.p`
  font-size: 16px;
  font-weight: 700;
`;
const SubscribeNumber = styled.p`
  opacity: 0.7;
  font-size: 12px;
`;
const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
  background-color: #000;
`;

export default VideoDetailPage;
