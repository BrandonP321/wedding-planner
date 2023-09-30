import { ResponsiveBreakpoint } from "../types/repsonsive";

export type Size = "xxl" | "xl" | "l" | "m" | "s" | "xs" | "xxs" | "n";

export type ClassesProp<T extends string> = {
  [key in T]?: string;
};

export type ResponsiveProps<K extends string, T> = {
  [key in K]?: T;
} & {
  [key in `responsive${Capitalize<K>}`]?: Partial<
    Record<ResponsiveBreakpoint, T>
  >;
};

export type HTMLButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type HTMLInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
