module.exports ={
	base_url: 'https://api.particle.io/v1',
	access_token:  "" || process.env.ACCESS_TOKEN, // access token for user or product
	product_id: "" || process.env.PRODUCT_ID, // an empty product_id defaults to the user's own personal SIMs and not a product
	perPage: "10000" || process.env.PER_PAGE, // page. Bumped up to 500,
	isSync: process.env.IS_SYNC
}