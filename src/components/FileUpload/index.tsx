import Image from "next/image";
import React, { useState } from "react";

interface FileUploadProps {
  label: string;
  accept: string; // to allow only specific types like images/videos
  onFileChange: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept,
  onFileChange,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileChange(selectedFile);

      // Preview the file (for images/videos)
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="file-upload">
      <label>{label}</label>
      <input type="file" accept={accept} onChange={handleFileChange} />
      {preview && (
        <div className="file-preview">
          {accept.includes("image") ? (
            <Image
              src={preview}
              alt="Preview"
              style={{ width: "100px", height: "100px" }}
            />
          ) : (
            <video width="200" controls>
              <source src={preview} type={file?.type} />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
