const axios = require('axios');

const API_URL = 'https://echo-serv.tbxnet.com/v1/secret';
const API_KEY = 'Bearer aSuperSecretKey';

const headers = {
  Authorization: API_KEY,
};

const fetchFilesList = async () => {
  const { data } = await axios.get(`${API_URL}/files`, { headers });
  return data.files || [];
};

const fetchFilesData = async (fileName) => {
  const files = await fetchFilesList();
  const filteredFiles = fileName
    ? files.filter(f => f.toLowerCase().includes(fileName.toLowerCase()))
    : files;

  const result = await Promise.all(
    filteredFiles.map(async (file) => {
      try {
        const { data } = await axios.get(`${API_URL}/file/${file}`, { headers });
        const lines = data.split('\n').slice(1);

        const validLines = lines
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .map(line => line.split(','))
          .filter(parts => parts.length === 4)
          .map(([fileName, text, number, hex]) => ({
            text,
            number: Number(number),
            hex,
          }));

        return { file, lines: validLines };
      } catch {
        return null;
      }
    })
  );

  return result.filter(Boolean);
};

module.exports = {
  fetchFilesData,
  fetchFilesList,
};