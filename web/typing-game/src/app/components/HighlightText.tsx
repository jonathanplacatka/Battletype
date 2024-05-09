
interface HighlightTextProps {
    value: string
    compareString: string
}
  
export default function HighlightText({value, compareString}: HighlightTextProps) {
    const diff = stringDiff(value, compareString);
    const correctPos = diff >= 0 ? diff : compareString.length;

    const correctText = value.slice(0, correctPos);
    const incorrectText = value.slice(correctPos, compareString.length);
    const remainingText = value.slice(compareString.length, value.length);

    return (
        <h1>
          <span style={{ color: "green" }}>{correctText}</span>
          <span style={{ color: "red" }}>{incorrectText}</span>
          <span>{remainingText}</span>
        </h1>
    );
}

function stringDiff(str1: string, str2: string) {
    let len = Math.min(str1.length, str2.length);
    for(let i = 0; i < len; i++) {
      if (str1[i] !== str2[i]) {
        return i;
      }
    }
    return -1;
  }