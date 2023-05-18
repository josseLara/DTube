import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PrivateOptions = [
  { value: 0, label: 'Private' },
  { value: 1, label: 'Public' },
];

const CategoryOptions = [
  { value: 0, label: 'Film & Animation' },
  { value: 1, label: 'Autos & Vehicles' },
  { value: 2, label: 'Music' },
  { value: 3, label: 'Pets & Animals' },
];

function VideoUploadPage() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [VideoTitle, setVideoTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState('Film & Animation');
  const [FilePath, setFilePath] = useState('');
  const [Duration, setDuration] = useState('');
  const [ThumbnailPath, setThumbnailPath] = useState('');

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    // Send the file to the server as soon as the file is dropped
    axios.post('/api/video/uploadfiles', formData, config).then((response) => {
      if (response.data.success) {
        let variable = {
          url: response.data.url,
          fileName: response.data.fileName,
        };

        setFilePath(response.data.url);

        axios.post('/api/video/thumbnail', variable).then((response) => {
          if (response.data.success) {
            setDuration(response.data.fileDuration);
            setThumbnailPath(response.data.url);
          } else {
            alert('Thumbnail creation failed.');
          }
        });
      } else {
        alert('Video upload failed.');
      }
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      title: VideoTitle,
      description: Description,
      privacy: Private,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: ThumbnailPath,
    };

    axios.post('/api/video/uploadVideo', variables).then((response) => {
      if (response.data.success) {
        alert('Uploaded successfully.');

        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        alert('Video upload failed.');
      }
    });
  };

  return (
    <Container>
      <UploadForm onSubmit={onSubmit}>
        <Title>Upload Video</Title>
        <UploadZone>
          {/* drop zone */}
          <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} />
            <AiOutlinePlus className="icon" />
          </DropzoneContainer>

          {/* thumbnail */}
          {ThumbnailPath && (
            <ThumbnailContainer>
              <img
                src={`http://localhost:8080/${ThumbnailPath}`}
                alt="thumbnail"
              />
            </ThumbnailContainer>
          )}
        </UploadZone>

        <InputContainer>
          <label htmlFor="">Title</label>
          <input
            type="text"
            placeholder="Title"
            required="required"
            value={VideoTitle}
            onChange={onTitleChange}
          />
        </InputContainer>

        <InputContainer>
          <label htmlFor="">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="1"
            placeholder="Description"
            required="required"
            value={Description}
            onChange={onDescriptionChange}
          ></textarea>
        </InputContainer>

        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, i) => {
            return (
              <option key={i} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>

        <select onChange={onCategoryChange}>
          {CategoryOptions.map((item, i) => {
            return (
              <option key={i} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>

        <SubmitButton onClick={onSubmit}>Submit</SubmitButton>
      </UploadForm>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 1rem;
`;
const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.5rem;
`;
const UploadZone = styled.div`
  display: flex;
  justify-content: space-around;
`;
const ThumbnailContainer = styled.div`
  width: 320px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;

  img {
    border-radius: 0.75rem;
  }
`;
const DropzoneContainer = styled.div`
  background-color: #1c1c1e;
  width: 320px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  cursor: pointer;

  .icon {
    color: #fff;
    font-size: 30px;
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    display: none;
  }

  textarea,
  input {
    background-color: #e5e5ea;
    background-color: transparent;
    outline: none;
    border: none;
    transition: 0.35s all;
    font-size: 14px;
    font-family: normal;
    padding: 1.5rem 0;
    border-bottom: 1px solid #c7c7cc;

    &:focus {
      border-color: #1c1c1e;
    }

    &:valid {
      border-color: #1c1c1e;
    }
  }

  textarea {
    resize: none;
  }

  input {
    height: 2rem;
  }
`;
const SubmitButton = styled.button`
  background-color: #1c1c1e;
  color: #f2f2f7;
  border: none;
  height: 3rem;
  border-radius: 8px;
  font-weight: 400;
  cursor: pointer;
  margin-top: 2rem;
  font-size: 14px;
`;

export default VideoUploadPage;
