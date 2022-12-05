import { ContentState, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";

interface DraftEditorProps {
  initContent: string;
  loaded: boolean;
  tabId: number;
}

// const IDLE_TIMEOUT = 1 * 1000;

function DraftEditor({
  initContent,
  loaded,
  tabId,
}: DraftEditorProps): JSX.Element {
  const [editorValue, setEditorValue] = useState(
    EditorState.createWithContent(
      ContentState.createFromText(loaded ? initContent : "Loading ..."),
    ),
  );

  useEffect(() => {
    setEditorValue(
      EditorState.createWithContent(
        ContentState.createFromText(loaded ? initContent : "Loading ..."),
      ),
    );
  }, [initContent, loaded]);

  const onEditorStateChange = (value: EditorState): void => {
    setEditorValue(value);
  };

  // const onUpdateContent = (): void => {
  //   updateTab(tabId, {
  //     content: editorValue as any,
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // };

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
        height: "calc(100vh - 210px)",
        padding: "0 8px",
      }}
    />
  );
}

export default DraftEditor;
