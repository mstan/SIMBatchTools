const { sims } = require('./lib');
let { product_id } = require('./config.js');
let fs = require('fs');

async function main() {
	const simsList = await sims.getList(product_id);
	return simsList;
}

main()
	.then(simsList => {
		sims.processChangeState(simsList,'reactivate');
	})
	.catch(error => {
		console.log(error);
	})