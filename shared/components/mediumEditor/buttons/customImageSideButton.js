import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Block, addNewBlock } from 'medium-draft';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import CameraIcon from '../../../assets/images/camera.svg';

class CustomImageSideButton extends Component {
  static propTypes = {
    setEditorState: PropTypes.func,
    getEditorState: PropTypes.func,
    close: PropTypes.func,
    actions: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClick() {
    this.input.value = null;
    this.input.click();
  }

  /*
  This is an example of how an image button can be added
  on the side control. This Button handles the image addition locally
  by creating an object url. You can override this method to upload
  images to your server first, then get the image url in return and then
  add to the editor.
  */
  onChange(e) {
    // e.preventDefault();
    const file = e.target.files[0];
    if (file.type.indexOf('image/') === 0) {
      const src = URL.createObjectURL(file);
      this.props.setEditorState(
        addNewBlock(this.props.getEditorState(), Block.IMAGE, {
          src,
        }),
      );
      // const formData = new FormData();
      // formData.append('image', file);
      // this.uploadImage(formData);
    }
    this.props.close();
  }

  /**
   * Calls redux action uploadImages witch uploads image to server
   * Updates editors state on successful upload
   * @param {Object} formData
   * @returns {undefined}
   */
  uploadImage = async (formData) => {
    const { actions, token, getEditorState, setEditorState } = this.props;

    try {
      const data = await actions.uploadImages({
        formData,
        token,
      });

      setEditorState(
        addNewBlock(getEditorState(), Block.IMAGE, {
          src: data.images.url,
        }),
      );
    } catch (error) {
      // TODO Error handling
      throw new Error(error);
    }
  };

  render() {
    return (
      <button type="button" onClick={this.onClick} title="Add an Image">
        <CameraIcon />
        <input
          type="file"
          accept="image/*"
          ref={(c) => {
            this.input = c;
          }}
          onChange={this.onChange}
          style={{ display: 'none' }}
        />
      </button>
    );
  }
}

/**
 * Maps state to components props
 *
 * @param {Object} state - Application state
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
function mapStateToProps(state) {
  return { token: state.auth.user.token };
}

/**
 * Maps dispatch to components props
 *
 * @param {Object} dispatch - Redux dispatch medhod
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CustomImageSideButton,
);
