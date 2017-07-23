import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Modifier, SelectionState } from 'draft-js';
import { Editor, createEditorState } from 'medium-draft';
import 'medium-draft/lib/index.css';
import * as actionCreators from '../actions';
import ButtonLink from '../../buttonLink';
import inlineButtons from '../buttons/inlineButtons';
import blockButtons from '../buttons/blockButtons';
import customImageSideButton from '../buttons/customImageSideButton';
import s from './editor.scss';

class MediumEditor extends Component {
  static propTypes = {
    actions: PropTypes.object,
    formData: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.blockButtons = blockButtons;
    this.inlineButtons = inlineButtons;
    this.sideButtons = [
      {
        title: 'Image',
        component: customImageSideButton,
      },
    ];

    this.state = {
      editorState: createEditorState(), // for empty content
    };

    this.onSave = this.onSave.bind(this);
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onSave(e) {
    e.preventDefault();
    this.uploadImages();

    const { editorState } = this.state;
    // const contentState = editorState.getCurrentContent();

    editorState.getCurrentContent().getBlockMap().map((block) => {
      const type = block.getType();

      if (type === 'atomic:image') {
        block.getData()._root.entries[0][1] = 'user.jpg'; // eslint-disable-line
        block.getData().get('src');

        // Do stuff

        // const rangeToReplace = new SelectionState({

        //   anchorKey: block.getKey(),

        //   focusKey: block.getKey(),

        // });

        // Modifier.replaceText(contentState, rangeToReplace, 'test.png');

        // const newContentState = editorState.getCurrentContent();

        // this.setState({ editorState });
      }

      return true;
    });
  }

  /**
   * Calls redux action uploadImages witch uploads image to server
   * Updates editors state on successful upload
   * @param {Object} formData
   * @returns {undefined}
   */
  uploadImages = async () => {
    const { actions, token, formData } = this.props;
    try {
      const data = await actions.uploadImages({
        formData,
        token,
      });
    } catch (error) {
      // TODO Error handling
      throw new Error(error);
    }
  };

  componentDidMount() {
    this.editor.focus();
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          ref={ref => this.editor = ref}
          editorState={editorState}
          sideButtons={this.sideButtons}
          onChange={this.onChange}
          inlineButtons={this.inlineButtons}
          blockButtons={this.blockButtons}
        />
        <div className={s.container}>
          <div className={s.row}>
            <div className={s.cell}>
              <ButtonLink
                href="/"
                text="Save"
                title="Save"
                onClick={e => this.onSave(e)}
              />
            </div>
          </div>
        </div>
      </div>
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
  let token = '';
  if (state.auth.user && state.auth.user.token) {
    token = state.auth.user.token;
  }
  return { token, formData: state.editor.formData };
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

export default connect(mapStateToProps, mapDispatchToProps)(MediumEditor);
