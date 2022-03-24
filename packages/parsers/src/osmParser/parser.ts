import { Client } from 'pg'

require('dotenv').config()
// const vectormaputils = require('./dx.vectormaputils.node.js')

const connectToPg = async (name_ru: string) => {
	const query = `
	SELECT ST_asgeoJSON(ST_Simplify(way, 0.01), 2) FROM planet_osm_polygon
	WHERE LOWER(name) LIKE '${name_ru.toLowerCase()}'
	LIMIT 10000
`
	console.log(process.env.PGUSER)
	const client = new Client()
	await client.connect()
	const res = await client.query(query)
	console.log({ res }) // Hello world!
	await client.end()

	return res
}

export default connectToPg
