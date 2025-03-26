import { message } from "antd"
import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
  MAX_FILES_LIMIT
} from "../utils/constants"

export function useFilesSelect(disabled, inputRef) {
  const [files, setFiles] = useState([])

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length) {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )

      setFiles((prev) => [...newFiles, ...prev])
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }

  const dropzone = useDropzone({
    onDrop,
    disabled,
    accept: ALLOWED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    maxFiles: MAX_FILES_LIMIT,
    multiple: true,
    onDropRejected: (rejections) => {
      rejections.forEach(({ file, errors }) => {
        errors.forEach((err) => {
          switch (err.code) {
            case "too-many-files":
              message.open({
                type: "error",
                key: err.code,
                duration: 3,
                content: `Maximum of ${MAX_FILES_LIMIT} files are allowed.`
              })
              break

            case "file-invalid-type":
              message.error(`"${file.name}" is not a valid image.`)
              break

            case "file-too-large":
              message.error(
                `"${file.name}" exceeds the ${MAX_FILE_SIZE / 1024 / 1024} limit.`
              )
              break

            default:
              message.error(`"${file.name}" was rejected.`)
              break
          }
        })
      })
    }
  })

  const removeFile = (idx) => {
    return (evt) => {
      evt.preventDefault()
      evt.stopPropagation()
      setFiles((prev) => {
        const updatedFiles = prev.filter((_, i) => i !== idx)
        return updatedFiles
      })
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }

  useEffect(() => {
    return () => {
      if (!files) return
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { files, setFiles, removeFile, ...dropzone }
}
