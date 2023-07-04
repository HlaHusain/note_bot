import React from "react";
import { TextEditor } from "../../TextEditor";

export function Text({widget, onChange}) {
  return (
    <TextEditor
      value={widget.data.text}
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
