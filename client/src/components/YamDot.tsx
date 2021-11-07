import * as React from "react";

const YamPng = require("./yam.png");

export class YamDot extends React.Component<any, any> {
  public render() {
    return (
      <img src={YamPng} style={{ height: "1rem", width: "1rem" }} alt="yam" />
    );
  }
}
