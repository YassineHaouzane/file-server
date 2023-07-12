import { Dispatch, Fragment, MouseEvent, useEffect, useState } from "react";
import { FileInfo, fetchFileData, removeFile } from "../../utils/file";
import { Spinner } from "../Spinner/Spinner";
import { FileCard } from "./FileCard/FileCard";
import { Menu } from "./Menu/Menu";

const onRemove =
  (
    filesInfo: FileInfo[],
    fileInfo: FileInfo,
    setFilesInfo: Dispatch<FileInfo[] | undefined>
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
      .catch((err) => console.log(err));
  };

const rightClickHandler =
  (
    setClicked: Dispatch<boolean>,
    setPoints: Dispatch<{ x: number; y: number }>
  ) =>
  (e: MouseEvent) => {
    e.preventDefault();
    setClicked(true);
    setPoints({
      x: e.pageX,
      y: e.pageY,
    });
    console.log("Right Click", e.pageX, e.pageY);
  };

export function FileExplorer() {
  const [filesInfo, setFilesInfo] = useState<undefined | FileInfo[]>(undefined);
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });

  const setUpListeners = () => {
    const handleClick = () => setClicked(false);
    window.addEventListener("click", handleClick);
    return () => {
      // Clean up the event listener
      window.removeEventListener("click", handleClick);
    };
  };

  useEffect(() => {
    fetchFileData()
      .then((filesInfo) => setFilesInfo(filesInfo))
      .catch((err) => console.log(err));
    setUpListeners();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {filesInfo && filesInfo.length > 0 ? (
        filesInfo.map((fileInfo) => {
          return (
            <Fragment key={fileInfo.name}>
              {clicked && (
                <Menu
                  y={points.y}
                  x={points.x}
                  onRemove={onRemove(filesInfo, fileInfo, setFilesInfo)}
                />
              )}
              <FileCard
                fileInfo={fileInfo}
                rightClickHandler={rightClickHandler(setClicked, setPoints)}
                onEditFinished={(e: React.ChangeEvent<HTMLInputElement>) => {
                  // This code is so bad
                  console.log(e.target.value);
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
