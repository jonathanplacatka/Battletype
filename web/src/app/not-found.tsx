import Link from "next/link";

export default function NotFound() {
    return (
        <>    
            <div className="flex flex-col items-center mt-52">
                <h1 className="text-8xl text-white mb-2">404</h1>
                <p className="text-lg text-white mb">Page Not Found</p>
                <Link href="/">
                    <button className ='bg-[#275E9D] hover:bg-[#1C416B] text-white text-bold text-sm py-2 px-3 rounded-lg mt-8'>Return Home</button>
                </Link>
            </div>
        </>
    );
}
