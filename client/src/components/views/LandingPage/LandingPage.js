import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
const moment = require('moment');

function LandingPage() {
  const [Video, setVideo] = useState([]);

  useEffect(() => {
    axios.get('/api/video/getVideo').then((response) => {
      if (response.data.success) {
        setVideo(response.data.videos);
        console.log(response.data)
      } else {
        alert('Video import failed.');
      }
    });
  }, []); // Executes only once when the DOM is updated

  const renderCards = Video.map((video, i) => {
    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor(video.duration - minutes * 60);

    return (
      <VideoCard key={i}>
        <ThumbnailContainer>
          <a href={`/video/${video._id}`}>
            <ThumbnailImage
              src={`http://localhost:8080/${video.thumbnail}`}
              alt="thumbnail photo"
            />
            <Duration>
              <span>
                {minutes} : {seconds}
              </span>
            </Duration>
          </a>
        </ThumbnailContainer>

        <VideoInfoContainer>
          <ProfileImage src={video.writer.image} alt="Profile picture" />
          <VideoInfo>
            <p>{video.title}</p>
            <span>{video.writer.name}</span>
            <span>
              {video.views} views
              <span>-</span>
              {moment(video.createAt).format('MMM Do YY')}
            </span>
          </VideoInfo>
        </VideoInfoContainer>
      </VideoCard>
    );
  });

  return (
    <Container>
      <Title>Recommended</Title>
      <VideoList>{renderCards}</VideoList>
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  min-height: 100vh;
  margin: 0 auto;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 2rem;
`;
const VideoList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const ThumbnailContainer = styled.div`
  position: relative;
`;
const ThumbnailImage = styled.img`
  width: 100%;
  border-radius: 0.75rem;
`;
const Duration = styled.div`
  bottom: 0.5rem;
  left: 0.5rem;
  position: absolute;
  margin: 4px;
  color: #fff;
  opacity: 0.8;
  padding: 2px 4px;
  border-radius: 2px;
  letter-spacing: 0.5px;
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
`;
const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  background-color: black;
  border-radius: 50%;
`;
const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  p {
    font-size: 16px;
    margin: 0.5rem 0;
  }

  span {
    font-size: 14px;
    opacity: 0.7;
  }
`;
const VideoInfoContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const VideoCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 3rem;
`;

export default LandingPage;
