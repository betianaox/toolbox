const filesService = require('../services/filesService');

const getFilesData = async (req, res) => {
  try {
    const result = await filesService.fetchFilesData(req.query.fileName);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error en getFilesData:', error.message);
    res.status(500).json({ error: 'Error al obtener los datos del archivo' });
  }
};

const getFilesList = async (req, res) => {
  try {
    const fileList = await filesService.fetchFilesList();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ files: fileList });
  } catch (error) {
    console.error('Error en getFilesList:', error.message);
    res.status(500).json({ error: 'Error al obtener la lista de archivos' });
  }
};

module.exports = {
  getFilesData,
  getFilesList,
};