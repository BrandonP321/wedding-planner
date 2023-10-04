import React, { useEffect, useState } from "react";
import styles from "./VendorPricing.module.scss";
import {
  CheckboxField,
  CheckboxFormField,
  FormikForm,
  PageContent,
  RadioField,
  RadioFormField,
  SpaceBetween,
  Tabs,
} from "@wedding-planner/shared/web/components";
import { mockVenue } from "../../mockData/mockVenue";
import {
  VendorChoice,
  VendorMainChoice,
} from "@wedding-planner/shared/common/types/vendorPriceOptions";
import { Form, useFormikContext } from "formik";
import { FormSpaceBetween } from "../SpaceBetween/SpaceBetween";
import { isArray } from "lodash";

export type VendorPricingProps = {
  onPriceChange?: (price: number) => void;
};

const tabs = [
  ...mockVenue.mainChoices,
  ...mockVenue.mainChoices,
  ...mockVenue.mainChoices,
  ...mockVenue.mainChoices,
];

export const VendorPricing = ({ onPriceChange }: VendorPricingProps) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [savedPrices, setSavedPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const basePrice = tabs[selectedTabIndex]?.price ?? 0;
    const total = (savedPrices[selectedTabIndex] ?? 0) + basePrice;
    onPriceChange?.(total);
  }, [selectedTabIndex, savedPrices, onPriceChange]);

  return (
    <div className={styles.pricingWrapper}>
      <Tabs
        onTabChange={setSelectedTabIndex}
        tabs={[
          ...mockVenue.mainChoices,
          ...mockVenue.mainChoices,
          ...mockVenue.mainChoices,
          ...mockVenue.mainChoices,
        ].map((c, i) => ({
          title: c.name,
          content: (
            <TabContentFormik key={i}>
              <TabContent
                {...c}
                onPriceChange={(p) =>
                  setSavedPrices({ ...savedPrices, [i]: p })
                }
              />
            </TabContentFormik>
          ),
        }))}
      />
    </div>
  );
};

const TabContentFormik = ({ children }: React.PropsWithChildren) => {
  return (
    <PageContent horizontalPadding>
      <FormikForm initialValues={{}} onSubmit={() => {}}>
        {children}
      </FormikForm>
    </PageContent>
  );
};

type TabContentProps = VendorMainChoice & {
  onPriceChange: (price: number) => void;
};

const TabContent = ({ name, subChoices, onPriceChange }: TabContentProps) => {
  const { values } = useFormikContext<Record<string, string | string[]>>();

  useEffect(() => {
    onPriceChange(getPriceSum());
  }, [values]);

  const getPriceSum = () => {
    let priceSum = 0;

    for (const [key, value] of Object.entries(values)) {
      const subChoice = subChoices.find((c) => c.id === key);

      if (isArray(value)) {
        const choicesPrice = getMultipleChoicesPrice(
          subChoice?.choices ?? [],
          value
        );
        priceSum += choicesPrice;
      } else {
        const choicePrice = subChoice?.choices.find(
          (c) => c.id === value
        )?.price;
        priceSum += choicePrice ?? 0;
      }
    }

    return priceSum;
  };

  const getMultipleChoicesPrice = (
    choiceGroup: VendorChoice[],
    selected: string[]
  ) => {
    let price = 0;

    choiceGroup?.forEach((c) => {
      console.log(c.id);
      if (selected.includes(c.id)) {
        price += c.price;
      }
    });

    return price;
  };

  return (
    <Form>
      <SpaceBetween size="xs" vertical>
        <h3>{name}</h3>

        <FormSpaceBetween>
          {subChoices.map(({ id, name, choices, multipleChoice }, i) => {
            if (multipleChoice) {
              return (
                <CheckboxFormField key={i} label={name} name={id}>
                  {choices.map((c, i) => (
                    <CheckboxField
                      key={i}
                      value={c.id}
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
                      value={c.id}
                      label={`${c.label}: $${c.price}`}
                    />
                  ))}
                </RadioFormField>
              );
            }
          })}
        </FormSpaceBetween>
      </SpaceBetween>
    </Form>
  );
};
