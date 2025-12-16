import React, { useState } from "react";

export default function FileUploader() {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [status,setStatus] = useState("");
    const [uploading, setUploading] = useState(false);


    const handleUpload = () =>{
        if(!file) return;

        setUploading(true);
        setStatus("");
        setProgress(0);


        const xhr = new XMLHttpRequest();

        const formData = new FormData();

        formData.append("file", file);

        xhr.upload.onprogress=(e) =>{
              if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                setProgress(percent);
            }
        }

         xhr.onload = () => {
            setUploading(false);
            if (xhr.status === 200) {
                setStatus("Upload successful ✅");
            } else {
                setStatus("Upload failed ❌");
            }
        };

          xhr.onerror = () => {
        setUploading(false);
        setStatus("Network error ❌");
        };

        xhr.open("POST", "/upload");
        xhr.send(formData);

    }
    
    return (
    <div style={{ width: 300 }}>
      <input
        type="file"
        disabled={uploading}
        onChange={(e) => {
          const files = e.target.files;
          setFile(files && files.length > 0 ? files[0] : null);
        }}
      />

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {uploading && (
        <div>
          <progress value={progress} max="100" />
          <span>{progress}%</span>
        </div>
      )}

      {status && <p>{status}</p>}
    </div>
    )

}