const { sims } = require('./lib');
let { product_id } = require('./config.js');
let fs = require('fs');

async function main() {
	const simsList = fs.readFileSync('./list.csv', 'utf8').split('\r\n');
	return simsList;
}

main()
	.then(simsList => {
		sims.processChangeState(simsList,'deactivate');
	})
	.catch(error => {
		console.log(error);
	})