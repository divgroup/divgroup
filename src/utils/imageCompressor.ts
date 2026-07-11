/**
 * Client-side image compression utility using HTML5 Canvas.
 * Resizes the image to a maximum dimension while maintaining aspect ratio,
 * and exports it as a compressed JPEG to minimize data size for localStorage.
 */
export function compressImage(
  file: File,
  maxWidth: number = 1200,
  maxHeight: number = 1200,
  quality: number = 0.75
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If it's not an image, reject immediately
    if (!file.type.startsWith("image/")) {
      reject(new Error("File is not an image."));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions maintaining aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            // Fallback to original read if canvas context fails
            resolve(event.target?.result as string);
            return;
          }

          // Fill with white background to handle transparent PNGs nicely when saving as JPEG
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, width, height);

          ctx.drawImage(img, 0, 0, width, height);

          // Convert to highly compressed JPEG
          const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(compressedDataUrl);
        } catch (error) {
          // Fallback to original base64 if anything goes wrong during canvas processing
          resolve(event.target?.result as string);
        }
      };
      img.onerror = () => {
        reject(new Error("Failed to load image into memory"));
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
}
