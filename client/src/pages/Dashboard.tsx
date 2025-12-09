import { useDashboard } from "@/context/DashboardContext";
import { Sidebar } from "@/components/Sidebar";
import React, { useState } from "react";
import { RoomMap } from "@/components/RoomMap";
import { BookingDetails } from "@/components/BookingDetails";
import { cn } from "@/lib/utils";
import { Search, MapPin } from "lucide-react";


export default function Dashboard() {
    const { branches, selectedBranchId, setSelectedBranchId, selectedRoomId } = useDashboard();
    const [activeTab, setActiveTab] = useState<"rooms" | "roofs">("rooms");
    return (
        <div className="flex h-screen w-full bg-background overflow-hidden font-sans text-foreground">
            <Sidebar />

            <main className="flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300">
                {/* Top Header */}
                <header className="h-24 border-b border-border bg-white px-8 flex items-center justify-center shrink-0">
                    <div className="flex bg-secondary/50 p-1.5 rounded-xl">

                        {/* Rooms Button */}
                        <button
                            onClick={() => setActiveTab("rooms")}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition ${activeTab === "rooms"
                                    ? "bg-primary text-white shadow"
                                    : "text-slate-600 hover:bg-white"
                                }`}
                        >
                            Rooms
                        </button>

                        {/* Roof Button */}
                        <button
                            onClick={() => setActiveTab("roofs")}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition ${activeTab === "roofs"
                                    ? "bg-primary text-white shadow"
                                    : "text-slate-600 hover:bg-white"
                                }`}
                        >
                            Roof
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
