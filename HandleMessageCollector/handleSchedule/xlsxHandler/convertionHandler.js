const ExcelJS = require('exceljs');
const fs = require('fs');
require('dotenv').config();
const { handleUsers } = require('../scheduledUsers/index');

const conversionHandler = async (client) => {
	const user = handleUsers();
	const columns = [
		{ name: 'Nome', filterButton: true },
		{ name: 'Data', filterButton: true },
		{ name: 'Profissional', filterButton: true },
		{ name: 'Serviços', filterButton: true },
	];
	const content = user.map((each) => {
		return [each.name, each.date, each.professional, each.service];
	});
	const workbook = new ExcelJS.Workbook();
	const sheet = workbook.addWorksheet('Agendados', { views: [{ state: 'frozen', ySplit: 1 }] });
	workbook.creator = 'Luis Paulo Martins';
	workbook.created = Date.now().toLocaleString('pt-BR');
	sheet.addTable({
		name: 'Agendados',
		ref: 'A1',
		headerRow: true,
		totalsRow: false,
		style: {
			theme: 'TableStyleMedium1',
			showRowStripes: true,
		},
		columns,
		rows: content,
	});
	workbook.xlsx.writeFile('D:/WPP/Agendados.xlsx');
	await client.sendFile(process.env.ATENDENTE, 'D:/WPP/Agendados.xlsx', 'Agendados.xlsx');
	// eslint-disable-next-line consistent-return
	fs.unlink('D:/WPP/Agendados.xlsx', (err) => {
		if (err) {
			return err;
		}
	});
};
module.exports = conversionHandler;
