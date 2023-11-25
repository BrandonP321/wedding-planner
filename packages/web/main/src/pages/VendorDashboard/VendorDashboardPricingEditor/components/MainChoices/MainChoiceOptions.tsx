import {
  Button,
  SpaceBetween,
  useTabsContext,
} from "@wedding-planner/shared/web/components";
import {
  PricingEditorContextProps,
  usePricingEditorContext,
} from "../../PricingHelpers";
import { ArrayUtils } from "@wedding-planner/shared";

type Props = Required<Pick<PricingEditorContextProps, "mainChoiceIndex">>;

export const MainChoiceOptions = (props: Props) => {
  const { setSelectedTabIndex } = useTabsContext();
  const { addMainChoice, updateMainChoices, values } =
    usePricingEditorContext(props);

  const { mainChoiceIndex } = props;
  const mainChoicesLength = values.mainChoices.length;

  const moveLeft = () => {
    const newSelectedTabIndex = mainChoiceIndex - 1;

    setSelectedTabIndex(newSelectedTabIndex);
    updateMainChoices((mcs) => {
      ArrayUtils.move(mcs, mainChoiceIndex, mainChoiceIndex - 1);
    });
  };

  const moveRight = () => {
    const newSelectedTabIndex = mainChoiceIndex + 1;

    setSelectedTabIndex(newSelectedTabIndex);
    updateMainChoices((mcs) => {
      ArrayUtils.move(mcs, mainChoiceIndex, mainChoiceIndex + 1);
    });
  };

  const addNewMainChoice = () => {
    const newIndex = mainChoiceIndex + 1;

    addMainChoice(newIndex);
    setSelectedTabIndex(newIndex);
  };

  const remove = () => {
    updateMainChoices((mcs) => {
      mcs.splice(mainChoiceIndex, 1);
    });

    setSelectedTabIndex(0);
  };

  const canMoveLeft = mainChoiceIndex > 0;
  const canMoveRight = mainChoiceIndex < mainChoicesLength - 1;

  return (
    <SpaceBetween stretch>
      <Button disabled={!canMoveLeft} onClick={moveLeft}>
        Move left
      </Button>
      <Button disabled={!canMoveRight} onClick={moveRight}>
        Move right
      </Button>
      <Button onClick={remove}>Remove main choice</Button>
      <Button onClick={addNewMainChoice}>Add main choice</Button>
    </SpaceBetween>
  );
};
