import { useState } from "react";
import { fetchFile } from "../../utils/file";
import { FileUploader } from "react-drag-drop-files";
import { displayFormatedError, displaySuccess } from "../../utils/toast_facade";

const fileTypes = ["JPG", "PNG", "GIF", "MP4"];

export function Uploader() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const handleChange = (file: File) => {
    setFile(file);
  };

  const sendFileHandler = () => {
    fetchFile(file!)
      .then(() => displaySuccess(`File ${file!.name} has been uploaded`))
      .catch((err) => displayFormatedError("Could not upload file", err));
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
