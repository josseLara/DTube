import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function SideVideo() {
  const [sideVideos, setSideVideos] = useState([]);

  useEffect(() => {
    axios.get('/api/video/getVideo').then((response) => {
      if (response.data.success) {
        setSideVideos(response.data.videos);
      } else {
        alert('Video import failed.');
      }
    });
  }, []);

  const renderSideVideo = sideVideos.map((video) => {
    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Container key={video._id} className='side-card'>
        <LeftSection className='side-left-section'>
          <a href={`/video/${video._id}`}>
            <Thumbnail
              src={`http://localhost:8080/${video.thumbnail}`}
              alt="thumbnail"
            />
          </a>
        </LeftSection>

        <RightSection>
          <VideoLink href="">
            <VideoTitle>{video.title}</VideoTitle>
            <VideoWriterName>{video.writer.name}</VideoWriterName>
            <VideoViews>{video.views} views</VideoViews>
            <Time>
              {minutes} : {seconds}
            </Time>
          </VideoLink>
        </RightSection>
      </Container>
    );
  });

  return <React.Fragment>{renderSideVideo}</React.Fragment>;
}

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  gap: 0.5rem;
`;
const LeftSection = styled.div`
  width: 40%;
`;
const RightSection = styled.div`
  width: 60%;
`;
const Thumbnail = styled.img`
  background-color: black;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
`;
const VideoLink = styled.a`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #000;
  line-height: 1.2rem;
`;
const VideoTitle = styled.span`
  font-size: 16px;
  line-height: 2rem;
  font-weight: 500;
`;
const VideoWriterName = styled.span`
  font-size: 14px;
  opacity: 0.5;
`;
const VideoViews = styled.span`
  font-size: 14px;
  opacity: 0.5;
`;
const Time = styled.span`
  font-size: 14px;
  opacity: 0.5;
`;

export default SideVideo;
