import Navbar from "@/components/navbar";

export default function DashBoardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}