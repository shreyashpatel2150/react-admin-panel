import { IconType } from "react-icons";
import { AppFile } from "../../classses/AppFile";
import { AppImage } from "../../classses/AppImage";
import { fileIcons } from "../../consts";
import { JSX } from "react";
import { MdClose } from "react-icons/md";

type DroppableSelectedFileProps = {
    selectedFile: AppImage | AppFile
    onDelete?: () => void
}

function renderFileIcon(file: AppFile): JSX.Element {
     const Icon: IconType = fileIcons[file.getIcon()]
     return <Icon />
}

const DroppableSelectedFile: React.FC<DroppableSelectedFileProps> = ({ selectedFile, onDelete }) => {
    if (
        selectedFile instanceof AppImage &&
        selectedFile.isImage &&
        selectedFile.filename
    ) {
        return (
            <div className="relative w-25 h-25 group inline-block">
                <img
                    src={selectedFile.getThumbnail()}
                    className="w-25 h-25"
                    alt=""
                />
                {onDelete && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        className="absolute top-0 right-0 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete file"
                    >
                        <MdClose size={16} />
                    </button>
                )}
            </div>
        );
    }

    if (
        selectedFile instanceof AppFile &&
        selectedFile.filename
    ) {
        return (
            <div className="relative group inline-flex items-center gap-2">
                {renderFileIcon(selectedFile)}
                {onDelete && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete file"
                    >
                        <MdClose size={16} />
                    </button>
                )}
            </div>
        );
    }

    return null;
}

export default DroppableSelectedFile