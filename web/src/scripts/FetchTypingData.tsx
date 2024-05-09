
export default async function fetchRandomPoetry() {
    let response = await fetch('https://poetrydb.org/title/Ozymandias/lines.json');
    let poetryData = await response.json();
    let getRandomPoetryLine = Math.floor(Math.random() * poetryData[0].lines.length)
    return (poetryData[0].lines[getRandomPoetryLine])
}
