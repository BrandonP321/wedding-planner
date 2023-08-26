export type Size = "xxl" | "xl" | "l" | "m" | "s" | "xs" | "xxs" | "n";

export type ClassesProp<T extends string> = {
  [key in T]?: string;
};

export type HTMLButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type HTMLInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
