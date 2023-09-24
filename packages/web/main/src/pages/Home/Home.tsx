import React, { useState } from "react";
import {
  Alert,
  Button,
  ButtonLink,
  CheckboxField,
  CheckboxFormField,
  ExternalLink,
  FormField,
  FormikForm,
  FormikSubmit,
  InputField,
  Modal,
  RadioField,
  RadioFormField,
  SpaceBetween,
  SubmitButton,
  ToggleField,
  getEmptyInitialValues,
} from "@wedding-planner/shared/web";
// import { faArrowUpRight } from "@fortawesome/pro-solid-svg-icons";
import { Form, Formik } from "formik";
import { useFetch } from "../../store";
import { AppHelmet } from "../../components";
import * as Yup from "yup";
import { FormSpaceBetween } from "../../components/SpaceBetween/SpaceBetween";
// import { TempAPIFetcher } from "../../utils";
import { t, useI18Languages } from "../../i18n";
import { RouteHelper } from "../../utils/RouteHelper";

const LanguageSwitcher = () => {
  const { lngCodes, lngs, resolvedLanguage, changeLanguage } =
    useI18Languages();

  return (
    <SpaceBetween vertical>
      <SpaceBetween>
        {lngCodes.map((lng) => (
          <button
            key={lng}
            style={{
              fontWeight: resolvedLanguage === lng ? "bold" : "normal",
            }}
            type="submit"
            onClick={() => changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </button>
        ))}
      </SpaceBetween>

      <h2>{t("Home.title")}</h2>
    </SpaceBetween>
  );
};

enum TempInputField {
  Email = "email",
}

enum TempCheckboxField {
  CheckOne = "checkFieldOne",
  CheckTwo = "checkFieldTwo",
}

enum TempCheckboxOneValue {
  One = "one-v",
  Two = "two-v",
}

enum TempCheckboxTwoValue {
  One = "one-v",
  Two = "two-v",
}

enum TempToggleField {
  ToggleOne = "toggleOne",
}

enum TempRadioField {
  RadioOne = "radioOne",
  RadioTwo = "radioTwo",
}

enum TempRadioOneValue {
  one = "radioOne-v",
  two = "radioTwo-v",
}

enum TempRadioTwoValue {
  one = "radioTwo-v",
}

const tempSchema = Yup.object().shape({
  email: Yup.string()
    .max(5, "Email must be less than 5 characers long")
    .required("Email required"),
});

const initial = getEmptyInitialValues({
  inputFields: TempInputField,
  toggleFields: TempToggleField,
  checkboxFields: {
    [TempCheckboxField.CheckOne]: TempCheckboxOneValue,
    [TempCheckboxField.CheckTwo]: TempCheckboxTwoValue,
  },
  radioFields: {
    [TempRadioField.RadioOne]: TempRadioOneValue,
    [TempRadioField.RadioTwo]: TempRadioTwoValue,
  },
});

type TempFormValues = typeof initial;

const TempForm = () => {
  const handleSubmit: FormikSubmit<TempFormValues> = async (v, f) => {};

  return (
    <FormikForm
      validationSchema={tempSchema}
      initialValues={{
        ...initial,
        radioOne: TempRadioOneValue.one,
        radioTwo: TempRadioTwoValue.one,
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormSpaceBetween>
          <FormField name={TempInputField.Email} label="email">
            <InputField />
          </FormField>
          <CheckboxFormField
            name={TempCheckboxField.CheckOne}
            label="Some checkbox"
          >
            <CheckboxField label="Check One" value={TempCheckboxOneValue.One} />
            <CheckboxField label="Check Two" value={TempCheckboxOneValue.Two} />
          </CheckboxFormField>

          <RadioFormField label="Some Radio" name={TempRadioField.RadioOne}>
            <RadioField label="Radio One" value={TempRadioOneValue.one} />
            <RadioField label="Radio Two" value={TempRadioOneValue.two} />
          </RadioFormField>

          <SubmitButton />
        </FormSpaceBetween>
      </Form>
    </FormikForm>
  );
};

type Props = {};

export function Home(props: Props) {
  const [showModal, setShowModal] = useState(false);
  // const { errMsg, isLoading, response, makeAPICall } = useFetch(
  //   TempAPIFetcher.getPosts,
  //   {
  //     fetchOnMount: true,
  //     // overrideDefaultErrorHandling: true,
  //   }
  // );

  return (
    <>
      <AppHelmet />
      <h1>Stage: {process.env.REACT_APP_STAGE}</h1>
      <LanguageSwitcher />
      {/* <Button onClick={() => makeAPICall()}>Make API Call</Button> */}
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
        <ButtonLink to={RouteHelper.VendorPricing()}>Vendor pricing</ButtonLink>
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
