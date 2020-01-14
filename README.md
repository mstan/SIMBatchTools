# SIMBatchTools

This repo is a very quick hack together for batch SIM management for Particle SIMs.

These scripts were written in a short amount of time and may not follow best style guide practices. Everything should perform as intended.

## Setup

1. Clone the repository to your local machine
2. cd into SIMBatchTools working directory
3. `npm install`
4. cp config.sample.js config.js

## Usage

`node reactivate.js` to reactivate SIMs
`node deactivate.js` to deactivate SIMs


## Configuration

A config.js file has been included to put in any predefined variables.

Variables can also be specified with environment varialbes at runtime

For instance, to pass your access_token, you may set it in the `config.js` file.  
Alternatively, you may set it at runtime using environment variables. For example:  

`ACCESS_TOKEN=1234 node deactivate.js`

Environment variable values will always take precedent over config.js set values if both are specified.

### Product IDs

Product IDs must be used when doing batch operations on SIMs within a product. 

If you do not specify a product ID, the script will instead target SIMs in your personal user account (the SIMs located at https://console.particle.io/sims )

## Todo:

- Clean up code
- Implement cleaner CLI interface for different states
- Implement functionality to specify SIMs manually.
- Implement functionality to set MB limit when reactivating
- Implement update data allowance endpoint
- Implement releasing SIMs endpoint.
- Overhaul config.js to .env configuration