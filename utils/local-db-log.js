import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'app_logs.db',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully');
    createLogsTable();
  },
  error => {
    console.error('Error while opening database', error);
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
        console.log('Tabella Logs creata con successo');
      },
      error => {
        console.error('Errore nella creazione della tabella Logs', error);
      }
    );
  });
}

export function logMessage(message, level = 'info') {
  const stack = new Error().stack;
  const caller = stack.split('\n')[2].trim(); 

  console.log(`${level.toUpperCase()}: ${message} (at ${caller})`);

  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Logs (message, level, location) VALUES (?, ?, ?)',
      [message, level, caller],
      (tx, results) => {
        console.log('Log saved to database', results);
      },
      error => {
        console.error('Error while inserting log', error);
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
      (tx, results) => {
        const logs = [];
        const rows = results.rows;
        for (let i = 0; i < rows.length; i++) {
          logs.push(rows.item(i));
        }
        callback(logs);
      },
      error => {
        console.error('Error while getting logs', error);
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
      (tx, results) => {
        console.debug('All logs cleared from database', results);
        if (callback) callback();
      },
      error => {
        console.error('Error while clearing logs', error);
      }
    );
  });
}
