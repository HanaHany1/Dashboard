import { useDashboard } from "@/context/DashboardContext";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Building2, Users, Settings, Bell, LogOut } from "lucide-react";
import logo from "@assets/WhatsApp_Image_2025-11-21_at_13.15.47_0e28b0ce-removebg-previe_1764984243025.png";

export function Sidebar() {
  const { bookings } = useDashboard();
  const pendingCount = bookings.filter(b => b.status === "pending").length;

  return (
    <aside className="w-64 h-screen bg-white border-r border-border flex flex-col shrink-0">
      <div className="p-6 flex items-center gap-3">
        <img src={logo} alt="Shagaf Logo" className="h-12 w-auto object-contain" />
        <span className="font-bold text-lg tracking-tight text-foreground">Shagaf</span>
      </div>

      <div className="px-4 py-2">
        <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Main Menu</div>
        <nav className="space-y-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={Users} label="Customers" />
          <NavItem icon={Bell} label="Notifications" badge={pendingCount > 0 ? pendingCount : undefined} />
        </nav>
      </div>

      <div className="mt-auto px-4 py-6 border-t border-border">
         <nav className="space-y-1">
          <NavItem icon={Settings} label="Settings" />
          <NavItem icon={LogOut} label="Logout" variant="danger" />
        </nav>
        
        <div className="mt-6 flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-border">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">admin@shagaf.com</span>
            <span className="text-xs text-muted-foreground">Manager</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon: Icon, label, active, badge, variant = "default" }: { icon: any, label: string, active?: boolean, badge?: number, variant?: "default" | "danger" }) {
  return (
    <button
      className={cn(
        "w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
        active 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        variant === "danger" && "text-destructive hover:bg-destructive/10 hover:text-destructive"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className={cn("w-5 h-5", active ? "text-primary" : "text-muted-foreground", variant === "danger" && "text-destructive")} />
        <span>{label}</span>
      </div>
      {badge ? (
        <span className="bg-warning text-warning-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
          {badge}
        </span>
      ) : null}
    </button>
  );
}
