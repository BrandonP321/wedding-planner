import { addYupPasswordMethods } from "./passwordMethods";
import { addYupAccountMethods } from "./accountMethods";
import { addYupDefaultMethods } from "./defaultYupMethods";

export function addCustomYupMethods() {
  addYupDefaultMethods();
  addYupAccountMethods();
  addYupPasswordMethods();
}
