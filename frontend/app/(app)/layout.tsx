import Sidebar from "@/components/Sidebar";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-black">
            <Sidebar />

            <div className="flex flex-col flex-1 w-full overflow-hidden">

                <main className="flex-1 w-full overflow-y-auto bg-gray-50 dark:bg-black p-4 md:p-8">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
                
            </div>
        </div>
    );
}
