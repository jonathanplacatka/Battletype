
export default class Player {
    score: number;
    wpm: number;
    username: string;

    constructor() {
        this.username = '';
        this.score = 0;
        this.wpm = 0;
    }

    update(score: number, wpm: number) {
        this.score = score;
        this.wpm = wpm;
    }
}