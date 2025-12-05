import { DashboardProvider, useDashboard } from "@/context/DashboardContext";
import { Sidebar } from "@/components/Sidebar";
import { RoomMap } from "@/components/RoomMap";
import { BookingDetails } from "@/components/BookingDetails";
import { cn } from "@/lib/utils";
import { Search, MapPin } from "lucide-react";

function DashboardContent() {
    const { branches, selectedBranchId, setSelectedBranchId, selectedRoomId } = useDashboard();

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden font-sans text-foreground">
            <Sidebar />
            
            <main className="flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300">
                {/* Top Header */}
                <header className="h-20 border-b border-border bg-white px-8 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4 w-1/3">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input 
                                type="text" 
                                placeholder="Search for rooms, bookings..." 
                                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-secondary/50 border-transparent focus:bg-white focus:border-primary/20 focus:ring-2 focus:ring-primary/10 transition-all text-sm outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex bg-secondary/50 p-1 rounded-lg">
                        {branches.map(branch => (
                            <button
                                key={branch.id}
                                onClick={() => setSelectedBranchId(branch.id)}
                                className={cn(
                                    "px-4 py-2 rounded-md text-sm font-medium transition-all",
                                    selectedBranchId === branch.id 
                                        ? "bg-white text-foreground shadow-sm" 
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {branch.name}
                            </button>
                        ))}
                    </div>
                    
                    <div className="w-1/3 flex justify-end">
                        <button className="bg-primary text-primary-foreground px-4 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors">
                            + New Walk-in
                        </button>
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

export default function Dashboard() {
    return (
        <DashboardProvider>
            <DashboardContent />
        </DashboardProvider>
    );
}
