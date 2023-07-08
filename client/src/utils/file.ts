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

export type FileInfo = {
    name: string,
    filesize: number
}

export async function fetchFileData() {
    const response = await fetch('/file');
    const body = (await response.json()) as FileInfo[];
    return body
}