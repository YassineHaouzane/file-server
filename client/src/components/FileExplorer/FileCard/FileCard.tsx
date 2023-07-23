import {
  FileInfoResponse,
  HyperLink,
  downloadFile,
  fetchData,
  renameFile,
} from "../../../utils/file";
import FileSvg from "../../../assets/file.svg";
import "./FileCard.css";
import { MouseEventHandler, FocusEvent, ChangeEventHandler } from "react";
import { displayFormatedError } from "../../../utils/toast_facade";

type Props = {
  fileInfo: FileInfoResponse;
  rightClickHandler: MouseEventHandler;
  onEditFinished: ChangeEventHandler;
};

const downloadFileHandler =
  (selfHyperLink: HyperLink, fileName: string) => () => {
    fetchData(selfHyperLink.href)
      .then((blob) => downloadFile(blob, fileName))
      .catch((err) => displayFormatedError("Could not download file", err));
  };

const sendRenameRequest = (
  e: FocusEvent<HTMLInputElement>,
  fileInfo: FileInfoResponse,
  selfHyperLink: HyperLink,
  onEditFinished: ChangeEventHandler
) => {
  const newName = e.target.value;
  if (newName !== fileInfo.name) {
    renameFile(selfHyperLink, newName)
      .then((renamed) => {
        renamed ? onEditFinished(e) : (e.target.value = fileInfo.name);
      })
      .catch((err) => {
        e.target.value = fileInfo.name;
        displayFormatedError("Could not rename file", err);
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

const getSelfHyperLink = (fileInfo: FileInfoResponse) => {
  const selfHyperLink = fileInfo.links.find((link) => link.rel == "self");
  return selfHyperLink
    ? selfHyperLink
    : { rel: "self", href: `/file/${fileInfo.name}` };
};

export const FileCard: React.FC<Props> = ({
  fileInfo,
  rightClickHandler,
  onEditFinished,
}) => {
  const selfHyperLink: HyperLink = getSelfHyperLink(fileInfo);
  return (
    <div
      className="fileCard"
      onClick={downloadFileHandler(selfHyperLink, fileInfo.name)}
      onContextMenu={rightClickHandler}
    >
      <img src={FileSvg} alt="File logo" />
      <input
        onClick={(e) => e.stopPropagation()}
        onBlur={(e) =>
          sendRenameRequest(e, fileInfo, selfHyperLink, onEditFinished)
        }
        defaultValue={fileInfo.name}
        style={{ overflow: "hidden" }}
      />
      <p>{formatBytes(fileInfo.size)}</p>
    </div>
  );
};
