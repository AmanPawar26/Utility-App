import { google } from 'googleapis';
import { readFile } from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

export async function authorizeGoogleSheet() {
    const credentialsPath = process.env.GOOGLE_SHEETS_KEY_PATH;
    const credentials = JSON.parse(await readFile(credentialsPath, 'utf-8'))

    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({version: 'v4', auth});
    return sheets;
}

export async function loadDataFromSheet() {
    const sheets = await authorizeGoogleSheet();
    const sheetId = process.env.SHEET_ID;

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range:  `'Sheet1'!A1:Z1000`
    })

    const rows = res.data.values;

    if(!rows || rows.length == 0){
        console.log('No data found in sheet');
        return [];
    }
    const headers = rows[0];
    const data = rows.slice(1).map((rows) => {
        const rowData = {};
        headers.forEach((header, i) => {
            rowData[header] = rows[i] || '';
        });
        return rowData;
    })

    return data;
}


export async function saveDataToSheets(rows) {
    const sheets = await authorizeGoogleSheet();
    const sheetId = process.env.SHEET_ID;

    if (!rows || rows.length === 0) {
        console.log('No data to save');
        return;
    }

    const headers = Object.keys(rows[0]);
    const values = [headers, ...rows.map(row => headers.map(h => row[h]))];

    await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range:  `'Sheet1'!A1:Z1000`,
        valueInputOption: 'RAW',
        requestBody: {
            values,
        },
    });

    console.log('Data saved to google sheet successfully')
}