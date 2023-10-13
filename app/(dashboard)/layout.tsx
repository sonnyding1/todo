import { UserButton } from "@clerk/nextjs";

export default function DashBoardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <UserButton afterSignOutUrl="/"/>
            {children}
        </div>
    )
}