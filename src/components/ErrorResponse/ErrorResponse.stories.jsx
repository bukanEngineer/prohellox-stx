import React from "react";
import { ErrorResponse } from "./ErrorResponse.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Components/Error Response",
  component: ErrorResponse,
  parameters: { layout: "fullscreen" },
  argTypes: {
    code: { control: "text" },
    title: { control: "text" },
    body: { control: "text" },
    className: { control: "text" },
  },
  args: {
    code: "404",
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has been moved.",
  },
};

export const NotFound = {
  args: {
    code: "404",
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has been moved.",
    actions: <Button>Go home</Button>,
  },
};

export const Error400 = {
  args: {
    code: "400",
    title: "Bad request",
    body: "The request couldn't be processed. Please check your details and try again.",
    actions: <Button>Try again</Button>,
  },
};

export const Error401 = {
  args: {
    code: "401",
    title: "Session expired",
    body: "You've been signed out. Please log in again to continue.",
    actions: <Button>Log in</Button>,
  },
};

export const Error403 = {
  args: {
    code: "403",
    title: "Access denied",
    body: "You don't have permission to view this page. Contact your administrator if you think this is a mistake.",
    actions: <Button variant="secondary">Go back</Button>,
  },
};

export const Error408 = {
  args: {
    code: "408",
    title: "Request timed out",
    body: "The request took too long to complete. Please check your connection and try again.",
    actions: <Button>Retry</Button>,
  },
};

export const ServerError = {
  args: {
    code: "500",
    title: "Something went wrong",
    body: "We're investigating. Please try again in a few minutes.",
    actions: (
      <>
        <Button variant="secondary">Refresh</Button>
        <Button>Contact support</Button>
      </>
    ),
  },
};

export const KycRejected = {
  args: {
    title: "Verification unsuccessful",
    body: "We weren't able to verify your identity with the documents you provided. Please review and resubmit.",
    actions: <Button>Resubmit documents</Button>,
  },
};
