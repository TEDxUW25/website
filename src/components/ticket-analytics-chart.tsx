"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// interface TicketStats {
//   totalTickets: number;
//   checkedIn: number;
//   pending: number;
//   totalRevenue: number;
//   checkInRate: number;
// }

interface ChartData {
  date: string;
  tickets: number;
  checkedIn: number;
  revenue: number;
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

export function TicketAnalyticsChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  // const [stats, setStats] = useState<TicketStats>({
  //   totalTickets: 0,
  //   checkedIn: 0,
  //   pending: 0,
  //   totalRevenue: 0,
  //   checkInRate: 0
  // });

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/tickets');
      const data = await response.json();

      if (response.ok) {
        const tickets = data.tickets;
        // const totalTickets = tickets.length;
        // const checkedIn = tickets.filter((t: any) => t.checked_in).length;
        // const pending = totalTickets - checkedIn;
        // const totalRevenue = tickets.reduce((sum: number, t: any) => sum + t.price, 0);
        // const checkInRate = totalTickets > 0 ? (checkedIn / totalTickets) * 100 : 0;

        // setStats({
        //   totalTickets,
        //   checkedIn,
        //   pending,
        //   totalRevenue,
        //   checkInRate
        // });

        // Generate chart data for the last 7 days
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          return date.toISOString().split('T')[0];
        });

        const chartData = last7Days.map(date => {
          const dayTickets = tickets.filter((t: Ticket) => t.created_at.startsWith(date));
          const dayCheckedIn = tickets.filter((t: Ticket) => 
            t.checked_in && t.checked_in_at && t.checked_in_at.startsWith(date)
          );
          const dayRevenue = dayTickets.reduce((sum: number, t: Ticket) => sum + t.price, 0);

          return {
            date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            tickets: dayTickets.length,
            checkedIn: dayCheckedIn.length,
            revenue: dayRevenue
          };
        });

        setChartData(chartData);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ticket Analytics</CardTitle>
        <CardDescription>Ticket sales and check-in trends over the last 7 days</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: 'none', 
                borderRadius: '0.5rem',
                fontSize: '12px'
              }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
              labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
            />
            <Line 
              type="monotone" 
              dataKey="tickets" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2} 
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              name="Tickets Sold"
            />
            <Line 
              type="monotone" 
              dataKey="checkedIn" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2} 
              dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
              name="Checked In"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
