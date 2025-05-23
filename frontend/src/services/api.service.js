import axios from 'axios';

const BASE_URL = 'http://localhost:3000/files';

export const fetchFileData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all file data:', error);
    throw error;
  }
};

export const fetchFileDataByName = async (fileName) => {
  try {
    const response = await axios.get(`${BASE_URL}/data`, {
      params: { fileName }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching file data for ${fileName}:`, error);
    throw error;
  };
};