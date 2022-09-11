const ExcelJS = require('exceljs');
const fs = require('fs');
require('dotenv').config();
const path = require('path');
const { handleUsers } = require('../scheduledUsers/index');

const conversionHandler = async (client) => {
	const user = handleUsers();
	console.log(user);
	const columns = [
		{ name: 'Nome', filterButton: true },
		{ name: 'Data', filterButton: true },
		{ name: 'Profissional', filterButton: true },
		{ name: 'Serviços', filterButton: true },
	];
	const rows = user.map((each) => {
		return [each.name, each.date, each.professional, each.service];
	});
	const workbook = new ExcelJS.Workbook();

	workbook.creator = 'Luis Paulo Martins';

	const sheet = workbook.addWorksheet('Agendados', { views: [{ state: 'frozen', ySplit: 1 }] });

	sheet.addTable({
		name: 'Agendados',
		ref: 'A1',
		headerRow: true,
		totalsRow: false,
		style: {
			theme: 'TableStyleMedium2',
			showRowStripes: true,
		},
		columns,
		rows,
	});
	const file = 'Agendados.xlsx';
	workbook.xlsx.writeFile(path.join(__dirname, file));
	try {
		await client.sendFile(
			process.env.ATENDENTE,
			path.join(__dirname, file),
			'Aqui está a planilha  de agendamento atualizada.',
		);
		fs.unlink(file);
	} catch (err) {
		console.log(err);
		fs.unlink(file);
	}
};
module.exports = conversionHandler;
