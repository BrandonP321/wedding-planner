import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ButtonLink,
  CheckboxField,
  CheckboxFormField,
  CheckboxValues,
  ExternalLink,
  FormField,
  FormikForm,
  FormikSubmit,
  InputField,
  InputValues,
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
import * as Yup from "yup";

const tempAPICall = (a: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve({ res: `your value is ${a}` });
      reject({ msg: "This is some error msg" });
    }, 1000);
  });
};

enum TempInputField {
  Email = "email",
}

enum TempCheckboxField {
  One = "one",
}

enum TempCheckboxValue {
  One = "one-v",
  Two = "two-v",
}

type TempFormValues = InputValues<typeof TempInputField> &
  CheckboxValues<typeof TempCheckboxField, TempCheckboxValue>;

const tempSchema = Yup.object().shape({
  email: Yup.string()
    .max(5, "Email must be less than 5 characers long")
    .required("Email required"),
});

const TempForm = () => {
  const handleSubmit: FormikSubmit<TempFormValues> = async (v, f) => {
    console.log(v.one);
  };

  return (
    <FormikForm
      validationSchema={tempSchema}
      initialValues={{
        [TempInputField.Email]: "",
        [TempCheckboxField.One]: [] as TempCheckboxValue[],
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField name={TempInputField.Email} label="email">
          <InputField />
        </FormField>
        <CheckboxFormField name={TempCheckboxField.One} label="Some checkbox">
          <CheckboxField label="Check One" value={TempCheckboxValue.One} />
          <CheckboxField label="Check Two" value={TempCheckboxValue.Two} />
        </CheckboxFormField>

        <SubmitButton />
      </Form>
    </FormikForm>
  );
};

type Props = {};

export function Home(props: Props) {
  const [showModal, setShowModal] = useState(false);
  const { errMsg, isLoading, response, makeAPICall } = useFetch(tempAPICall, {
    // fetchOnMount: true,
    overrideDefaultErrorHandling: true,
  });

  const handleSubmit = () => {};

  return (
    <>
      <AppHelmet />
      <Button onClick={() => makeAPICall(5)}>Make API Call</Button>
      <TempForm />
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
