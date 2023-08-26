export type Size = "xxl" | "xl" | "l" | "m" | "s" | "xs" | "xxs";

export type ClassesProp<T extends string> = {
  [key in T]?: string;
};

export type HTMLButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
