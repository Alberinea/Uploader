import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

const Home = () => {
  const [files, setFiles] = useState([]);
  const CSRFtoken = document.head.querySelector(
    'meta[name="csrf-token"]',
  ).content;

  const serverParams = {
    url: '/api/upload',
    headers: {
      'X-CSRF-TOKEN': CSRFtoken,
    },
  };

  registerPlugin(
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize,
    FilePondPluginImageResize,
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
  );

  return (
    <section className="pt-5 px-5">
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        name="file"
        maxFileSize="5MB"
        acceptedFileTypes={['image/*', 'application/pdf', 'application/csv']}
        server={serverParams}
        allowRevert={true}
      ></FilePond>
    </section>
  );
};

export default Home;
