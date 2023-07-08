import { useState } from "react";
import { fetchFile } from "../../utils/file";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

export function Uploader() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const handleChange = (file: File) => {
    setFile(file);
  };

  const sendFileHandler = () => {
    fetchFile(file!)
      .then(() => console.log("uploaded"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      {file !== undefined && (
        <button onClick={sendFileHandler}>Send file</button>
      )}
    </>
  );
}
