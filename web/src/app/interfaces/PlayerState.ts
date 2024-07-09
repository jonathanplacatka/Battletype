export default interface PlayerState {
    [id: string]: {
        score: number;
        WPM: number;
    };
}