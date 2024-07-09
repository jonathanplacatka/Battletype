import GameServer from "./server";

function main() {
  let server = new GameServer(4000, "http://localhost:3000") //should setup env files for this
  server.start();
}

main();