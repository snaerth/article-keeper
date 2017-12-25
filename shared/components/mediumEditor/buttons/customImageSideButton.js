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
    formData: PropTypes.object,
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

  /**
   * Updates redux store formData object,
   * also adds new image block to editor state
   * @param {Object} e
   * @returns {undefined}
   */
  onChange(e) {
    const file = e.target.files[0];

    if (file.type.indexOf('image/') === 0) {
      const {
        formData,
        getEditorState,
        setEditorState,
        actions: { storeImageFormData },
      } = this.props;
      // Create new FormData object if it doesen't exist in store
      const newFormData = formData || new FormData();
      // Add file to formdata
      newFormData.append('image', file);
      // Store form data in redux store
      storeImageFormData(newFormData);
      // Create blob source from file object
      const src = URL.createObjectURL(file);
      // Add new image block to editor state
      setEditorState(
        addNewBlock(getEditorState(), Block.IMAGE, {
          src,
        }),
      );
    }

    this.props.close();
  }

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
  return { formData: state.editor.formData };
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomImageSideButton);
