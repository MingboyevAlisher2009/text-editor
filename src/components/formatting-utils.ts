export const execCommand = (command: string, value?: string) => {
    try {
        return document.execCommand(command, false, value)
    } catch (error) {
        console.log(error);
    }
}