import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import styles from './fileUploader.scss';
import UploadPhoto from './uploadPhoto.svg';
import Face from './face.svg';

/**
 * Signup component
 */
const FileLoader = props => (
  <div className={styles.uploadPhotoContainer}>
    <Dropzone
      onDrop={props.onDrop}
      multiple={props.multiple || false}
      accept={props.accept}
      className={styles.dropzoneContainer}
    >
      <div className={styles.dropzoneContainerInner}>
        <div className={styles.dropzoneBoxImage}>
          <UploadPhoto width="50" height="50" className={styles.svg} />
        </div>
        <div className={styles.dropzoneBoxText}>
          Drop image here or click to select image to upload.
        </div>
      </div>
    </Dropzone>
    {props.image
      ? <img
        key="profileImage"
        src={props.image.preview}
        alt="User profile"
        className={styles.imagePreviewContainer}
      />
      : <div className={styles.fakeFrame}>
        <span className="visually-hidden">Image frame</span>
        <Face width="100" height="100" className={styles.svg} />
      </div>}
  </div>
);

FileLoader.propTypes = {
  image: PropTypes.object,
  onDrop: PropTypes.func,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
};

export default FileLoader;
