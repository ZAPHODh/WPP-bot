const xlsx = require('json-as-xlsx');
const fs = require('fs');
require('dotenv').config();
const { handleUsers } = require('../scheduledUsers/index');

const conversionHandler = async (client) => {
	const user = handleUsers();
	const columns = [
		{ label: 'Nome', value: 'name' },
		{ label: 'Data', value: 'date', format: 'dd-mm-yy' },
		{ label: 'Profissional', value: 'professional' },
		{ label: 'Serviço', value: 'service' },
	];
	const content = user.map((each) => {
		return {
			name: each.name,
			date: each.date,
			professional: each.professional,
			service: each.service,
		};
	});
	const data = [
		{
			sheet: 'Agendaos',
			columns,
			content,
		},
	];
	const settings = {
		fileName: 'Agendados', // Name of the resulting spreadsheet
		extraLength: 3, // A bigger number means that columns will be wider
		writeOptions: {},
	};
	xlsx(data, settings);
	await client.sendFile(process.env.ATENDENTE, 'D:/WPP/Agendados.xlsx', 'Agendados.xlsx');
	// eslint-disable-next-line consistent-return
	fs.unlink('D:/WPP/Agendados.xlsx', (err) => {
		if (err) {
			return err;
		}
	});
};
module.exports = conversionHandler;
