import { useDashboard } from "@/context/DashboardContext";
import { Sidebar } from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Room } from "@/lib/api/types/Room";
import { Check, X, Calendar, Clock, Users, DollarSign, AlertCircle, Bell } from "lucide-react";
import generatedImage from '@assets/generated_images/vodafone_cash_payment_receipt_screenshot_on_a_phone_screen.png';

export default function Notifications() {
    const { bookings, rooms, confirmBooking, rejectBooking } = useDashboard();

    // Sort bookings: Pending first, then by date (newest first)
    const sortedBookings = [...bookings].sort((a, b) => {
        if (a.status === "pending" && b.status !== "pending") return -1;
        if (a.status !== "pending" && b.status === "pending") return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    const getRoomName = (roomId: string) => {
  return rooms.find((r: Room) => r.id === roomId)?.name || "Unknown Room";
};


    return (
        <div className="flex h-screen w-full bg-background overflow-hidden font-sans text-foreground">
            <Sidebar />
            
            <main className="flex-1 flex flex-col h-full overflow-y-auto relative bg-slate-50/50">
                <header className="h-24 border-b border-border bg-white px-8 flex items-center shrink-0 sticky top-0 z-10">
                    <h1 className="text-2xl font-bold tracking-tight">Notifications & Requests</h1>
                </header>

                <div className="p-8 max-w-5xl mx-auto w-full space-y-6">
                    {/* API Integration Note */}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3 text-sm text-blue-700">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold mb-1">Developer Note: API Integration Ready</p>
                            <p className="opacity-90">
                                This list is structured to easily map to a backend API response. 
                                The `bookings` array in `DashboardContext` can be replaced with a `useQuery` hook fetching from your endpoint 
                                (e.g., `GET /api/bookings`).
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {sortedBookings.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Bell className="w-8 h-8 opacity-20" />
                                </div>
                                <p>No notifications yet</p>
                            </div>
                        ) : (
                            sortedBookings.map((booking) => (
                                <div 
                                    key={booking.id} 
                                    className={cn(
                                        "bg-white rounded-xl border p-6 shadow-sm transition-all hover:shadow-md flex flex-col md:flex-row gap-6",
                                        booking.status === 'pending' ? "border-primary/20 ring-1 ring-primary/5" : "border-border opacity-80"
                                    )}
                                >
                                    {/* Status Stripe */}
                                    <div className={cn(
                                        "w-1.5 rounded-full self-stretch shrink-0",
                                        booking.status === 'pending' ? "bg-warning" :
                                        booking.status === 'confirmed' ? "bg-success" : "bg-destructive"
                                    )} />

                                    {/* Main Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg text-foreground">{booking.guestName}</h3>
                                                <p className="text-sm text-muted-foreground">Requested {getRoomName(booking.roomId)}</p>
                                            </div>
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                                booking.status === 'pending' ? "bg-warning/10 text-yellow-700" :
                                                booking.status === 'confirmed' ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                                            )}>
                                                {booking.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                                <span>{booking.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Clock className="w-4 h-4 text-muted-foreground" />
                                                <span>{booking.timeFrom} - {booking.timeTo}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Users className="w-4 h-4 text-muted-foreground" />
                                                <span>{booking.guests} Guests</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                                <DollarSign className="w-4 h-4 text-muted-foreground" />
                                                <span>{booking.amount} EGP</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions & Evidence */}
                                    <div className="flex flex-col gap-3 min-w-[140px] shrink-0">
                                        {booking.status === 'pending' && (
                                            <>
                                                <button 
                                                    onClick={() => confirmBooking(booking.id)}
                                                    className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                                                >
                                                    <Check className="w-4 h-4" /> Accept
                                                </button>
                                                <button 
                                                    onClick={() => rejectBooking(booking.id)}
                                                    className="flex items-center justify-center gap-2 bg-white border border-destructive/20 text-destructive px-4 py-2 rounded-lg text-sm font-medium hover:bg-destructive/5 transition-colors"
                                                >
                                                    <X className="w-4 h-4" /> Reject
                                                </button>
                                            </>
                                        )}
                                        
                                        {/* View Receipt Preview - Mocked */}
                                        <div className="mt-auto pt-2">
                                            <p className="text-[10px] text-muted-foreground mb-1 uppercase font-bold">Payment Proof</p>
                                            <div className="h-12 w-full bg-slate-100 rounded border border-border overflow-hidden relative group cursor-pointer">
                                                 <img 
                                                    src={generatedImage} 
                                                    alt="Receipt" 
                                                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
