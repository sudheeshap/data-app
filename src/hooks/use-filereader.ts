import { useEffect, useState } from 'react';

import csvToArray from '../utils/upload';

export default function useFileReader(file: File | null, isActive: boolean) {
  const [progress, setProgress] = useState<number>(0);
  const [data, setData] = useState<object[] | null>(null);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    /**
     * Parse file
     */
    const parse = () => {
      const reader = new FileReader();

      reader.onload = function (event) {
        let data;

        // CSV file
        if (file?.type === 'text/csv') {
          const text: string = String((event.target as FileReader).result);

          data = csvToArray(text);
        }

        if (data) {
          setData(data);
        }
      };

      reader.onprogress = function (event) {
        if (event.lengthComputable) {
          var percentage = (event.loaded / event.total) * 100;

          setProgress(percentage);
        }
      };

      if (file) {
        reader.readAsText(file);
      }
    };

    parse();
  }, [file, isActive]);

  return {
    progress,
    data,
    setData,
  };
}
