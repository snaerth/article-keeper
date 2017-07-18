import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modifier, SelectionState } from 'draft-js';
import { Editor, createEditorState } from 'medium-draft';
import 'medium-draft/lib/index.css';
import ButtonLink from '../../buttonLink';
import inlineButtons from '../buttons/inlineButtons';
import blockButtons from '../buttons/blockButtons';
import customImageSideButton from '../buttons/customImageSideButton';
import s from './editor.scss';

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

    this.onSave = this.onSave.bind(this);
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onSave(e) {
    e.preventDefault();
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    let rangeToReplace = null;
    editorState.getCurrentContent().getBlockMap().map((block) => {
      const type = block.getType();

      if (type === 'atomic:image') {
        console.log(block);
        console.log(block.getData());
        console.log(block.getEntityAt('src'));
        rangeToReplace = new SelectionState({
          anchorKey: block.getKey(),
          focusKey: block.getKey(),
        });
        Modifier.replaceText(contentState, rangeToReplace, 'test.png');
        const newContentState = editorState.getCurrentContent();
        this.setState({ editorState });
      }

      return true;
    });
  }

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
  return { imagesFormData: state.editor.imagesFormData };
}

export default connect(mapStateToProps, null)(MediumEditor);
