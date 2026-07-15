import React from "react";
import { Alert } from "../Alert/Alert.jsx";

export function ImportantNotes({ tone = "neutral", title = "Important", children, className = "", ...rest }) {
  return (
    <Alert tone={tone} title={title} className={"important-notes " + className} {...rest}>
      {children}
    </Alert>
  );
}
