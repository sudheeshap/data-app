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
import styles from './Upload.module.scss';
import useDragAndDrop from '../../hooks/use-draganddrop';
import useFileReader from '../../hooks/use-filereader';
import Button from '../button/Button';

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
    const type = fileType.replace('.', '');

    if (!file || file.type.indexOf(type) === -1) {
      setError('Invalid file');

      return false;
    }

    if (file.size > maxFileSize) {
      setError(`Fize size exceeds ${maxFileSize / 1024} KB`);

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

    handleFile(file);
  };

  /**
   * Handle file operation
   */
  const handleFile = (file: File) => {
    if (!validateFile(file)) {
      setFileValidity(false);

      return;
    }

    setFileValidity(true);
    setError('');
    setFile(file);
    setUploadActive(false);
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

    setDragOver(false);

    if (event?.dataTransfer?.files?.length > 0) {
      handleFile(event.dataTransfer.files[0]);

      event.dataTransfer.clearData();
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h3 className={styles.header}>
          <span>Upload data</span>
          <Button
            className={styles.btnClose}
            onClick={handleClickCancel}
            variant="default"
            icon="bi-x"
          />
        </h3>
        <div className={styles.subheader}>{description}</div>
        <div
          className={`${styles.uploadContainer} ${
            dragOver ? styles.dragActive : ''
          }`}
          onDrop={handleDrop}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
        >
          <div className={styles.dragContainer}>
            <div className={styles.linkContainer}>
              <span>Drag and drop your file OR </span>
              <Button onClick={handleClickSelect} variant="link">
                <span>Click</span>
              </Button>
              <span>here</span>
            </div>
            <i className={`${styles.uploadIcon} bi-cloud-upload-fill`} />
          </div>
          <input
            className={styles.input}
            ref={hiddenFileInput}
            type="file"
            accept={fileType}
            onChange={handleChangeFile}
          ></input>
        </div>
        <div className={styles.error}>{error}</div>
        {!error && isUploadActive && <Progress percentage={progress} />}
      </form>
      <div className={styles.footerButtons}>
        <Button
          className={styles.btnCancel}
          onClick={handleClickCancel}
          variant="dark"
        >
          {isUploadActive && <span>Close</span>}
          {!isUploadActive && <span>Cancel</span>}
        </Button>
        <Button
          isDisabled={!isValidFile || isUploadActive}
          className={styles.btnUpload}
          onClick={handleClickUpload}
        >
          <span>Upload</span>
        </Button>
      </div>
    </div>
  );
};

export default Upload;
