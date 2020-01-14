const { sims } = require('./lib');
let { product_id } = require('./config.js')

async function main() {
	const simsList = await sims.getList(product_id);
	return simsList;
}

main()
	.then(simsList => {
		sims.processChangeState(simsList,'deactivate');
	})
	.catch(error => {
		console.log(error);
	})