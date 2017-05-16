export function intoRange(min, val, max) {
  if (val < min) {
    return min
  } else if (val > max) {
    return max
  }
  return val
}

export function convertToCssPercentage(percentage) {
  return `${Math.floor(percentage * 100)}%`
}
export function randomString(length) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}


export const statusStringMap = {
  CLASSIFICATION_STARTING: 'Classifying...',
  CLASSIFICATION_FAILED_INVALID_INPUT: 'Error during classification',
  CLASSIFICATION_FAILED_DARKNET_FAILED: 'Error during classification',
  CLASSIFICATION_FAILED_UNKNOWN: 'Error during classification',
}

export function getImageStatus(image) {
  if (image.status) {
    return statusStringMap[image.status]
  }
  if (!image.classificationStart) {
    return 'In queue...'
  }
  if (!image.classificationDuration) {
    return 'Classifying...'
  }
  return 'Classified'
}

export function humanReadableFileSize(bytes) {
  let size = bytes
  if (size < 1000) {
    return `${size}B`
  }
  size /= 1000
  if (size < 1000) {
    return `${size}KB`
  }
  size = Math.round(size) / 1000
  return `${size}MB`
}
