import { useDashboard, Room } from "@/context/DashboardContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

export function RoomMap() {
  const { rooms, selectedBranchId, selectedRoomId, setSelectedRoomId, getPendingBookingForRoom } = useDashboard();
  
  const branchRooms = rooms.filter(r => r.branchId === selectedBranchId);

  return (
    <div className="flex-1 bg-white p-8 overflow-hidden relative flex flex-col">
        {/* Canvas / Floor Plan Container */}
        <div className="flex-1 relative border border-slate-100 rounded-3xl bg-slate-50/50 overflow-hidden shadow-inner">
            
            {/* Grid Background for blueprint feel */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <div className="absolute inset-10 overflow-auto">
                {/* This is the "Canvas" area. We use a 12x12 grid for the floor plan layout */}
                <div className="w-full h-full min-w-[800px] min-h-[600px] grid grid-cols-12 grid-rows-12 gap-4">
                    {branchRooms.map((room) => (
                        <RoomNode 
                            key={room.id} 
                            room={room} 
                            isSelected={selectedRoomId === room.id}
                            hasPending={!!getPendingBookingForRoom(room.id)}
                            onClick={() => setSelectedRoomId(room.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}

function RoomNode({ 
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
    // Map the simple x,y coordinates to the grid
    // We use the mock data coordinates to place them on the grid
    const style = {
        gridColumn: `${(room.x || 0) * 2 + 1} / span ${(room.w || 1) * 2}`,
        gridRow: `${(room.y || 0) * 2 + 1} / span ${(room.h || 1) * 2}`,
    };

    return (
        <motion.button
            layoutId={`room-${room.id}`}
            onClick={onClick}
            style={style}
            className={cn(
                "relative group transition-all duration-300 flex flex-col items-center justify-center",
                // Blueprint style borders
                "border-2",
                isSelected 
                    ? "border-primary bg-primary/10 z-10 shadow-lg shadow-primary/10" 
                    : "border-slate-300 bg-white hover:border-primary/60 hover:bg-slate-50",
                "rounded-lg"
            )}
        >
            {/* Status Indicator Line */}
            {hasPending && (
                 <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute top-0 left-1/4 right-1/4 h-1 bg-warning rounded-b-sm shadow-sm"
                 />
            )}

            {/* Pending Alert Badge */}
            {hasPending && (
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-warning border-4 border-white rounded-full flex items-center justify-center shadow-md z-20 animate-bounce"
                >
                    <span className="text-white font-bold text-xs">!</span>
                </motion.div>
            )}

            {/* Room Number / ID Circle (Center) */}
            <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-2 font-bold text-lg transition-colors",
                isSelected ? "bg-primary text-white" : "bg-slate-100 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary",
                room.type === 'roof' && !isSelected && "bg-purple-50 text-purple-600"
            )}>
                {room.id.replace('r', '')}
            </div>

            {/* Room Name Label */}
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide max-w-[90%] truncate">
                {room.name}
            </span>

            {/* Capacity Hint */}
            <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] text-slate-400">
                <Users className="w-3 h-3" />
                {room.capacity}
            </div>

        </motion.button>
    )
}
