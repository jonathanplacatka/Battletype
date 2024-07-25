"use client"

import Image from "next/image";
import image1 from "image/image1.svg"
import Link from "next/link";

export default function Header() {
    return (
        <div className="flex p-6">
            
            <nav>
                <Link href="/">
                    <Image src={image1} alt="logo"/> 
                </Link>
            </nav>
        </div> 
    );
}
