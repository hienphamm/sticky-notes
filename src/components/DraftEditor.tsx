import {
  convertFromRaw,
  convertToRaw,
  EditorState,
  RawDraftContentState,
} from "draft-js";
import { useCallback, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import useAxios from "../hooks/useAxios";
import useDebounce from "../hooks/useDebounce";
import { Content, Tab } from "../models";
import { getContent, updateContent } from "../services";

interface DraftEditorProps {
  tab: Tab;
}

const IDLE_TIMEOUT = 0.5 * 1000;

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const originRawDraft = {
  blocks: [],
  entityMap: {},
} as RawDraftContentState;

function DraftEditor({ tab }: DraftEditorProps): JSX.Element {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(originRawDraft)),
  );
  const [convertedEditorState, setConvertedEditorState] = useState(
    convertToRaw(editorState.getCurrentContent()),
  );

  const responseContent = useAxios<number, Content[]>(
    getContent({ tabId: tab.id }),
  );

  const debouncedEditorState = useDebounce(convertedEditorState, IDLE_TIMEOUT);

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(
        convertFromRaw(
          responseContent.data?.[0]?.attributes?.content ?? originRawDraft,
        ),
      ),
    );
  }, [responseContent.data]);

  const onEditorStateChange = useCallback((value: EditorState) => {
    setEditorState(value);
    const converted = convertToRaw(value.getCurrentContent());
    setConvertedEditorState(converted);
  }, []);

  useEffect(() => {
    onUpdateContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(debouncedEditorState)]);

  const onUpdateContent = useCallback(() => {
    if (
      Array.isArray(responseContent.data) &&
      Number.isInteger(responseContent.data?.[0]?.id)
    ) {
      updateContent(responseContent.data[0].id, {
        content: debouncedEditorState,
      }).catch((err) => {
        console.log(err);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(debouncedEditorState), responseContent.data?.[0]?.id]);

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
