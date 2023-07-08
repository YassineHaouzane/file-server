import { FileInfo, downloadFile, fetchData } from "../../../utils/file";
import FileSvg from "../../../assets/file.svg";
import "./FileCard.css";

const downloadFileHandler = (fileName: string) => () => {
  fetchData(fileName)
    .then((blob) => downloadFile(blob, fileName))
    .catch((err) => console.log(err));
};

export const FileCard = (fileInfo: FileInfo) => {
  return (
    <div className="fileCard" onClick={downloadFileHandler(fileInfo.name)}>
      <img src={FileSvg} alt="File logo" />
      <p style={{ overflow: "hidden" }}>{fileInfo.name}</p>
      <p>{Math.floor(fileInfo.filesize / 10000000)}</p>
    </div>
  );
};
