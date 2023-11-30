type ImageProps = {
  bucket: string;
  key: string;
};

const imageEndpoint = "https://d3yos5qm7ri17.cloudfront.net/";

export class ImageUtils {
  public static getImageUrl = (props: ImageProps) => {
    const stringifiedProps = JSON.stringify(props);
    const encodedProps = btoa(stringifiedProps);

    return `${imageEndpoint}${encodedProps}`;
  };
}
