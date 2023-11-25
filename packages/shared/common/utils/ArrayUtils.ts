export class ArrayUtils {
  /** Moves an item to a new index within an array */
  public static move<T>(array: T[], from: number, to: number) {
    if (to < 0) {
      to = 0;
    } else if (to >= array.length) {
      to = array.length;
    }

    array.splice(to, 0, array.splice(from, 1)[0]);
  }
}
