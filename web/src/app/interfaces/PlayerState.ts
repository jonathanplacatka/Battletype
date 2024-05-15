export default interface PlayerState {
    [id: string]: {
        score: number;
        wpm: number;
    };
}