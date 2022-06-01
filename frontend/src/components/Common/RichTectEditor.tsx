import "quill/dist/quill.snow.css"; // Add css for snow theme
import "quill/dist/quill.bubble.css";

import { Box } from "@chakra-ui/react";
import React, { FC } from "react";
import { useQuill } from "react-quilljs";

const RichTextEditor: FC = () => {
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

  const { quillRef } = useQuill({ theme, modules, formats, placeholder });
  return (
    <React.Fragment>
      <Box minH={200} ref={quillRef} />
    </React.Fragment>
  );
};

export default RichTextEditor;
