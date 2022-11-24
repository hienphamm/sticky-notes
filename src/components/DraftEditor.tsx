import { ContentState, EditorState } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";

function DraftEditor(): JSX.Element {
  const [editorValue, setEditorValue] = useState(
    EditorState.createWithContent(ContentState.createFromText("")),
  );

  const onEditorStateChange = (value: EditorState): void => {
    setEditorValue(value);
  };

  return (
    <Editor
      editorState={editorValue}
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: [
          "inline",
          "blockType",
          "fontSize",
          "list",
          "textAlign",
          "colorPicker",
          "link",
          "embedded",
          "history",
        ],
      }}
      editorStyle={{
        height: "calc(100vh - 255px)",
      }}
    />
  );
}

export default DraftEditor;
