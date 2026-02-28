import {
  FaFileExcel,
  FaFileWord,
  FaFilePowerpoint,
  FaFilePdf,
  FaFileAlt,
} from "react-icons/fa";
import { IconType } from "react-icons";

export const fileIcons: Record<string, IconType> = {
    'excel': FaFileExcel,
    'pdf': FaFilePdf,
    'word': FaFileWord,
    'powerpoint': FaFilePowerpoint,
    'file': FaFileAlt
};

export const appUrl = import.meta.env.VITE_APP_URL || '';