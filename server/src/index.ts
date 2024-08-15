import GameServer from "./server";
import dotenv from 'dotenv';

function main() {
	dotenv.config();

	const port = process.env.PORT;
	const origin = process.env.ORIGIN;

	if(port && origin) {
		let server = new GameServer(parseInt(port), origin) 
    	server.start()
	} else {
    	console.log("environment variables not found")
  	}
}

main();