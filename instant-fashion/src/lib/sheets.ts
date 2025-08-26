import { google } from '@googleapis/sheets';

export async function logOrderToSheet(row: (string | number)[]) {
	if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEETS_ID) return;
	const auth = new google.auth.JWT(
		process.env.GOOGLE_CLIENT_EMAIL,
		undefined,
		(process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
		['https://www.googleapis.com/auth/spreadsheets']
	);
	const sheets = google.sheets({ version: 'v4', auth });
	await sheets.spreadsheets.values.append({
		spreadsheetId: process.env.GOOGLE_SHEETS_ID,
		range: 'Orders!A1',
		valueInputOption: 'USER_ENTERED',
		requestBody: { values: [row] }
	});
}