import { version } from '../../package.json';
import { Router } from 'express';
import config from '../config.json';
import facets from './facets';
import fs from 'fs';
import path from "path";

import { path as rootPath } from 'app-root-path';

export default ({ config, db }) => {
	let api = Router();

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.get('/users/*', (req, res) => {

		res.writeHead(200, {'Content-Type': 'application/json'});
		let filePath = path.join( rootPath , config.public , req.originalUrl + '.json');
		console.log( filePath, rootPath )
	  fs.readFile(filePath, function(err, contents) {
			console.log( contents )
	    res.write(contents);
	    res.end();
  	});
	});

	return api;
}
