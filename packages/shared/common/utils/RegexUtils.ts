export class RegexUtils {
  /** Regex for password that contains a min of 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number */
  public static passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  /** Regex for a numeric phone number (no special characters) */
  public static phoneRegex = /^\d{10}$/;
}
