let request = require('request');
let { base_url, access_token, perPage, product_id, isSync } = require('../config.js')

async function getList(productId) {
	// set url. Have case for product or no product (user's own)
	const url = productId ? `${base_url}/products/${productId}/sims?access_token=${access_token}&perPage=${perPage}` : `${base_url}/sims?access_token=${access_token}&perPage=${perPage}`;

	// request from API
	return new Promise( (resolve,reject ) => {
		request(url, (err,response,body) => {
			if(err) {
				reject(e);
				return;
			}

			if( typeof(body) == 'string' ) { body = JSON.parse(body); }
			let { sims, error } = body;
			if(error)  {
				reject(error);
				return;
			}

			sims = sims.map( (sim) => { return sim['_id'] });
			resolve(sims);
		})
	})
	.catch(e => {
		throw new Error(e);
	})
}

async function getDataUsage(productId,sim) {
	const url = productId ? `${base_url}/products/${productId}/sims/${sim}/data_usage?access_token=${access_token}` : `${base_url}/sims/${sim}/data_usage?access_token=${access_token}`;
	// request from API
	return new Promise( (resolve,reject ) => {
		request(url, (err,response,body) => {
			if(err) {
				reject(err);
				return;
			}

			if( typeof(body) == 'string' ) { body = JSON.parse(body); }
			let { error } = body;
			if(error)  {
				reject(error);
				return;
			}
			resolve(body);
		})
	})
	.catch(e => {
		throw new Error(e);
	})
}

async function changeState(productId,sim,state) {
	// acceptable states are reactivate, deactivate

	const url = productId ? `${base_url}/products/${productId}/sims/${sim}/` : `${base_url}/sims/${sim}`;
	const formData = {
		access_token,
		action: state,
	}
	// request from API
	return new Promise( (resolve,reject ) => {
		request.put({ url, form: formData }, (err,response,body) => {
			if(err || !response.statusCode) {
				reject(err);
				return;
			}

			resolve(response.statusCode);
		})
	})
	.catch(e => {
		throw new Error(e);
	})
}

async function processChangeState(simsList,state) {
	for(let i in simsList) {
		try {
			if(isSync) {
				let statusCode = await changeState(product_id, simsList[i], state);
				console.log(`${simsList[i]} returned a status code of: ${statusCode}`);
			} else {
				let statusCode = changeState(product_id, simsList[i], state);
				console.log(`${simsList[i]} request sent`);
			}
		} catch(e) {
			console.log(e);
		}
	}
}


module.exports = {
	getList,
	getDataUsage,
	changeState,
	processChangeState
}