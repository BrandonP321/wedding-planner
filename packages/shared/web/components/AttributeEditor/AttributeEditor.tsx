import React from "react";
import styles from "./AttributeEditor.module.scss";
import classNames from "classnames";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";
import {
  ListSpaceBetween,
  SpaceBetweenListItem,
} from "../SpaceBetween/ListSpaceBetween";
import { Button } from "../Button";

export type AttributeEditorDefinitionProps<T> = {
  item: T;
  index: number;
};

export type AttributeEditorDefinition<T> = {
  label: string;
  control: (props: AttributeEditorDefinitionProps<T>) => JSX.Element;
};

export type AttributeEditorProps<T> = {
  definition: AttributeEditorDefinition<T>[];
  items: T[];
  addButtonText: string;
  maxRows?: number;
  onRemoveButtonClick: (index: number) => void;
  onAddButtonClick: () => void;
};

export function AttributeEditor<T>({
  definition,
  items,
  addButtonText,
  maxRows,
  onAddButtonClick,
  onRemoveButtonClick,
}: AttributeEditorProps<T>) {
  const isDisabled = maxRows && items.length >= maxRows;

  return (
    <SpaceBetween
      size="m"
      classes={{ root: classNames(styles.editor) }}
      vertical
    >
      <SpaceBetween size="s" vertical stretch>
        {items.map((item, i) => {
          return (
            <SpaceBetween stretch>
              <ListSpaceBetween
                key={i}
                classes={{ root: styles.row }}
                itemsPerRow={definition.length}
              >
                {definition.map((d, j) => {
                  const { control: Content } = d;

                  return (
                    <SpaceBetweenListItem key={j}>
                      <Content index={i} item={item} />
                    </SpaceBetweenListItem>
                  );
                })}
              </ListSpaceBetween>

              <Button onClick={() => onRemoveButtonClick(i)}>Remove</Button>
            </SpaceBetween>
          );
        })}
      </SpaceBetween>

      <Button onClick={() => onAddButtonClick()} disabled={!!isDisabled}>
        {addButtonText}
      </Button>
    </SpaceBetween>
  );
}
