import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Editor, createEditorState } from 'medium-draft';
import 'medium-draft/lib/index.css';
import inlineButtons from '../buttons/inlineButtons';
import blockButtons from '../buttons/blockButtons';
import customImageSideButton from '../buttons/customImageSideButton';

class MediumEditor extends Component {
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
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
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
  return { imagesFormData: state.editor.imagesFormData };
}

export default connect(mapStateToProps, null)(MediumEditor);
