import { ChangeEvent, useState, MouseEvent, useRef, DragEvent } from 'react';

import Progress from '../progress/Progress';
import styles from './Upload.module.css';

export default function Upload() {
  const [csvFile, setCsvFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClickSelect = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!hiddenFileInput.current) {
      return;
    }

    // Trigger file input click
    hiddenFileInput.current.click();
  };

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File = (event.target as EventTarget & { files: FileList })
      .files[0];

    console.log(file);

    setCsvFile(file);
  };

  const handleClickParse = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    parse();
  };

  const parse = () => {
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = (e.target as FileReader).result;

      console.log(text);
    };

    reader.onprogress = function (event) {
      if (event.lengthComputable) {
        var percentage = (event.loaded / event.total) * 100;

        console.log(percentage);

        setProgress(percentage);
      }
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  const handleClickCancel = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    parse();
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    console.log(event);

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
        <div className={styles.subheader}>
          Only upload csv files, and not more than 500kb
        </div>

        <div
          className={styles.uploadContainer}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
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
            accept=".csv"
            onChange={handleChangeFile}
          ></input>
        </div>

        <Progress percentage={progress} />

        <button onClick={handleClickCancel}>X</button>
        <button onClick={handleClickCancel}>Cancel</button>
        <button onClick={handleClickParse}>Upload</button>
      </form>
    </div>
  );
}
