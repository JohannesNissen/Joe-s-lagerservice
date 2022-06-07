import "quill/dist/quill.snow.css"; // Add css for snow theme
import "quill/dist/quill.bubble.css";

import { Box } from "@chakra-ui/react";
import React, { FC, useEffect } from "react";
import { useQuill } from "react-quilljs";

type Props = {
  onDescriptionChange: (HTML_text: string) => void;
};

const RichTextEditor: FC<Props> = ({ onDescriptionChange }) => {
  const theme = "snow";
  // const theme = "bubble";

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],

      [{ size: ["small", false, "large", "huge"] }],
      //[{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],

      ["clean"]
    ]
  };

  const placeholder = "Compose an epic...";

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "indent",
    "size",
    //"header",
    "link",
    "image",
    "video",
    "color",
    "background",
    "clean"
  ];

  const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        // console.log("Text change!");
        // console.log(quill.getText()); // Get text only
        // console.log(quill.getContents()); // Get delta contents
        // console.log(quill.root.innerHTML); // Get innerHTML using quill
        // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
        onDescriptionChange(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [onDescriptionChange, quill, quillRef]);

  return (
    <React.Fragment>
      <Box minH={200} ref={quillRef} />
    </React.Fragment>
  );
};

export default RichTextEditor;
