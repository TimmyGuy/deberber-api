import React from 'react';
import { createReactEditorJS } from "react-editor-js";
import {EDITOR_JS_TOOLS} from "./tools";

export default function Editor({defaultValue, onChange}) {
    const ReactEditorJS = createReactEditorJS();

    const editorJS = React.useRef(null);

    const handleInit = React.useCallback(editor => {
        editorJS.current = editor;
    }, []);

    const handleChange = React.useCallback(() => {
        onChange(editorJS.current.save());
    }, [onChange]);

    return (
        <div className="sm:col-span-8">
            <ReactEditorJS holder='custom' tools={EDITOR_JS_TOOLS} onInitialize={handleInit} onChange={handleChange}>
                <div
                    id='custom'
                    className="w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block sm:text-sm border border-gray-300 rounded-md p-2"
                />
            </ReactEditorJS>
        </div>
    );
}