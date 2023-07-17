import React, { useState } from "react"

const MultipleFileUploader = () => {
  const [files, setFiles] = useState<FileList | null>(null)
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"
  >("initial")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus("initial")
      setFiles(e.target.files)
    }
  }

  const handleUpload = async () => {
    if (files) {
      setStatus("uploading")

      const formData = new FormData()

      ;[...files].forEach((file) => {
        formData.append("files", file)
      })

      try {
        const result = await fetch("https://httpbin.org/post", {
          method: "POST",
          body: formData,
        })

        const data = await result.json()

        console.log(data)
        setStatus("success")
      } catch (error) {
        console.error(error)
        setStatus("fail")
      }
    }
  }

  return (
    <>
      <div className="input-group">
        <label htmlFor="file" className="sr-only">
          Choose files
        </label>
        <input id="file" type="file" multiple onChange={handleFileChange} />
      </div>
      {files &&
        [...files].map((file, index) => (
          <section key={file.name}>
            File number {index + 1} details:
            <ul>
              <li>Name: {file.name}</li>
              <li>Type: {file.type}</li>
              <li>Size: {file.size} bytes</li>
            </ul>
          </section>
        ))}

      {files && (
        <button onClick={handleUpload} className="submit">
          Upload {files.length > 1 ? "files" : "a file"}
        </button>
      )}

      <Result status={status} />
    </>
  )
}

const Result = ({ status }: { status: string }) => {
  if (status === "success") {
    return <p>✅ Uploaded successfully!</p>
  } else if (status === "fail") {
    return <p>❌ Upload failed!</p>
  } else if (status === "uploading") {
    return <p>⏳ Uploading started...</p>
  } else {
    return null
  }
}

export default MultipleFileUploader