import React from "react";
import Editor, { EditorProps } from "@monaco-editor/react";
import { Box, CircularProgress } from "@mui/material";

const MonacoEditor = (props: EditorProps) => {
    return (
        <Editor
        {...props}
        height='100%'
        defaultLanguage="python"
        options={{
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            smoothScrolling: true,
            scrollbar: { verticalScrollbarSize: 5, horizontalScrollbarSize: 5 },
        }}
        loading={
            <Box role="status" display="flex" alignItems="center" justifyContent="center">
                <CircularProgress
                    size={64}
                    sx={{
                        color: 'blue.600',
                        animation: 'spin 1s linear infinite',
                    }}
                />
            </Box>
        }
        />
    );
};

export default MonacoEditor;
