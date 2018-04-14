import { version } from '../../package.json';
import { Router } from 'express';
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

		let filePath = path.join( rootPath , config.public , req.originalUrl + '.json');
	  fs.readFile(filePath, function(err, contents) {
			console.log(filePath, contents )
	    res.json( JSON.parse(contents) );
	    res.end();
  	});
	});

	api.all('/api/*', (req, res) => {

		let filePath = path.join( rootPath , config.public , req.originalUrl + '.json');
	  fs.readFile(filePath, function(err, contents) {
			console.log(filePath, contents )
	    res.json( JSON.parse(contents) );
	    res.end();
  	});
	});

	return api;
}
