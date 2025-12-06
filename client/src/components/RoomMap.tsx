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
        <div className="flex-1 relative border border-slate-100 rounded-3xl bg-slate-50/50 overflow-hidden shadow-inner p-10">
            
            {/* Grid Background for blueprint feel */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Simply layout - Auto Grid instead of complex coordinates */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-[200px]">
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
    return (
        <motion.button
            layoutId={`room-${room.id}`}
            onClick={onClick}
            className={cn(
                "relative group transition-all duration-300 flex flex-col items-center justify-center w-full h-full",
                // Blueprint style borders
                "border-2",
                isSelected 
                    ? "border-primary bg-primary/10 z-10 shadow-lg shadow-primary/10" 
                    : "border-slate-300 bg-white hover:border-primary/60 hover:bg-slate-50 hover:shadow-md hover:-translate-y-1",
                "rounded-xl"
            )}
        >
            {/* Status Indicator Line */}
            {hasPending && (
                 <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute top-0 left-1/4 right-1/4 h-1.5 bg-warning rounded-b-md shadow-sm"
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
                "w-16 h-16 rounded-full flex items-center justify-center mb-3 font-bold text-2xl transition-colors shadow-sm border",
                isSelected 
                    ? "bg-primary text-white border-primary" 
                    : "bg-slate-50 text-slate-600 border-slate-200 group-hover:bg-white group-hover:border-primary/30 group-hover:text-primary",
                room.type === 'roof' && !isSelected && "bg-purple-50 text-purple-600 border-purple-100"
            )}>
                {room.id.replace('r', '')}
            </div>

            {/* Room Name Label */}
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wide max-w-[90%] truncate mb-1">
                {room.name}
            </span>

            {/* Status Text */}
            <span className={cn(
                "text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider mb-2",
                room.status === 'available' ? "bg-emerald-100 text-emerald-700" :
                room.status === 'occupied' ? "bg-slate-100 text-slate-500" :
                "bg-amber-100 text-amber-700"
            )}>
                {room.status}
            </span>

            {/* Capacity Hint */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                <Users className="w-3.5 h-3.5" />
                {room.capacity}
            </div>

        </motion.button>
    )
}
