import { useEffect, useState } from "react";
import { FileInfo, fetchFileData } from "../../utils/file";
import { Spinner } from "../Spinner/Spinner";
import { FileCard } from "./FileCard/FileCard";

export function FileExplorer() {
  const [filesInfo, setFilesInfo] = useState<undefined | FileInfo[]>(undefined);

  useEffect(() => {
    fetchFileData()
      .then((filesInfo) => setFilesInfo(filesInfo))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {filesInfo && filesInfo.length > 0 ? (
        filesInfo.map((fileInfo) => {
          return <FileCard key={fileInfo.name} {...fileInfo} />;
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
}
