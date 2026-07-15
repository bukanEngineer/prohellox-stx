import React from "react";
import { Card } from "../Card/Card.jsx";
import { Button } from "../Button/Button.jsx";
import { Tag } from "../Tag/Tag.jsx";
import "./OnboardingSteps.css";

function StepConnector({ states }) {
  return (
    <div className="steps" aria-hidden="true">
      {states.map((s, i) => (
        <React.Fragment key={i}>
          <div className={"step-dot is-" + s}>
            {s === "done" ? (
              <span className="material-symbols-rounded">check</span>
            ) : (
              <span>{i + 1}</span>
            )}
          </div>
          {i < states.length - 1 && (
            <div className={"step-line is-" + (s === "done" ? "done" : "todo")} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export function OnboardingSteps({
  stepStates = ["active", "todo", "todo"],
  onTakeAssessment,
  heading = "Welcome to StraitsX!",
  subheading = "Verify your account and complete a quick assessment to unlock StraitsX.",
}) {
  const steps = [
    {
      key: "identity",
      title: "Verify Your Identity",
      body: "Complete identity verification for a smooth and secure experience.",
      cta: stepStates[0] === "done" ? <Tag tone="positive">Verified</Tag> : null,
    },
    {
      key: "assessment",
      title: "Customer Knowledge Assessment",
      body: "Take this MAS-required quiz to unlock full access to StraitsX.",
      cta: stepStates[1] === "done"
        ? <Tag tone="positive">Completed</Tag>
        : <Button variant="primary" size="md" onClick={onTakeAssessment}>Take Assessment</Button>,
    },
    {
      key: "phone",
      title: "Verify Your Phone Number",
      body: "Quickly verify your phone number for enhanced account security.",
      cta: <Tag tone="neutral">Not Verified</Tag>,
    },
  ];

  return (
    <Card shadow={1} className="onboard">
      <h1 className="onboard__heading" style={{ font: "700 24px/1.2 var(--font-display)" }}>
        {heading}
      </h1>
      <p className="onboard__sub">{subheading}</p>
      <StepConnector states={stepStates} />
      <div className="onboard__grid">
        {steps.map((s) => (
          <div key={s.key} className="step">
            <div className="step__text">
              <div className="step__title">{s.title}</div>
              <div className="step__body">{s.body}</div>
            </div>
            <div className="step__cta">{s.cta}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
