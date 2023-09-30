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
      if (state[breakpoint] && value !== undefined) {
        return value;
      }
    }
    return defaultValue;
  }

  /** Creates a simpler re-usable function from `getMostSpecificFromMap` */
  public static createMostSpecificGetter(state: ResponsiveState) {
    return function <T>(
      map: Partial<Record<ResponsiveBreakpoint, T>> | undefined,
      defaultValue: T
    ) {
      return ResponsiveUtils.getMostSpecificFromMap(
        state,
        map ?? {},
        defaultValue
      );
    };
  }
}
