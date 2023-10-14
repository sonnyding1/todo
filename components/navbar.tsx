import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
    return (
        <div className="p-4">
            <div className="w-full flex justify-end">
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    );
}