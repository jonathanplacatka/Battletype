"use client"

import Image from "next/image";
import logov2 from "image/logov2.png"
import Link from "next/link";

export default function Footer() {
    return (
        <div className="flex px-6 py-4 bottom-0 border-b border-white">
            <nav className="flex justify-between w-full">
                <Link className="flex items-center justify-center" href="/">
                    {/* <Image className="w-auto h-auto max-w-[300px] max-h-[70px]" src={logov2} alt="logo"/>  */}
                    <p className="flex items-center font-mono">
                        <span className="">&lt;/&gt;</span>
                        GitHub
                    </p>
                </Link>
                {/* <div className="flex space-x-36 items-center mr-8">
                    <Link href="/">
                        About
                    </Link>
                    <Link href="/">
                        Profile
                    </Link>
                    <Link href="/">
                        Settings
                    </Link>
                </div> */}
            </nav>
        </div> 
    );
}
