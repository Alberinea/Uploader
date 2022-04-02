import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getFileImage from '../utils/getFileImage';

const File = () => {
  const { name } = useParams();
  const [file, setFile] = useState({});
  const [dimensions, setDimensions] = useState({ width: '', height: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const CSRFtoken = document.head.querySelector(
    'meta[name="csrf-token"]',
  ).content;

  const getData = useRef(null);

  getData.current = async () => {
    const response = await (await fetch(`/api/files/${name}`)).json();

    if (!response.data) {
      navigate('404');
    }

    setFile(response.data);
    setDimensions(JSON.parse(response.data.metadata));
    setIsLoading(false);
  };

  useEffect(async () => {
    await getData.current();
  }, []);

  const onInputChange = (e, property) => {
    const value = e.target.value.replace(/\D/g, '');
    if (!value) return;

    setDimensions({ ...dimensions, [property]: Number(value) });
  };

  const onSubmit = async () => {
    // if (isLoading) return;

    // setIsLoading(true);

    // await fetch(`/api/files`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-CSRF-TOKEN': CSRFtoken,
    //   },
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     metadata: dimensions,
    //     path: file.path_id,
    //   }),
    // });

    // await getData.current();
    // setShowAlert(true);

    const image = new Image(dimensions.width, dimensions.height);
    image.src = getFileImage(file);
    console.log(image);
  };

  const deleteFile = async () => {
    if (isLoading) return;

    setIsLoading(true);

    await fetch(`/api/files`, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': CSRFtoken,
      },
      method: 'DELETE',
      body: JSON.stringify({
        path: file.path_id,
      }),
    });

    navigate('/files');
  };

  return (
    <section className="pt-lg-5 px-lg-5 pt-4 px-2">
      <div className="container text-center">
        {file.isImage === 1 ? (
          <div className="d-flex flex-column justify-content-center">
            <div className="input-group mb-4">
              <span className="input-group-text">Width / Height</span>
              <input
                type="number"
                aria-label="Width"
                className="form-control"
                value={dimensions.width}
                placeholder="Width"
                onInput={(e) => onInputChange(e, 'width')}
                min="1"
              ></input>
              <input
                type="number"
                aria-label="Height"
                className="form-control"
                value={dimensions.height}
                placeholder="Height"
                onInput={(e) => onInputChange(e, 'height')}
                min="1"
              ></input>
              <button onClick={onSubmit} className="btn btn-primary">
                {!isLoading ? 'Resize' : 'Resizing...'}
              </button>
            </div>
          </div>
        ) : null}
        {!isLoading ? (
          <div className="d-flex justify-content-center mb-4">
            <button
              type="button"
              className="btn btn-outline-danger me-4"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
            >
              Delete
            </button>
            <a
              href={getFileImage(file, true)}
              type="button"
              className="btn btn-outline-primary"
              target="_blank"
              rel="noreferrer"
            >
              Download
            </a>
          </div>
        ) : null}
        {showAlert ? (
          <div
            className="alert alert-success alert-dismissible fade show py-2"
            role="alert"
          >
            <strong>Success!</strong> File has been resized.
            <button
              style={{ fontSize: '0.7rem' }}
              type="button"
              className="btn-close pt-2"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setShowAlert(false)}
            ></button>
          </div>
        ) : null}
        {!isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="card">
              <img
                style={{ height: '375px' }}
                src={getFileImage(file)}
                className="card-img-top"
                alt="image"
              ></img>
              <h5 className="card-title pt-2 fs-6 text-truncate px-3 ">
                {file.name}
              </h5>
            </div>
          </div>
        ) : (
          <div className="mt-5 spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>

      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Are you sure you want to delete this file?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-footer row justify-content-center mx-0">
              <button
                type="button"
                className="btn btn-primary col-5"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={deleteFile}
                type="button"
                className="btn btn-danger col-5"
                data-bs-dismiss="modal"
              >
                {!isLoading ? 'Delete' : 'Deleting...'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default File;
