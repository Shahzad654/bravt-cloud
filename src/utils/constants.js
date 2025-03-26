// export const API_URL = "https://cloudbravt.centralindia.cloudapp.azure.com";
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080"

export const MAX_FILES_LIMIT = 3
export const MAX_FILE_SIZE = 10 * 1024 * 1024
export const ALLOWED_FILE_TYPES = {
  "image/jpeg": [],
  "image/jpg": [],
  "image/png": [],
  "image/webp": [],
  "image/avif": [],
  "image/svg+xml": [],
  "image/gif": []
}
