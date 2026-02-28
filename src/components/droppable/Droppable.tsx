import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone, type Accept } from "react-dropzone"
import { fileToTemplate } from "../../utils/misc";
import { AppFile } from "../../classses/AppFile";
import DroppableSelectedFile from "./DroppableSelectedFile";
import { AppImage } from "../../classses/AppImage";
import { commonFile } from "../../interfaces/Common";

type DroppableProps = {
    onDrop: (acceptedFiles: File[]) => void,
    maxFiles?: number,
    accept?: Accept
}

type DroppablePageProps = {
    multiple?: boolean,
    accept?: Accept,
    onFileSelect: (files: commonFile[]) => void,
    uploadedFiles?: commonFile[] | commonFile
}

const Droppable: React.FC<DroppablePageProps> = ({ multiple = false, accept, onFileSelect, uploadedFiles }) => {
    const [selectedFiles, setSelectedFiles] = useState<(commonFile)[]>([])
    
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        try {
            // Convert all files in parallel and wait for all conversions to complete
            const images: (AppFile | AppImage)[] = await Promise.all(
                acceptedFiles.map((img) => fileToTemplate(img))
            );

            setSelectedFiles(images);
            onFileSelect(images)
        } catch (err) {
            // If one conversion fails you can either fail whole batch (Promise.all)
            // or use Promise.allSettled to handle per-file errors separately.
            console.error('Error converting files', err);
        }
    }, []);

    const defaultDropableProps: DroppableProps = useMemo(() => ({
        onDrop,
        accept: {
            "image/png": [],
            "image/jpeg": [],
            "image/webp": [],
            "image/svg+xml": [],
        }
    }), [onDrop])
    const [config, setConfig] = useState<DroppableProps>(defaultDropableProps)
    const { getRootProps, getInputProps, isDragActive } = useDropzone(config)

    useEffect(() => {
        const newConfig = config
        const maxFiles = multiple ? 10 : 1
        newConfig.maxFiles = maxFiles
        if (accept) {
            newConfig.accept = accept
        }

        setConfig(newConfig)
    }, [multiple])

    useEffect(() => {
        if (uploadedFiles) {
            if (Array.isArray(uploadedFiles)) {
                setSelectedFiles(uploadedFiles)
            } else {
                setSelectedFiles([uploadedFiles])
            }
        }
    }, [uploadedFiles])

    const handleDeleteFile = (fileToDelete: commonFile) => {
        const updatedFiles = selectedFiles.filter(file => file?.uuid !== fileToDelete?.uuid)
        setSelectedFiles(updatedFiles)
        onFileSelect(updatedFiles)
    }

    const placeholder = multiple ? 'Browse Files' : 'Browse File'

    const uploadIcon = (
        <div className="flex h-[68px] w-[68px]  items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            <svg
                className="fill-current"
                width="29"
                height="28"
                viewBox="0 0 29 28"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                />
            </svg>
        </div>
    );

    return (
        <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
            <div className={`dropzone rounded-xl   border-dashed border-gray-300 p-7 lg:p-10
                ${
                    isDragActive
                        ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                        : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
                }
            `} id="demo-upload" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="dz-message flex flex-col items-center m-0!">
                    <div className="mb-[22px] flex justify-center">
                        {!selectedFiles.length && uploadIcon}
                    </div>
                    <div className="mb-4 flex items-center gap-3 overflow-x-auto">
                        {selectedFiles.length > 0 && selectedFiles.map((file) => {
                            return <DroppableSelectedFile selectedFile={file} key={file?.uuid} onDelete={() => handleDeleteFile(file)} />
                        })}
                    </div>
                    {!selectedFiles.length && (
                        <>
                            <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
                                {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
                            </h4>
                            <span className="font-medium underline text-theme-sm text-brand-500">
                                {placeholder}
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Droppable