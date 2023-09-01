import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ButtonLink,
  CheckboxField,
  CheckboxFormField,
  ExternalLink,
  FormField,
  InputField,
  Modal,
  RadioField,
  RadioFormField,
  SpaceBetween,
  SubmitButton,
  ToggleField,
} from "@wedding-planner/shared/web";
import { faArrowUpRight } from "@fortawesome/pro-solid-svg-icons";
import { Form, Formik } from "formik";
import { useFetch } from "../../store";
import { AppHelmet } from "../../components";

const tempFetcher = (a: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ res: `your value is ${a}` });
      // reject({ msg: "This is some error msg" });
    }, 1000);
  });
};

type Props = {};

export function Home(props: Props) {
  const [showModal, setShowModal] = useState(false);
  const { errMsg, isLoading, response, makeAPICall } = useFetch(tempFetcher, {
    // fetchOnMount: true,
    overrideDefaultErrorHandling: true,
  });

  console.log({ errMsg, isLoading, response });

  return (
    <>
      <Button onClick={() => makeAPICall(5)}>Make API Call</Button>
      <AppHelmet />
      <h1>Something</h1>
      <h2>Something</h2>
      <h3>Something</h3>
      <h4>Something</h4>
      <p>Something</p>
      <small>Something</small>
      <h1>Something</h1>
      <h2>Something</h2>
      <h3>Something</h3>
      <h4>Something</h4>
      <p>Something</p>
      <small>Something</small>
      <h1>Something</h1>
      <h2>Something</h2>
      <h3>Something</h3>
      <h4>Something</h4>
      <p>Something</p>
      <small>Something</small>
      <h1>Something</h1>
      <h2>Something</h2>
      <h3>Something</h3>
      <h4>Something</h4>
      <p>Something</p>
      <small>Something</small>
      <SpaceBetween size="s" vertical>
        <Button onClick={() => setShowModal(true)}>Show Modal</Button>
        <Button>asdf</Button>
        <ButtonLink to="/asdf" rightIcon={faArrowUpRight}>
          asdf
        </ButtonLink>
        <p>
          This is a <ExternalLink to={"/"}>Link</ExternalLink>
        </p>

        <Alert title={<h2>Some alert title</h2>} type="error">
          This is my alert
        </Alert>

        <Modal show={showModal} toggleShow={() => setShowModal(!showModal)}>
          <h1>Modal</h1>
        </Modal>

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
    </>
  );
}
