const ExcelJS = require('exceljs');

require('dotenv').config();

const { handleUsers } = require('../../scheduledUsers/index');

const conversionHandler = async (client) => {
	const user = handleUsers();
	const columns = [
		{ name: 'Nome', filterButton: true },
		{ name: 'Profissional', filterButton: true },
		{ name: 'Data', filterButton: true },
		{ name: 'Horário', filterButton: true },
		{ name: 'Serviços', filterButton: true },
	];
	const rows = user.map((each) => {
		return [each.name, each.professional, each.date, each.hour, each.service];
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
			theme: 'TableStyleMedium1',
			showRowStripes: true,
		},
		columns,
		rows,
	});

	const buffer = await workbook.xlsx.writeBuffer();
	const typeData = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
	const xlsxB64 = `data:${typeData};base64,${buffer.toString('base64')}`;
	try {
		await client.sendFile(
			process.env.ATENDENTE,
			xlsxB64,
			'Aqui está a planilha  de agendamento atualizada.',
		);
	} catch (err) {
		console.log(err);
	}
};
module.exports = conversionHandler;
