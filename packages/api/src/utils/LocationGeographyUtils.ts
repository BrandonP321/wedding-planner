export class locationGeographyUtils {
  public static milesToMeters = (miles: number) => {
    return miles * 1609.34;
  };

  public static metersToMiles = (meters: number) => {
    return meters / 1609.34;
  };
}
