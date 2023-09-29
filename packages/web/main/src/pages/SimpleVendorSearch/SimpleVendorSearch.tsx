import styles from "./SimpleVendorSearch.module.scss";
import {
  InputField,
  FormField,
  SpaceBetween,
  FormikForm,
  InputSuggestions,
} from "@wedding-planner/shared/web/components";
import { Form, useFormikContext } from "formik";
import { useNavigate } from "react-router-dom";
import { RouteHelper } from "utils/RouteHelper";
import { TextUtils, useCitySuggestions } from "@wedding-planner/shared";

export type SimpleVendorSearchProps = {};

export const SimpleVendorSearch = (props: SimpleVendorSearchProps) => {
  const navigate = useNavigate();

  const goToVendorSearch = (city: string) => {
    navigate(RouteHelper.VendorSearch(undefined, { city }));
  };

  return (
    <SpaceBetween
      classes={{ root: styles.searchPage }}
      align="center"
      vertical
      stretchChildren
    >
      <SpaceBetween
        classes={{ root: styles.mainContent }}
        align="center"
        stretchChildren
        vertical
      >
        <h1>Some App Logo</h1>

        <FormikForm
          initialValues={{ vendorSearch: "" }}
          onSubmit={(v) => goToVendorSearch(v.vendorSearch)}
        >
          <Form className={styles.searchForm}>
            <SimpleVendorSearchInput />
          </Form>
        </FormikForm>
      </SpaceBetween>
    </SpaceBetween>
  );
};

const SimpleVendorSearchInput = () => {
  const {
    values: { vendorSearch },
  } = useFormikContext<{ vendorSearch: string }>();

  const { citySuggestions } = useCitySuggestions(vendorSearch);

  return (
    <SpaceBetween
      classes={{ root: styles.inputWrapper }}
      align="center"
      vertical
    >
      <FormField
        name="vendorSearch"
        classes={{ root: styles.searchBarFormField }}
      >
        <InputField autoComplete={false} />
      </FormField>

      <InputSuggestions
        suggestions={citySuggestions}
        getSuggestionHref={(s) =>
          RouteHelper.VendorSearch(undefined, { city: s.description })
        }
        staticPosition
      >
        {(s) => {
          const modifiedCityName = TextUtils.getBoldenedMatchedText(
            s.description,
            vendorSearch
          );

          return (
            <span dangerouslySetInnerHTML={{ __html: modifiedCityName }} />
          );
        }}
      </InputSuggestions>
    </SpaceBetween>
  );
};
