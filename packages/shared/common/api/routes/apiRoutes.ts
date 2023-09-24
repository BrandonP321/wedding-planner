import { APIHandlers } from "../../../api/handlers";

type APIPathsFromHandlers<T, P extends string = ""> = {
  [K in keyof T]: T[K] extends { nestedHandlers: infer U }
    ? `${P}/${string & K}` | APIPathsFromHandlers<U, `${P}/${string & K}`>
    : `${P}/${string & K}`;
}[keyof T];

type APIPath = APIPathsFromHandlers<typeof APIHandlers>;

const getTypedAPIRoutes = <T extends Record<string, APIPath>>(routes: T): T =>
  routes;

export const APIRoutes = getTypedAPIRoutes({
  ByeWorld: "/hello-world/bye-world",
  GetCitySuggestions: "/maps/citySuggestions",
});
