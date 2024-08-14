"use client"

import Image from "next/image";
import logov2 from "image/logov2.png"
import Link from "next/link";

export default function Header() {
    return (
        <div className="flex px-6 py-4 border-b border-white">
            <nav>
                <Link href="/">
                    <Image className="w-auto h-auto max-w-[300px] max-h-[70px]" src={logov2} alt="logo"/> 
                </Link>
            </nav>
        </div> 
    );
}
