import SQLite from 'react-native-sqlite-storage';
import { config } from '../config';

const db = SQLite.openDatabase(
  {
    name: 'app_logs.db',
    location: 'default',
  },
  () => {
    config.logger?.log?.('Database opened successfully');
    createLogsTable();
  },
  error => {
    config.logger?.error?.('Error while opening database', error);
  }
);

function createLogsTable() {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Logs (
        id BIGINTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT,
        level TEXT,
        location TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
      [],
      () => {
        config.logger?.log?.('Tabella Logs creata con successo');
      },
      error => {
        config.logger?.error?.('Errore nella creazione della tabella Logs', error);
      }
    );
  });
}

export function logMessage(message, level = 'info') {
  const stack = new Error().stack;
  const caller = stack.split('\n')[2].trim();

  config.logger?.log?.(`${level.toUpperCase()}: ${message} (at ${caller})`);

  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Logs (message, level, location) VALUES (?, ?, ?)',
      [message, level, caller],
      (_tx, results) => {
        config.logger?.log?.('Log saved to database', results);
      },
      error => {
        config.logger?.error?.('Error while inserting log', error);
      }
    );
  });
}

// Funzione per leggere i log dal database
export function getLogs(callback) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Logs',
      [],
      (_tx, results) => {
        const logs = [];
        const rows = results.rows;
        for (let i = 0; i < rows.length; i++) {
          logs.push(rows.item(i));
        }
        callback(logs);
      },
      error => {
        config.logger?.error?.('Error while getting logs', error);
      }
    );
  });
}

// Funzione per cancellare tutti i log dal database
export function clearLogs(callback) {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM Logs',
      [],
      (_tx, results) => {
        config.logger?.debug?.('All logs cleared from database', results);
        if (callback) {callback();}
      },
      error => {
        config.logger?.error?.('Error while clearing logs', error);
      }
    );
  });
}
