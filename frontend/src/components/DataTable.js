import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setData, setFilter } from '../store';
import { fetchFileData, fetchFileDataByName } from '../services/api.service';
import { Table, Form, Spinner, InputGroup } from 'react-bootstrap';

const DataTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.csv.data);
  const filter = useSelector((state) => state.csv.filter);

  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);

  const loadData = async (fileName = '') => {
    setLoading(true);
    try {
      const result =
        fileName.trim() === ''
          ? await fetchFileData()
          : await fetchFileDataByName(fileName.trim());

      const finalData = Array.isArray(result) ? result : [result];
      dispatch(setData(finalData));
      console.log(finalData);
      
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      dispatch(setData([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    dispatch(setFilter(value));

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      loadData(value);
    }, 500);
  };

  const flattenedData = data.flatMap(file =>
    file.lines.map(line => ({
      fileName: file.file,
      text: line.text,
      number: line.number,
      hex: line.hex,
    }))
  );

  return (
    <div className="container mt-4">
      <h3 className="mb-4 title">React Test App</h3>

      <Form className="mb-3">
        <InputGroup>
          <InputGroup.Text id="search-icon">
            <i className="bi bi-search"></i>
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Filtrar por nombre de archivo"
            aria-label="Filtrar por nombre de archivo"
            aria-describedby="search-icon"
            value={filter}
            onChange={handleFilterChange}
          />
        </InputGroup>
      </Form>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            {flattenedData.length > 0 ? (
              flattenedData.map((row, index) => (
                <tr key={index}>
                  <td>{row.fileName}</td>
                  <td>{row.text}</td>
                  <td>{row.number !== null ? row.number : '—'}</td>
                  <td>{row.hex || '—'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No hay datos disponibles</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default DataTable;