import React, { useCallback, useEffect, useRef, useState } from "react";
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
  // ...mockVenue.mainChoices,
  // ...mockVenue.mainChoices,
];

export const VendorPricing = ({ onPriceChange }: VendorPricingProps) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const savedPrices = useRef<Record<string, number>>({});

  // useEffect(() => {
  //   onPriceChange?.(getTotalPrice());
  // }, [selectedTabIndex, onPriceChange]);

  // useEffect(() => {
  //   onPriceChange?.(totalPrice);
  // }, [totalPrice]);

  const getTotalPrice = () => {
    const basePrice = tabs[selectedTabIndex]?.price ?? 0;
    const total = (savedPrices.current[selectedTabIndex] ?? 0) + basePrice;

    return total;
  };

  return (
    <div className={styles.pricingWrapper}>
      <Tabs
        onTabChange={setSelectedTabIndex}
        tabs={tabs.map((c, i) => ({
          title: c.name,
          content: (
            <TabContentFormik key={i} mainChoice={c}>
              <TabContent
                {...c}
                onPriceChange={(p) => {
                  savedPrices.current[i] = p;
                  setTotalPrice(getTotalPrice());
                }}
              />
            </TabContentFormik>
          ),
        }))}
      />
    </div>
  );
};

type TabContentFormikProps = React.PropsWithChildren<{
  mainChoice: VendorMainChoice;
}>;

const TabContentFormik = ({
  children,
  mainChoice: { subChoices },
}: TabContentFormikProps) => {
  const getInitialValues = () => {
    const initialValues: Record<string, string | string[]> = {};

    subChoices.forEach((c) => {
      if (c.multipleChoice) {
        initialValues[c.id] = [];
      } else {
        initialValues[c.id] = c.choices[0].id;
      }
    });

    return initialValues;
  };

  return (
    <PageContent horizontalPadding>
      <FormikForm initialValues={getInitialValues()} onSubmit={() => {}}>
        <PageContent
          horizontalPadding
          classes={{ root: styles.tabContent }}
          responsiveHorizontalPadding={{ mobile: false }}
        >
          {children}
        </PageContent>
      </FormikForm>
    </PageContent>
  );
};

type TabContentProps = VendorMainChoice & {
  onPriceChange: (price: number) => void;
};

const TabContent = ({
  name,
  price: basePrice,
  description,
  subChoices,
  onPriceChange,
}: TabContentProps) => {
  const [totalPrice, setTotalPrice] = useState(basePrice);

  const { values } = useFormikContext<Record<string, string | string[]>>();

  const getPriceSum = useCallback(
    (v?: typeof values) => {
      let priceSum = 0;

      for (const [key, value] of Object.entries(v ?? values)) {
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
      return priceSum + basePrice;
    },
    [values, subChoices, basePrice]
  );

  useEffect(() => {
    setTotalPrice(getPriceSum());
  }, [values, getPriceSum]);

  useEffect(() => {
    onPriceChange(totalPrice);
  }, [totalPrice]);

  const getMultipleChoicesPrice = (
    choiceGroup: VendorChoice[],
    selected: string[]
  ) => {
    let price = 0;

    choiceGroup?.forEach((c) => {
      if (selected.includes(c.id)) {
        price += c.price;
      }
    });

    return price;
  };

  return (
    <Form>
      <SpaceBetween size="s" vertical stretch>
        <SpaceBetween size="n" vertical stretch>
          <h3>
            {name}: ${totalPrice}
          </h3>
          <small>Base price: ${basePrice}</small>
          {description && <p>{description}</p>}
        </SpaceBetween>

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
