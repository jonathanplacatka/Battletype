export default interface PlayerState {
    [id: string]: {
        username: string;
        score: number;
        WPM: number;
        place: number;
    };
}