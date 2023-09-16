import React from "react";
import styles from "./VendorPricing.module.scss";
import {
  CheckboxField,
  CheckboxFormField,
  FormikForm,
  RadioField,
  RadioFormField,
  Tabs,
} from "@wedding-planner/shared/web/components";
import { mockVenue } from "../../mockData/mockVenue";
import { VendorMainChoice } from "@wedding-planner/shared/common/types/vendorPriceOptions";
import { Form } from "formik";
import { FormSpaceBetween } from "../../components/SpaceBetween/SpaceBetween";

export type VendorPricingProps = {};

export const VendorPricing = (props: VendorPricingProps) => {
  return (
    <div>
      <Tabs
        tabs={mockVenue.mainChoices.map((c, i) => ({
          title: c.name,
          content: <TabContent {...c} />,
        }))}
      />
    </div>
  );
};

type TabContentProps = VendorMainChoice;

const TabContent = ({ name, addOns, subChoices }: TabContentProps) => {
  return (
    <FormikForm initialValues={{}} onSubmit={() => {}}>
      <Form>
        <h1>{name}</h1>

        <FormSpaceBetween>
          <RadioFormField label="Packages" name="sub-choice">
            {subChoices.map((s, i) => (
              <RadioField key={i} value={s.name} label={s.name} />
            ))}
          </RadioFormField>

          <CheckboxFormField label="Add-ons" name="add-ons">
            {addOns.map((a, i) => (
              <CheckboxField
                key={i}
                value={a.name}
                label={`${a.name}: $${a.additionalPrice}`}
              />
            ))}
          </CheckboxFormField>
        </FormSpaceBetween>
      </Form>
    </FormikForm>
  );
};
