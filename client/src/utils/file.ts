export type FileInfo = {
    name: string,
    filesize: number
}

export async function fetchData(fileName: string) {
    const response = await fetch(`/file/${fileName}`);
    const blob = await response.blob();
    return new Blob([blob]);
}

export function downloadFile(blob: Blob, fileName: string) {
    const file_url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = file_url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
}

export function fetchFile(file: File) {
    const data = new FormData();
    data.append("files", file);
    return fetch("/file", { method: "POST", body: data });
}

export async function removeFile(file: FileInfo) {
    const response = await fetch(`/file/${file.name}`, { method: "DELETE" });
    const content = await response.json() as FileInfo;
    return content !== undefined;
}

export async function renameFile(file: FileInfo, newName: string) {
    const newFileInfo = { name: newName } as FileInfo;
    const response = await fetch(`/file/${file.name}`, {
        method: "PATCH", headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify(newFileInfo)
    });
    const content = await response.json() as FileInfo;
    return content !== undefined;
}



export async function fetchFileData() {
    const response = await fetch('/file');
    const body = (await response.json()) as FileInfo[];
    return body
}