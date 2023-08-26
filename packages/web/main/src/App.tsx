import React from "react";
import {
  Button,
  ButtonLink,
  CheckboxField,
  CheckboxFormField,
  ExternalLink,
  FormField,
  InputField,
  RadioField,
  RadioFormField,
  SpaceBetween,
  SubmitButton,
  ToggleField,
} from "@wedding-planner/shared/web";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { faArrowUpRight } from "@fortawesome/pro-solid-svg-icons";
import { Form, Formik } from "formik";

function App() {
  return (
    <Router>
      <h1>Something</h1>
      <h2>Something</h2>
      <h3>Something</h3>
      <h4>Something</h4>
      <p>Something</p>
      <small>Something</small>
      <SpaceBetween size="s" vertical>
        <Button>asdf</Button>
        <Button>asdf</Button>
        <ButtonLink to="/asdf" rightIcon={faArrowUpRight}>
          asdf
        </ButtonLink>
        <p>
          This is a <ExternalLink to={"/"}>Link</ExternalLink>
        </p>
        <Formik
          initialValues={{ myInput: "", myRadio: "one", myToggle: true }}
          onSubmit={(v) => {
            console.log(v);
          }}
        >
          <Form>
            <SpaceBetween size="s" vertical>
              <FormField
                name="myInput"
                label="Some field"
                hintText="This is some hint text"
              >
                <InputField />
              </FormField>

              <RadioFormField name="myRadio" label="Some radio">
                <RadioField value="one" label={"One"} />
                <RadioField value="two" label={"Two"} />
                <RadioField value="three" label={"Three"} />
              </RadioFormField>

              <CheckboxFormField name="myCheckbox" label="Some checkbox">
                <CheckboxField value="checkOne" label="Check One" />
                <CheckboxField value="checkTwo" label="Check Two" />
                <CheckboxField value="checkThree" label="Check Three" />
              </CheckboxFormField>

              <CheckboxFormField name="myToggle" label="Some Toggle">
                <ToggleField label="Toggle One" value="toggleOne" />
              </CheckboxFormField>

              <SubmitButton />
            </SpaceBetween>
          </Form>
        </Formik>
      </SpaceBetween>
    </Router>
  );
}

export default App;
