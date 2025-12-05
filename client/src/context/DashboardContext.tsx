import React, { createContext, useContext, useState } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Types
export type RoomStatus = "available" | "occupied" | "maintenance";
export type BookingStatus = "pending" | "confirmed" | "rejected";

export interface Booking {
  id: string;
  roomId: string;
  guestName: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  guests: number;
  status: BookingStatus;
  depositImage?: string; // URL to image
  amount: number;
}

export interface Room {
  id: string;
  name: string;
  type: "room" | "roof";
  capacity: number;
  status: RoomStatus;
  branchId: string;
  x?: number; // For map positioning (mock)
  y?: number;
  w?: number;
  h?: number;
}

export interface Branch {
  id: string;
  name: string;
}

// Mock Data
const MOCK_BRANCHES: Branch[] = [
  { id: "b1", name: "Downtown Branch" },
  { id: "b2", name: "Seaside Branch" },
];

const MOCK_ROOMS: Room[] = [
  { id: "r1", name: "Meeting Room A", type: "room", capacity: 10, status: "available", branchId: "b1", x: 0, y: 0, w: 2, h: 2 },
  { id: "r2", name: "Conf Room 1", type: "room", capacity: 20, status: "occupied", branchId: "b1", x: 2, y: 0, w: 3, h: 2 },
  { id: "r3", name: "Private Office", type: "room", capacity: 4, status: "available", branchId: "b1", x: 0, y: 2, w: 2, h: 1 },
  { id: "r4", name: "Open Space", type: "room", capacity: 50, status: "available", branchId: "b1", x: 2, y: 2, w: 3, h: 3 },
  { id: "r5", name: "Roof Garden", type: "roof", capacity: 30, status: "available", branchId: "b1", x: 0, y: 3, w: 2, h: 2 },
  
  { id: "r6", name: "Ocean View", type: "room", capacity: 12, status: "available", branchId: "b2", x: 0, y: 0, w: 4, h: 2 },
  { id: "r7", name: "Sunset Deck", type: "roof", capacity: 40, status: "maintenance", branchId: "b2", x: 0, y: 2, w: 4, h: 2 },
];

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "bk1",
    roomId: "r1",
    guestName: "Ahmed Hassan",
    date: "2023-10-25",
    timeFrom: "14:00",
    timeTo: "16:00",
    guests: 8,
    status: "pending",
    amount: 500,
  },
  {
    id: "bk2",
    roomId: "r5",
    guestName: "Sarah Karim",
    date: "2023-10-26",
    timeFrom: "18:00",
    timeTo: "21:00",
    guests: 20,
    status: "confirmed",
    amount: 1200,
  }
];

interface DashboardContextType {
  selectedBranchId: string;
  setSelectedBranchId: (id: string) => void;
  selectedRoomId: string | null;
  setSelectedRoomId: (id: string | null) => void;
  branches: Branch[];
  rooms: Room[];
  bookings: Booking[];
  confirmBooking: (id: string) => void;
  rejectBooking: (id: string) => void;
  getPendingBookingForRoom: (roomId: string) => Booking | undefined;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [selectedBranchId, setSelectedBranchId] = useState<string>("b1");
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);

  const confirmBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "confirmed" } : b));
  };

  const rejectBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "rejected" } : b));
  };

  const getPendingBookingForRoom = (roomId: string) => {
    return bookings.find(b => b.roomId === roomId && b.status === "pending");
  };

  return (
    <DashboardContext.Provider value={{
      selectedBranchId,
      setSelectedBranchId,
      selectedRoomId,
      setSelectedRoomId,
      branches: MOCK_BRANCHES,
      rooms: MOCK_ROOMS,
      bookings,
      confirmBooking,
      rejectBooking,
      getPendingBookingForRoom
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
