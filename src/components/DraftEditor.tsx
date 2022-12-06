import {
  convertFromRaw,
  convertToRaw,
  EditorState,
  RawDraftContentState,
} from "draft-js";
import { useCallback, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import useDebounce from "../hooks/useDebounce";
import { updateTab } from "../services";

interface DraftEditorProps {
  initContent: RawDraftContentState | null;
  loaded: boolean;
  tabId: number;
}

const IDLE_TIMEOUT = 0.5 * 1000;

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const originRawDraft = {
  blocks: [],
  entityMap: {},
} as RawDraftContentState;

function DraftEditor({
  initContent,
  loaded,
  tabId,
}: DraftEditorProps): JSX.Element {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      convertFromRaw(initContent ?? originRawDraft),
    ),
  );
  const [convertedEditorState, setConvertedEditorState] = useState(
    convertToRaw(editorState.getCurrentContent()),
  );

  const debouncedEditorState = useDebounce(convertedEditorState, IDLE_TIMEOUT);

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(
        convertFromRaw(initContent ?? originRawDraft),
      ),
    );
  }, [initContent, loaded]);

  const onEditorStateChange = useCallback(
    (value: EditorState) => {
      setEditorState(value);
      const converted = convertToRaw(editorState.getCurrentContent());
      setConvertedEditorState(converted);
    },
    [editorState],
  );

  useEffect(() => {
    onUpdateContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(debouncedEditorState)]);

  const onUpdateContent = useCallback(() => {
    if (Number.isInteger(tabId)) {
      updateTab(tabId, {
        content: debouncedEditorState,
      }).catch((err) => {
        console.log(err);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(debouncedEditorState), tabId]);

  return (
    <Editor
      editorState={editorState}
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
