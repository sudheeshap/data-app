import { Dictionary } from '../shared/dictionary.interface';

const csvToArray = (str: string, delimiter = ','): object[] => {
  // Generate headers (From first line)
  const headers = str
    .slice(0, str.indexOf('\n'))
    .replaceAll(', ', ',')
    .split(delimiter);

  // Generate rows (From each lines)
  const rows = str.slice(str.indexOf('\n') + 1).split('\n');

  const arr = rows.filter(Boolean).map(function (row) {
    const values = row.split(delimiter);
    const object = headers.reduce(function (
      obj: Dictionary<string>,
      header,
      index,
    ) {
      obj[header] = values[index];
      return obj;
    },
    {});
    return object;
  });

  return arr as object[];
};

export default csvToArray;
