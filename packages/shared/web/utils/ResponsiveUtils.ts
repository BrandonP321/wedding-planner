import { ResponsiveState } from "../store";
import { ResponsiveBreakpoint } from "../types/repsonsive";

export class ResponsiveUtils {
  /** Breakpoints ordered smallest to largest */
  public static breakpointsSmallToLarge: ResponsiveBreakpoint[] = [
    ResponsiveBreakpoint.PICO,
    ResponsiveBreakpoint.TINY,
    ResponsiveBreakpoint.MOBILE,
    ResponsiveBreakpoint.MEDIUM,
    ResponsiveBreakpoint.LARGE,
    ResponsiveBreakpoint.MAX,
  ];

  public static getMostSpecificFromMap<T>(
    state: ResponsiveState,
    map: Partial<Record<ResponsiveBreakpoint, T>>,
    defaultValue: T
  ): T {
    for (const breakpoint of ResponsiveUtils.breakpointsSmallToLarge) {
      const value = map[breakpoint];
      if (state[breakpoint] && value) {
        return value;
      }
    }
    return defaultValue;
  }
}
