import React from "react";
import { FC } from "react";

type Props = {
  breaks?: number;
};

const LineBreak: FC<Props> = ({ breaks = 1 }) => {
  return (
    <React.Fragment>
      {[...Array(breaks)].map((el, index) => (
        <br key={index} />
      ))}
    </React.Fragment>
  );
};

export default LineBreak;
