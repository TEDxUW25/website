"use client";

import { /* TrendingDownIcon, TrendingUpIcon, */ UsersIcon, CheckCircleIcon, ClockIcon, DollarSignIcon } from "lucide-react"
import { useState, useEffect } from "react"

// import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface TicketStats {
  totalTickets: number;
  checkedIn: number;
  pending: number;
  totalRevenue: number;
  checkInRate: number;
}

interface Ticket {
  id: string;
  attendee_name: string;
  attendee_email: string;
  ticket_type: 'event' | 'event_afterparty';
  price: number;
  checked_in: boolean;
  checked_in_at: string | null;
  created_at: string;
}

export function SectionCards() {
  const [stats, setStats] = useState<TicketStats>({
    totalTickets: 0,
    checkedIn: 0,
    pending: 0,
    totalRevenue: 0,
    checkInRate: 0
  });

  useEffect(() => {
    fetchStats();
    // Set up real-time polling every 5 seconds
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/tickets');
      const data = await response.json();

      if (response.ok) {
        const tickets = data.tickets;
        const totalTickets = tickets.length;
        const checkedIn = tickets.filter((t: Ticket) => t.checked_in).length;
        const pending = totalTickets - checkedIn;
        const totalRevenue = tickets.reduce((sum: number, t: Ticket) => sum + t.price, 0);
        const checkInRate = totalTickets > 0 ? (checkedIn / totalTickets) * 100 : 0;

        setStats({
          totalTickets,
          checkedIn,
          pending,
          totalRevenue,
          checkInRate
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="relative">
          <CardDescription>Total Tickets</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {stats.totalTickets}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <UsersIcon className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="text-muted-foreground">
            TEDxUW 2025
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="relative">
          <CardDescription>Checked In</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {stats.checkedIn}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="text-muted-foreground">
            {stats.checkInRate.toFixed(1)}% check-in rate
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="relative">
          <CardDescription>Pending Check-in</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {stats.pending}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <ClockIcon className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="text-muted-foreground">
            Awaiting check-in
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="relative">
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            ${stats.totalRevenue}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <DollarSignIcon className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="text-muted-foreground">
            From ticket sales
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
