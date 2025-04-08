// hooks/useCloudinaryUpload.ts
import { useState } from "react"
import axios from "axios"

export function useCloudinaryUpload() {
  const [uploading, setUploading] = useState(false)
  const [publicId, setPublicId] = useState<string | null>(null)

  const uploadImage = async (file: File, uploadPreset: string) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", uploadPreset)

    setUploading(true)
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      )
      const data = res.data
      setPublicId(data.public_id)
      return data
    } catch (error) {
      console.error("Upload failed:", error)
      throw error
    } finally {
      setUploading(false)
    }
  }

  return {
    uploadImage,
    uploading,
    publicId,
    setPublicId,
  }
}
