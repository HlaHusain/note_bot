import React from "react";
import { TextEditor } from "../../TextEditor";

export function Text({ widget, onChange, viewMode }) {
  return (
    <TextEditor
      value={widget.data.text}
      viewMode={viewMode}
      onChange={(text) =>
        onChange({
          data: {
            ...widget.data,
            text,
          },
        })
      }
    />
  );
}
