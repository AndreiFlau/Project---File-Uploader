function isImage(fileExtension) {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".tiff", ".svg"];

  const lowercaseExt = fileExtension.toLowerCase();

  return imageExtensions.includes(lowercaseExt);
}

module.exports = isImage;
