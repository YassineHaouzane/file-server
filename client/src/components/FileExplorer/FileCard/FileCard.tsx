import {
  FileInfo,
  downloadFile,
  fetchData,
  renameFile,
} from "../../../utils/file";
import FileSvg from "../../../assets/file.svg";
import "./FileCard.css";
import { MouseEventHandler, FocusEvent, ChangeEventHandler } from "react";

type Props = {
  fileInfo: FileInfo;
  rightClickHandler: MouseEventHandler;
  onEditFinished: ChangeEventHandler;
};

const downloadFileHandler = (fileName: string) => () => {
  fetchData(fileName)
    .then((blob) => downloadFile(blob, fileName))
    .catch((err) => console.log(err));
};

const sendRenameRequest = (
  e: FocusEvent<HTMLInputElement>,
  fileInfo: FileInfo,
  onEditFinished: ChangeEventHandler
) => {
  const newName = e.target.value;
  if (newName !== fileInfo.name) {
    renameFile(fileInfo, newName)
      .then((renamed) => {
        renamed ? onEditFinished(e) : (e.target.value = fileInfo.name);
      })
      .catch((err) => {
        e.target.value = fileInfo.name;
        console.log(err);
      });
  }
};

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 B";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export const FileCard: React.FC<Props> = ({
  fileInfo,
  rightClickHandler,
  onEditFinished,
}) => {
  return (
    <div
      className="fileCard"
      onClick={downloadFileHandler(fileInfo.name)}
      onContextMenu={rightClickHandler}
    >
      <img src={FileSvg} alt="File logo" />
      <input
        onClick={(e) => e.stopPropagation()}
        onBlur={(e) => sendRenameRequest(e, fileInfo, onEditFinished)}
        defaultValue={fileInfo.name}
        style={{ overflow: "hidden" }}
      />
      <p>{formatBytes(fileInfo.filesize)}</p>
    </div>
  );
};
