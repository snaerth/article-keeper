import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import s from './fileUploader.scss';
import UploadPhoto from '../../../assets/images/uploadPhoto.svg';
import Face from '../../../assets/images/face.svg';

/**
 * FileLoader component
 */
const FileLoader = ({
  onDrop, multiple, accept, image,
}) => (
  <div className={s.uploadPhotoContainer}>
    <Dropzone
      onDrop={onDrop}
      multiple={multiple || false}
      accept={accept}
      className={s.dropzoneContainer}
    >
      <div className={s.dropzoneContainerInner}>
        <div className={s.dropzoneBoxImage}>
          <UploadPhoto width="50" height="50" className={s.svg} />
        </div>
        <div className={s.dropzoneBoxText}>Drop image here or click to select image to upload.</div>
      </div>
    </Dropzone>
    {image ? (
      <img
        key="profileImage"
        src={image.preview ? image.preview : image}
        alt="User profile"
        className={s.imagePreviewContainer}
      />
    ) : (
      <div className={s.fakeFrame}>
        <span className="visually-hidden">Image frame</span>
        <Face width="100" height="100" className={s.svg} />
      </div>
    )}
  </div>
);

FileLoader.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onDrop: PropTypes.func,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
};

export default FileLoader;
