<p align="center"> 
    <img src="./web/public/logov2.png"border-radius: 12px" width="300px" alt="logo">
</p>

## <img src="web\src\app\icon.png" height="17px" width="17px" alt="logo"> About
Battletype is an online multiplayer typing game. Compete against your friends or take a solo typing test!

[Insert Gif Here]

## ⚙️ Getting Started

Install [ Node.js](https://nodejs.org/en) v20.10.0

### Web App
In the `/web` directory:

1. Install dependencies
   ```sh
   npm install
   ```
2. Create a `.env` file with the following value:
   ```
    NEXT_PUBLIC_GAME_SERVER_URL = http://localhost:4000
   ```
5. Run application
   ```sh
   npm run dev
   ```

### Game Server
In the `/server` directory:

1. Install dependencies
   ```sh
   npm install
   ```
2. Create a `.env` file with the following values:
   ```
    PORT = 4000
    ORIGIN = http://localhost:3000
   ```
5. Run server
   ```sh
   npm run start
   ```

## 🖥️ Tech Stack:
* Next.js
* React 
* Tailwind CSS
* TypeScript 
* Socket.io 
* Node.js


## 📝 Authors 
* [Ying Liang](https://github.com/YingLiang2)
* [Jonathan Placakta](https://github.com/jonathanplacatka)

## ⭐ Acknowledgements
- Special thanks to [Alborz Khakbazan](https://github.com/alborzk) for creating the logo and helping with UI design