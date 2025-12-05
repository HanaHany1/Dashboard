import { useDashboard } from "@/context/DashboardContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Users, X } from "lucide-react";
import generatedImage from '@assets/generated_images/vodafone_cash_payment_receipt_screenshot_on_a_phone_screen.png';

export function BookingDetails() {
  const { selectedRoomId, rooms, getPendingBookingForRoom, confirmBooking, rejectBooking, setSelectedRoomId } = useDashboard();

  const room = rooms.find(r => r.id === selectedRoomId);
  const booking = room ? getPendingBookingForRoom(room.id) : undefined;

  if (!selectedRoomId) return null;

  return (
    <aside className="w-96 h-screen bg-white border-l border-border flex flex-col shrink-0 shadow-xl z-10">
      <div className="p-6 border-b border-border flex items-center justify-between bg-secondary/30">
        <div>
            <h2 className="font-bold text-lg">{room?.name}</h2>
            <p className="text-sm text-muted-foreground">{room?.type === 'roof' ? 'Outdoor Space' : 'Indoor Room'} • {room?.capacity} People</p>
        </div>
        <button 
            onClick={() => setSelectedRoomId(null)}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
        >
            <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Room Status Section */}
        <div className="p-6 border-b border-border">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Current Status</h3>
            <div className="flex items-center gap-3 mb-4">
                <div className={cn(
                    "w-3 h-3 rounded-full",
                    room?.status === 'available' ? "bg-success" : 
                    room?.status === 'occupied' ? "bg-destructive" : "bg-warning"
                )} />
                <span className="font-medium capitalize">{room?.status}</span>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Capacity</div>
                    <div className="font-semibold flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {room?.capacity}
                    </div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Type</div>
                    <div className="font-semibold capitalize">
                        {room?.type}
                    </div>
                </div>
            </div>
        </div>

        {/* Booking Request Section */}
        {booking ? (
            <div className="p-6">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-primary uppercase tracking-wider">New Booking Request</h3>
                    <span className="bg-warning/20 text-warning-foreground text-xs font-bold px-2 py-1 rounded-full text-yellow-700">
                        Pending
                    </span>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="text-sm text-muted-foreground mb-1">Guest</div>
                        <div className="font-medium text-lg">{booking.guestName}</div>
                        
                        <div className="my-3 h-px bg-slate-200" />
                        
                        <div className="grid grid-cols-2 gap-y-3 text-sm">
                            <div>
                                <span className="text-muted-foreground block text-xs">Date</span>
                                <span className="font-medium">{booking.date}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block text-xs">Time</span>
                                <span className="font-medium">{booking.timeFrom} - {booking.timeTo}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block text-xs">Guests</span>
                                <span className="font-medium">{booking.guests}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block text-xs">Amount</span>
                                <span className="font-medium">{booking.amount} EGP</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">Deposit Receipt (Vodafone Cash)</label>
                        <div className="relative aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden border border-border group cursor-pointer">
                            <img 
                                src={generatedImage} 
                                alt="Payment Receipt" 
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sticky bottom-0 bg-white pt-2 pb-6">
                    <button 
                        onClick={() => rejectBooking(booking.id)}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-destructive/20 text-destructive hover:bg-destructive/5 font-medium transition-colors"
                    >
                        <X className="w-4 h-4" />
                        Decline
                    </button>
                    <button 
                        onClick={() => confirmBooking(booking.id)}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors shadow-lg shadow-primary/20"
                    >
                        <Check className="w-4 h-4" />
                        Accept
                    </button>
                </div>
            </div>
        ) : (
            <div className="p-6 text-center text-muted-foreground py-12">
                <div className="w-12 h-12 rounded-full bg-secondary mx-auto flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 opacity-50" />
                </div>
                <p>No pending requests for this room.</p>
            </div>
        )}
      </div>
    </aside>
  );
}
