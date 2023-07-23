import { Dispatch, Fragment, MouseEvent, useEffect, useState } from "react";
import {
  FileInfo,
  FileInfoResponse,
  fetchFileData,
  removeFile,
} from "../../utils/file";
import { Spinner } from "../Spinner/Spinner";
import { FileCard } from "./FileCard/FileCard";
import { Menu } from "./Menu/Menu";
import { displayFormatedError } from "../../utils/toast_facade";

type ResponseStatus = FileInfoResponse[] | undefined;
type Coordinates = { x: number; y: number };

const onRemove =
  (
    filesInfo: FileInfoResponse[],
    fileInfo: FileInfo,
    setFilesInfo: Dispatch<ResponseStatus>
  ) =>
  () => {
    removeFile(fileInfo)
      .then((removed) =>
        removed
          ? setFilesInfo(
              filesInfo.filter((elt) => !(elt.name === fileInfo.name))
            )
          : undefined
      )
      .catch((err) => displayFormatedError("Could not remove the file", err));
  };

const rightClickHandler =
  (
    fileInfo: FileInfo,
    setClicked: Dispatch<FileInfo>,
    setPoints: Dispatch<Coordinates>
  ) =>
  (e: MouseEvent) => {
    e.preventDefault();
    setClicked(fileInfo);
    setPoints({
      x: e.pageX,
      y: e.pageY,
    });
  };

export function FileExplorer() {
  const [filesInfo, setFilesInfo] = useState<ResponseStatus>(undefined);
  const [clicked, setClicked] = useState<FileInfo | undefined>(undefined);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });

  const setUpListeners = () => {
    const handleClick = () => setClicked(undefined);
    window.addEventListener("click", handleClick);
    return () => {
      // Clean up the event listener
      window.removeEventListener("click", handleClick);
    };
  };

  useEffect(() => {
    fetchFileData()
      .then((filesInfo) => setFilesInfo(filesInfo))
      .catch((err) => displayFormatedError("Cannot fetch file data", err));
    return setUpListeners();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {filesInfo && filesInfo.length > 0 ? (
        filesInfo.map((fileInfo) => {
          return (
            <Fragment key={fileInfo.name}>
              {clicked && clicked.name === fileInfo.name && (
                <Menu
                  y={points.y}
                  x={points.x}
                  onRemove={onRemove(filesInfo, fileInfo, setFilesInfo)}
                />
              )}
              <FileCard
                fileInfo={fileInfo}
                rightClickHandler={rightClickHandler(
                  fileInfo,
                  setClicked,
                  setPoints
                )}
                onEditFinished={(e: React.ChangeEvent<HTMLInputElement>) => {
                  fileInfo.name = e.target.value;
                  const newFileInfo = [...filesInfo];
                  newFileInfo[newFileInfo.indexOf(fileInfo)] = fileInfo;
                  setFilesInfo(newFileInfo);
                }}
              />
            </Fragment>
          );
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
}
