import { IconType } from "react-icons";
import { AppFile } from "../../classses/AppFile";
import { AppImage } from "../../classses/AppImage";
import { fileIcons } from "../../consts";
import { JSX } from "react";

type DroppableSelectedFileProps = {
    selectedFile: AppImage | AppFile
}

function renderFileIcon(file: AppFile): JSX.Element {
     const Icon: IconType = fileIcons[file.getIcon()]
     return <Icon />
}

const DroppableSelectedFile: React.FC<DroppableSelectedFileProps> = ({ selectedFile }) => {
    if (
        selectedFile instanceof AppImage &&
        selectedFile.isImage &&
        selectedFile.filename
    ) {
        return (
            <img
                src={selectedFile.getThumbnail()}
                className="w-25 h-25"
                alt=""
            />
        );
    }

    if (
        selectedFile instanceof AppFile &&
        selectedFile.filename
    ) {
        return renderFileIcon(selectedFile);
    }

    return null;
}

export default DroppableSelectedFile