import { useDashboard, Room } from "@/context/DashboardContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export function RoomMap() {
  const { rooms, selectedBranchId, selectedRoomId, setSelectedRoomId, getPendingBookingForRoom } = useDashboard();
  
  const branchRooms = rooms.filter(r => r.branchId === selectedBranchId);

  // Simple grid layout simulation logic
  // We are using the x,y,w,h from the mock data to create a CSS Grid layout
  // If data doesn't have coordinates, we fall back to a simple flex wrap

  return (
    <div className="flex-1 bg-slate-50 p-8 overflow-auto relative">
       <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-4 gap-6 auto-rows-[140px]">
            {branchRooms.map((room) => (
                <RoomCard 
                    key={room.id} 
                    room={room} 
                    isSelected={selectedRoomId === room.id}
                    hasPending={!!getPendingBookingForRoom(room.id)}
                    onClick={() => setSelectedRoomId(room.id)}
                />
            ))}
        </div>
       </div>
       
       {/* Map Background Elements for decoration */}
       <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>
    </div>
  );
}

function RoomCard({ 
    room, 
    isSelected, 
    hasPending,
    onClick 
}: { 
    room: Room; 
    isSelected: boolean;
    hasPending: boolean;
    onClick: () => void;
}) {
    // Calculate grid span based on mock dimensions
    const style = {
        gridColumn: `span ${room.w || 1}`,
        gridRow: `span ${room.h || 1}`,
    };

    return (
        <motion.button
            layoutId={`room-${room.id}`}
            onClick={onClick}
            style={style}
            className={cn(
                "relative group rounded-2xl border-2 p-5 text-left transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md",
                isSelected 
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                    : "bg-white border-border hover:border-primary/50",
                room.status === 'occupied' && !isSelected && "bg-slate-100 border-slate-200 opacity-80"
            )}
        >
            {hasPending && (
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-warning rounded-full flex items-center justify-center shadow-lg z-10 animate-bounce"
                >
                    <span className="text-white font-bold text-xs">!</span>
                </motion.div>
            )}

            <div className="flex justify-between items-start w-full">
                <span className={cn(
                    "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border",
                    room.type === 'roof' 
                        ? "bg-purple-50 text-purple-700 border-purple-100" 
                        : "bg-blue-50 text-blue-700 border-blue-100"
                )}>
                    {room.type}
                </span>
                {room.status === 'available' ? (
                     <span className="w-2 h-2 rounded-full bg-success"></span>
                ) : (
                     <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                )}
            </div>

            <div>
                <h3 className={cn(
                    "font-bold text-lg leading-tight mb-1",
                    isSelected ? "text-primary" : "text-foreground"
                )}>
                    {room.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                    Capacity: {room.capacity}
                </p>
            </div>

            {hasPending && (
                 <div className="mt-2 text-xs font-medium text-yellow-700 bg-yellow-50 px-2 py-1 rounded inline-block">
                    Booking Request
                 </div>
            )}
        </motion.button>
    )
}
