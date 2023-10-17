console.clear();

import express from 'express';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors());

const port = 3000;
const googleId = '1iJD1HoFG4bvuOfLI7LEZA-OioKn5Nw9d34o3A77wGKQ'


// Configurar autenticación JWT
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

app.use(express.json());

// Ruta para agregar una fila a la hoja
app.post('/add-row', async (req, res) => {
  try {
    const doc = new GoogleSpreadsheet(googleId, serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    const newRow = await sheet.addRow(req.body);

    //  evitar referencias circulares
    const serializedNewRow = JSON.stringify(newRow, function (key, value) {
      if (key === '_spreadsheet' || key === '_rawSheets') {
        return undefined;
      }
      return value;
    }, null, 2);

    res.status(200).send(serializedNewRow);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para eliminar una fila 
app.delete('/delete-row/:index', async (req, res) => {
  try {
    const doc = new GoogleSpreadsheet('1iJD1HoFG4bvuOfLI7LEZA-OioKn5Nw9d34o3A77wGKQ', serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];

    const index = parseInt(req.params.index, 10);
    if (isNaN(index)) {
      res.status(400).send('Índice inválido');
      return;
    }

    if (index < 1 || index > sheet.rowCount) {
      res.status(400).send('Índice fuera de rango');
      return;
    }

    const rows = await sheet.getRows();
    const rowToDelete = rows[index - 1];

    await rowToDelete.delete();
    res.status(200).json({ message: 'Fila eliminada correctamente' });


  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para obtener 1 fila
app.get('/get-row/:index', async (req, res) => {
  try {
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 1) {
      return res.status(400).send('Índice de fila inválido');
    }

    const doc = new GoogleSpreadsheet('1iJD1HoFG4bvuOfLI7LEZA-OioKn5Nw9d34o3A77wGKQ', serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows({ offset: index - 1, limit: 1 });

    if (rows.length === 0) {
      return res.status(404).send('Fila no encontrada');
    }

    const rowData = rows[0]._rawData;

    res.status(200).json({ data: rowData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para obtener todas las filas
app.get('/get-rows', async (req, res) => {
  try {
    const doc = new GoogleSpreadsheet('1iJD1HoFG4bvuOfLI7LEZA-OioKn5Nw9d34o3A77wGKQ', serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];

    const rows = await sheet.getRows();
    console.log(rows);

    const rowData = rows.map(row => row._rawData);

    res.status(200).json({ data: rowData })
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para actualizar las fila
app.put('/update-row/:index', async (req, res) => {
  try {
    const index = parseInt(req.params.index);
    const updatedData = req.body;

    const doc = new GoogleSpreadsheet('1iJD1HoFG4bvuOfLI7LEZA-OioKn5Nw9d34o3A77wGKQ', serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows({ offset: index - 1, limit: 1 });

    if (rows.length === 0) {
      return res.status(404).send('Fila no encontrada');
    }

    const row = rows[0];

    for (const key in updatedData) {
      const columnIndex = sheet.headerValues.indexOf(key);
      if (columnIndex !== -1) {
        row._rawData[columnIndex] = updatedData[key];
      }
    }

    await row.save();

    res.status(200).send('Fila actualizada correctamente');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

