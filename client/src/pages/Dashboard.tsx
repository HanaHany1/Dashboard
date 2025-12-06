import { useDashboard } from "@/context/DashboardContext";
import { Sidebar } from "@/components/Sidebar";
import { RoomMap } from "@/components/RoomMap";
import { BookingDetails } from "@/components/BookingDetails";
import { cn } from "@/lib/utils";
import { Search, MapPin } from "lucide-react";

export default function Dashboard() {
    const { branches, selectedBranchId, setSelectedBranchId, selectedRoomId } = useDashboard();

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden font-sans text-foreground">
            <Sidebar />
            
            <main className="flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300">
                {/* Top Header */}
                <header className="h-24 border-b border-border bg-white px-8 flex items-center justify-center shrink-0">
                    <div className="flex bg-secondary/50 p-1.5 rounded-xl">
                        {branches.map(branch => (
                            <button
                                key={branch.id}
                                onClick={() => setSelectedBranchId(branch.id)}
                                className={cn(
                                    "px-8 py-3 rounded-lg text-base font-bold transition-all min-w-[120px]",
                                    selectedBranchId === branch.id 
                                        ? "bg-white text-foreground shadow-sm scale-105" 
                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                )}
                            >
                                {branch.name}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Main Map Area */}
                <RoomMap />

            </main>

            {/* Right Panel - Conditional Rendering based on selection */}
             <BookingDetails />
        </div>
    );
}
