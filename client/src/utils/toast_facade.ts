import { toast } from "react-toastify";

export function displayError(message: string) {
    toast(message, {
        type: "error",
        position: "bottom-right",
    })
}

export function displayFormatedError(message: string, err: unknown) {
    displayError(`${message} ${JSON.stringify(err)}`);
}

export function displaySuccess(message: string) {
    toast(message, {
        type: "success",
        position: "bottom-right",
    })
}

