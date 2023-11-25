import {
  Button,
  Container,
  SpaceBetween,
} from "@wedding-planner/shared/web/components";
import { ChoiceGroupNameInput } from "./ChoiceGroupNameInput";
import { ChoicesAttributeEditor } from "../Choices/ChoicesAttributeEditor";
import { usePricingEditorContext } from "../../PricingHelpers";
import { ArrayUtils } from "@wedding-planner/shared";

type Props = {
  mainChoiceIndex: number;
  choiceGroupIndex: number;
};

export const ChoiceGroupContainer = (props: Props) => {
  const { choiceGroupIndex } = props;

  const { mainChoice, updateChoiceGroups, addChoiceGroup } =
    usePricingEditorContext(props);

  const removeChoiceGroup = () => {
    updateChoiceGroups((choiceGroups) => {
      choiceGroups.splice(choiceGroupIndex, 1);
    });
  };

  const moveChoiceGroup = (index: number) => {
    updateChoiceGroups((choiceGroups) => {
      ArrayUtils.move(choiceGroups, choiceGroupIndex, index);
    });
  };

  const choiceGroupsLength = mainChoice?.choiceGroups.length ?? 0;

  const canMoveUp = choiceGroupIndex > 0;
  const canMoveDown = choiceGroupIndex < choiceGroupsLength - 1;

  return (
    <Container
      header={<ChoiceGroupNameInput {...props} />}
      footer={
        <SpaceBetween justify="end">
          <Button
            onClick={() => moveChoiceGroup(choiceGroupIndex - 1)}
            disabled={!canMoveUp}
          >
            Move up
          </Button>
          <Button
            onClick={() => moveChoiceGroup(choiceGroupIndex + 1)}
            disabled={!canMoveDown}
          >
            Move down
          </Button>
          <Button onClick={removeChoiceGroup}>Remove</Button>
          <Button onClick={() => addChoiceGroup(choiceGroupIndex + 1)}>
            Add choice group
          </Button>
        </SpaceBetween>
      }
    >
      <SpaceBetween vertical size="s" stretchChildren>
        <h5>
          <strong>Choices</strong>
        </h5>

        <ChoicesAttributeEditor {...props} />
      </SpaceBetween>
    </Container>
  );
};
