import {
  ChangeEvent,
  useState,
  MouseEvent,
  useRef,
  DragEvent,
  useEffect,
  useMemo,
} from 'react';

import Progress from '../progress/Progress';
import styles from './Upload.module.css';
import useDragAndDrop from '../../hooks/use-draganddrop';
import useFileReader from '../../hooks/use-filereader';

interface UploadProps {
  fileType: string;
  maxFileSize: number;
  description: string;
  onUpload: (data: object[]) => void;
  onClose: () => void;
}

const Upload = ({
  fileType,
  maxFileSize,
  description,
  onUpload,
  onClose,
}: UploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>();
  const [isValidFile, setFileValidity] = useState<boolean>(false);
  const [isUploadActive, setUploadActive] = useState<boolean>(false);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const { dragOver, setDragOver, onDragEnter, onDragOver, onDragLeave } =
    useDragAndDrop();
  const { progress, data, setData } = useFileReader(
    useMemo(() => file, [file]),
    isUploadActive,
  );

  useEffect(() => {
    if (!data || !isUploadActive) {
      return;
    }

    onUpload(data);

    setFile(null);
    setData(null);
  }, [data, isUploadActive, setData, onUpload]);

  /**
   * File validation
   */
  const validateFile = (file: File) => {
    if (file.size > maxFileSize) {
      setError(`Fize size exceeds ${maxFileSize} KB`);

      return false;
    }

    return true;
  };

  /**
   * Clicked on file selection button
   */
  const handleClickSelect = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!hiddenFileInput.current) {
      return;
    }

    // Trigger file input click
    hiddenFileInput.current.click();
  };

  /**
   * File selected
   */
  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File = (event.target as EventTarget & { files: FileList })
      .files[0];

    if (!validateFile(file)) {
      setFileValidity(false);

      return;
    }

    setFileValidity(true);
    setError('');
    setFile(file);
  };

  /**
   * Clicked for file upload
   */
  const handleClickUpload = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setUploadActive(true);
  };

  /**
   * Clicked cancel
   */
  const handleClickCancel = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setUploadActive(false);
    onClose();
  };

  /**
   * File droped to the container
   */
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    console.log(event);

    setDragOver(false);

    // let files = [...e.dataTransfer.files];

    // if (event?.dataTransfer?.files?.length > 0) {
    //   console.log(e.dataTransfer.files);

    //   event.dataTransfer.clearData();
    // }
  };

  return (
    <div className={styles.container}>
      <form>
        <h3 className={styles.header}>Upload data</h3>
        <div className={styles.subheader}>{description}</div>
        <div className={styles.error}>{error}</div>

        <div
          className={`${styles.uploadContainer} ${
            dragOver ? styles.dragActive : ''
          }`}
          onDrop={handleDrop}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
        >
          <div>
            <span>Drag and drop your file OR </span>
            <button onClick={handleClickSelect}>Click</button>
            <span>here</span>
          </div>
          <input
            className={styles.input}
            ref={hiddenFileInput}
            type="file"
            accept={fileType}
            onChange={handleChangeFile}
          ></input>
        </div>

        {isUploadActive && <Progress percentage={progress} />}

        <button onClick={handleClickCancel}>X</button>
        <button onClick={handleClickCancel}>Cancel</button>
        <button
          disabled={!isValidFile || isUploadActive}
          onClick={handleClickUpload}
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
