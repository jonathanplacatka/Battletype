import { Tooltip } from "@mantine/core";
import { useState } from "react";

export default function InviteLink() {

    const [linkCopied, setLinkCopied] = useState(false);

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.toString());
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
    }

    return (
        <div>    
            <p className="text-white">share link to invite friends</p>
            <div className="flex space-x-1 items-center">
                <p className="p-2 text-white border rounded-md text-sm">{window.location.toString()}</p>
                <Tooltip label="copied!" withArrow arrowSize={4} offset={{ mainAxis: 7, crossAxis: 18 }} opened={linkCopied} classNames={{tooltip: 'py-1 px-1.5'}}>
                    <button className="bg-[#6A6867] hover:bg-[#525150] p-1.5 rounded-md  text-white" onClick={copyLink}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32"><path fill="white" d="M11.75 2A3.25 3.25 0 0 0 8.5 5.25v18a3.25 3.25 0 0 0 3.25 3.25h12A3.25 3.25 0 0 0 27 23.25v-18A3.25 3.25 0 0 0 23.75 2zM10.5 5.25c0-.69.56-1.25 1.25-1.25h12c.69 0 1.25.56 1.25 1.25v18c0 .69-.56 1.25-1.25 1.25h-12c-.69 0-1.25-.56-1.25-1.25zM7 5.749c-1.174.49-2 1.649-2 3V23.5a6.5 6.5 0 0 0 6.5 6.5h8.75a3.25 3.25 0 0 0 3.001-2H11.5A4.5 4.5 0 0 1 7 23.5z"/></svg>
                    </button>
                </Tooltip>
            </div>
        </div>
    );
}