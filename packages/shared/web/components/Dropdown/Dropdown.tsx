import { useEffect, useState } from "react";
import styles from "./Dropdown.module.scss";
import { Button } from "../Button";
import { DropdownList } from "../DropdownList/DropdownList";

export type DropdownOption<Value> = {
  label: string;
  value: Value;
};

export type DropdownProps<Value extends string> = {
  options: DropdownOption<Value>[];
  selected?: DropdownOption<Value>;
  onOptionClick: (option: DropdownOption<Value>) => void;
  placeholder?: string;
  optionsStaticPosition?: boolean;
};

export const Dropdown = <V extends string>({
  onOptionClick,
  options,
  placeholder,
  selected,
  optionsStaticPosition = true,
}: DropdownProps<V>) => {
  const [selectedOption, setSelectedOption] = useState(
    selected ?? (placeholder ? undefined : options[0])
  );
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    document.addEventListener("click", () => setShowOptions(false));
  }, []);

  const toggleDropdown = () =>
    requestAnimationFrame(() => setShowOptions(!showOptions));

  const handleOptionClick = (option: DropdownOption<V>) => {
    setShowOptions(false);
    setSelectedOption(option);
    onOptionClick?.(option);
  };

  return (
    <div className={styles.wrapper}>
      <Button classes={{ root: styles.dropdown }} onClick={toggleDropdown}>
        {selectedOption?.label ?? placeholder}
      </Button>
      {showOptions && (
        <DropdownList
          options={options}
          onOptionClick={handleOptionClick}
          staticPosition={optionsStaticPosition}
        >
          {(option) => option.label}
        </DropdownList>
      )}
    </div>
  );
};
