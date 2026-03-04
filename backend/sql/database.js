const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'suloskaja',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//!SQL Queries
async function selectall() {
    const query = 'SELECT * FROM kajak;';
    const [rows] = await pool.execute(query);
    return rows;
}

async function insertSuloskaja(kajaNev, kajaAr, kajaFinomsag, kajaLejarat, kajaMennyiseg) {
    const query = 'INSERT INTO kajak(nev, ar, finomsag, lejarat, mennyiseg) VALUES(?, ?, ?, ?, ?);';
    const [rows] = await pool.execute(query, [
        kajaNev,
        kajaAr,
        kajaFinomsag,
        kajaLejarat,
        kajaMennyiseg
    ]);
    return rows;
}

async function deleteSuloskaja(kajaNev) {
    const query = 'DELETE FROM kajak WHERE nev = ?';
    const [rows] = await pool.execute(query, [kajaNev]);
    return rows;
}

//!Export
module.exports = {
    selectall,
    insertSuloskaja,
    deleteSuloskaja
};
