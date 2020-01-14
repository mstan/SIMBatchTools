const { sims } = require('./lib');
let { product_id } = require('./config.js')

async function main() {
	const simsList = fs.readFileSync('./list.csv', 'utf8').split('\r\n');
	return simsList;
}

main()
	.then(simsList => {
		sims.processChangeState(simsList,'reactivate');
	})
	.catch(error => {
		console.log(error);
	})