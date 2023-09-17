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

const TabContent = ({ name, id, price, subChoices }: TabContentProps) => {
  return (
    <FormikForm initialValues={{}} onSubmit={() => {}}>
      <Form>
        <h1>{name}</h1>

        <FormSpaceBetween>
          {subChoices.map(({ id, name, choices, multipleChoice }, i) => {
            if (multipleChoice) {
              return (
                <CheckboxFormField key={i} label={name} name={id}>
                  {choices.map((c, i) => (
                    <CheckboxField
                      key={i}
                      value={c.name}
                      label={`${c.label}: $${c.price}`}
                    />
                  ))}
                </CheckboxFormField>
              );
            } else {
              return (
                <RadioFormField key={i} label={name} name={id}>
                  {choices.map((c, i) => (
                    <RadioField
                      key={i}
                      value={c.name}
                      label={`${c.label}: $${c.price}`}
                    />
                  ))}
                </RadioFormField>
              );
            }
          })}
        </FormSpaceBetween>
      </Form>
    </FormikForm>
  );
};
