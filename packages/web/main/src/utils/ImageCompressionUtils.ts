import imageCompression, { Options } from "browser-image-compression";

export class ImageCompressionUtils {
  public static resizeImageToResolution(
    image: HTMLImageElement,
    fileName: string,
    width: number,
    height: number
  ) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(image, 0, 0, width, height);

    return new Promise<File>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const newFile = new File([blob], fileName, { type: "image/jpeg" });
        resolve(newFile);
      }, "image/jpeg");
    });
  }

  public static imageCompressionOptions: Options = {
    maxSizeMB: 0.5,
    alwaysKeepResolution: true,
    fileType: "image/jpeg",
  };

  public static compressImages = async (imageBlobs: File[]) => {
    // Resize all image to 1920x1080
    const resizedImages = await Promise.all(
      imageBlobs.map(async (img) => {
        const image = new Image();
        image.src = URL.createObjectURL(img);

        // Wait for image to load
        await new Promise((resolve, reject) => {
          image.onload = resolve;
          image.onerror = reject;
        });

        // TODO: Only resize images if resolution is greater than 1920x1080
        // Resize image to 1920x1080
        return await this.resizeImageToResolution(image, img.name, 1920, 1080);
      })
    );

    const compressedImages = await Promise.all(
      resizedImages.map((img) =>
        imageCompression(img, this.imageCompressionOptions)
      )
    );

    return compressedImages;
  };
}
