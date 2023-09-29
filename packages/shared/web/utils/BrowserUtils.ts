export class BrowserUtils {
  public static getIsTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };

  public static setTouchStatusHTMLClass = () => {
    document.documentElement.classList.add(
      BrowserUtils.getIsTouchDevice() ? "touch" : "no-touch"
    );
  };
}
