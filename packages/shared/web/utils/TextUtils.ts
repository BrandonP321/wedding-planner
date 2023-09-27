export class TextUtils {
  public static getBoldenedMatchedText(text: string, match: string) {
    const inputRegex = new RegExp(match, "gi");
    const modifiedText = text.replace(inputRegex, (match) => {
      return `<strong>${match}</strong>`;
    });

    return modifiedText;
  }
}
