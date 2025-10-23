"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  // QrCode, 
  Camera, 
  CameraOff, 
  CheckCircle, 
  // XCircle,
  Volume2,
  VolumeX,
  Users,
  Clock,
  TrendingUp,
  Search,
  RotateCcw,
  // Filter
} from 'lucide-react';
import { verifyQRCodeData } from '@/lib/qr-code';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Html5Qrcode } from 'html5-qrcode';

interface Ticket {
  id: string;
  attendee_name: string;
  attendee_email: string;
  ticket_type: 'event' | 'event_afterparty';
  price: number;
  checked_in: boolean;
  checked_in_at: string | null;
  created_at: string;
  accessibility_accommodations?: string | null;
  referral_code?: string | null;
}

interface CheckInStats {
  totalToday: number;
  checkInRate: number;
  lastScanTime: string | null;
}

export default function AdminScanner() {
  // const [scanResult, setScanResult] = useState<string | null>(null);
  const [manualEmail, setManualEmail] = useState('');
  const [availableTickets, setAvailableTickets] = useState<Ticket[]>([]);
  const [checkedInTickets, setCheckedInTickets] = useState<Ticket[]>([]);
  const [showTicketSelection, setShowTicketSelection] = useState(false);
  const [scannedTicketEmail, setScannedTicketEmail] = useState<string>('');
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'checked-in' | 'not-checked-in'>('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [recentCheckIns, setRecentCheckIns] = useState<Ticket[]>([]);
  const [stats, setStats] = useState<CheckInStats>({
    totalToday: 0,
    checkInRate: 0,
    lastScanTime: null
  });
  const [checkInData, setCheckInData] = useState<Array<{time: string, count: number}>>([]);
  const [scannerStatus, setScannerStatus] = useState<string>('Initializing...');
  const [scannerPaused, setScannerPaused] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const handleScanResult = useCallback(async (scannedData: string) => {
    // setScanResult(scannedData);
    
    // Verify QR code data and extract ticket ID
    const ticketId = verifyQRCodeData(scannedData);
    
    if (!ticketId) {
      // Invalid QR code
      if (soundEnabled) {
        playErrorSound();
      }
      // setScanResult(null);
      return;
    }
    
    try {
      // First, get the ticket details to check for multiple tickets under same email
      const ticketResponse = await fetch('/api/admin/tickets');
      const ticketData = await ticketResponse.json();
      
      if (!ticketResponse.ok) {
        throw new Error('Failed to fetch tickets');
      }
      
      // Find the scanned ticket
      const scannedTicket = ticketData.tickets.find((t: Ticket) => t.id === ticketId);
      if (!scannedTicket) {
        showErrorToast('Ticket not found');
        // setScanResult(null);
        return;
      }
      
      // Check if there are other tickets under the same email
      const ticketsForEmail = ticketData.tickets.filter((t: Ticket) => 
        t.attendee_email === scannedTicket.attendee_email
      );
      
      if (ticketsForEmail.length > 1) {
        // Multiple tickets found - show selection interface
        const checkedInTickets = ticketsForEmail.filter((t: Ticket) => t.checked_in);
        const uncheckedTickets = ticketsForEmail.filter((t: Ticket) => !t.checked_in);
        
        setAvailableTickets(uncheckedTickets);
        setCheckedInTickets(checkedInTickets);
        setScannedTicketEmail(scannedTicket.attendee_email);
        setShowTicketSelection(true);
        // setScanResult(null);
        return;
      }
      
      // Single ticket - proceed with direct check-in
      const response = await fetch('/api/admin/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success feedback
        if (soundEnabled) {
          playSuccessSound();
        }
        showSuccessToast('Check-in successful!');
        
        // Refresh data
        fetchRecentCheckIns();
        
        // Check for milestones
        if (stats.totalToday > 0 && stats.totalToday % 50 === 0) {
          showConfetti();
        }
      } else {
        // Error feedback
        if (soundEnabled) {
          playErrorSound();
        }
        showErrorToast(data.error || 'Check-in failed');
      }
    } catch {
      if (soundEnabled) {
        playErrorSound();
      }
      showErrorToast('Network error');
    }

    // Clear result after delay
    setTimeout(() => {
      // setScanResult(null);
    }, 2000);
  }, [soundEnabled, stats.totalToday]);

  useEffect(() => {
    let isActive = true;
    
    const initializeScanner = async () => {
      if (scannerRef.current) return;
      
      try {
        // console.log('Initializing QR scanner...'); // Debug log
        setScannerStatus('Loading scanner library...');
        const { Html5Qrcode } = await import('html5-qrcode');
        // console.log('Html5Qrcode imported successfully'); // Debug log
        setScannerStatus('Creating scanner instance...');
        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;
        
        const config = { 
          fps: 5, // Reduced from 10 to 5 for better performance
          qrbox: { width: 250, height: 250 }, // Slightly smaller scanning area
          aspectRatio: 1.0,
          disableFlip: false, // Allow flipping for better detection
          experimentalFeatures: {
            useBarCodeDetectorIfSupported: true
          }
        };
        
        // console.log('Starting scanner with config:', config); // Debug log
        setScannerStatus('Requesting camera permission...');
        await scanner.start(
          { facingMode: "environment" },
          config,
          (decodedText) => {
            // console.log('QR Code detected:', decodedText); // Debug log
            if (isActive) {
              handleScanResult(decodedText);
            }
          },
          (errorMessage) => {
            // Only log errors that aren't common scanning errors to avoid spam
            if (!errorMessage.includes('No QR code found') && 
                !errorMessage.includes('NotFoundException') && 
                !errorMessage.includes('No barcode or QR code detected') &&
                !errorMessage.includes('No MultiFormat Readers')) {
              // console.log('Scanner error:', errorMessage); // Debug log
            }
          }
        );
        // console.log('Scanner started successfully'); // Debug log
        setScannerStatus('Scanner ready - Point camera at QR code');
      } catch (error) {
        console.error('Failed to start scanner:', error);
        setScannerStatus(`Scanner failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };
    
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      // console.log('Starting scanner initialization...'); // Debug log
      initializeScanner();
    }, 100);
    
    // Fetch check-ins polling
    fetchRecentCheckIns();
    fetchAllTickets();
    const interval = setInterval(() => {
      fetchRecentCheckIns();
      fetchAllTickets();
    }, 3000);
    
    return () => {
      isActive = false;
      clearInterval(interval);
      
      if (scannerRef.current) {
        scannerRef.current.stop().catch((err: Error) => {
          console.warn('Scanner stop error:', err);
        });
        scannerRef.current = null;
      }
    };
  }, [handleScanResult]);

  const fetchAllTickets = async () => {
    try {
      const response = await fetch('/api/admin/tickets');
      const data = await response.json();
      if (response.ok) {
        setAllTickets(data.tickets || []);
      }
    } catch (error) {
      console.error('Error fetching all tickets:', error);
    }
  };

  const fetchRecentCheckIns = async () => {
    try {
      const response = await fetch('/api/admin/tickets');
      const data = await response.json();

      if (response.ok) {
        const checkedInToday = data.tickets.filter((ticket: Ticket) => {
          if (!ticket.checked_in_at) return false;
          const today = new Date().toDateString();
          const checkInDate = new Date(ticket.checked_in_at).toDateString();
          return today === checkInDate;
        });

        setRecentCheckIns(checkedInToday.slice(0, 10));
        
        // Update stats
        const totalToday = checkedInToday.length;
        const totalTickets = data.tickets.length;
        const checkInRate = totalTickets > 0 ? (totalToday / totalTickets) * 100 : 0;
        
        setStats({
          totalToday,
          checkInRate,
          lastScanTime: checkedInToday.length > 0 ? checkedInToday[0].checked_in_at : null
        });

        // Update chart data with 5-minute intervals for event hours (9 AM to 1 PM)
        const intervalData = checkedInToday.reduce((acc: Record<string, number>, ticket: Ticket) => {
          const date = new Date(ticket.checked_in_at!);
          const hour = date.getHours();
          const minute = date.getMinutes();
          
          // Round to nearest 5-minute interval
          const roundedMinute = Math.floor(minute / 5) * 5;
          const timeKey = `${hour.toString().padStart(2, '0')}:${roundedMinute.toString().padStart(2, '0')}`;
          
          acc[timeKey] = (acc[timeKey] || 0) + 1;
          return acc;
        }, {});

        // Generate all possible 5-minute intervals for event hours (9 AM to 1 PM)
        const chartData = [];
        for (let hour = 9; hour <= 12; hour++) {
          for (let minute = 0; minute < 60; minute += 5) {
            const timeKey = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            chartData.push({
              time: timeKey,
              count: intervalData[timeKey] || 0
            });
          }
        }
        // Add 1 PM (13:00) as the final time slot
        chartData.push({
          time: '13:00',
          count: intervalData['13:00'] || 0
        });

        setCheckInData(chartData);
      }
    } catch (error) {
      console.error('Error fetching check-ins:', error);
    }
  };


  const handleManualCheckIn = async () => {
    if (!manualEmail.trim()) return;
    
    try {
      const response = await fetch('/api/admin/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: manualEmail.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success feedback
        if (soundEnabled) {
          playSuccessSound();
        }
        showSuccessToast('Check-in successful!');
        
        // Refresh data
        fetchRecentCheckIns();
        
        // Check for milestones
        if (stats.totalToday > 0 && stats.totalToday % 50 === 0) {
          showConfetti();
        }
        
        // Clear form
        setManualEmail('');
        setShowTicketSelection(false);
        setAvailableTickets([]);
        setCheckedInTickets([]);
        setScannedTicketEmail('');
      } else {
        // Handle multiple tickets scenario
        if (data.tickets && data.tickets.length > 1) {
          setAvailableTickets(data.uncheckedTickets || []);
          setCheckedInTickets(data.checkedInTickets || []);
          setScannedTicketEmail(manualEmail.trim());
          setShowTicketSelection(true);
          showErrorToast(data.message || 'Multiple tickets found - please select one');
        } else {
          // Error feedback
          if (soundEnabled) {
            playErrorSound();
          }
          showErrorToast(data.error || 'Check-in failed');
        }
      }
    } catch {
      if (soundEnabled) {
        playErrorSound();
      }
      showErrorToast('Network error');
    }
  };

  const handleTicketSelection = async (ticketId: string) => {
    try {
      const response = await fetch('/api/admin/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success feedback
        if (soundEnabled) {
          playSuccessSound();
        }
        showSuccessToast('Check-in successful!');
        
        // Refresh data
        fetchRecentCheckIns();
        
        // Clear form and selection
        setManualEmail('');
        setShowTicketSelection(false);
        setAvailableTickets([]);
        setCheckedInTickets([]);
        setScannedTicketEmail('');
      } else {
        // Error feedback
        if (soundEnabled) {
          playErrorSound();
        }
        showErrorToast(data.error || 'Check-in failed');
      }
    } catch {
      if (soundEnabled) {
        playErrorSound();
      }
      showErrorToast('Network error');
    }
  };

  const handleManualToggleCheckIn = async (ticketId: string, currentStatus: boolean) => {
    try {
      const action = currentStatus ? 'checkout' : 'checkin';
      const response = await fetch('/api/admin/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketId, action }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success feedback
        if (soundEnabled) {
          playSuccessSound();
        }
        showSuccessToast(data.action === 'checkout' ? 'Check-out successful!' : 'Check-in successful!');
        
        // Refresh data
        fetchRecentCheckIns();
        fetchAllTickets();
      } else {
        // Error feedback
        if (soundEnabled) {
          playErrorSound();
        }
        showErrorToast(data.error || 'Operation failed');
      }
    } catch {
      if (soundEnabled) {
        playErrorSound();
      }
      showErrorToast('Network error');
    }
  };

  const toggleScanner = async () => {
    if (!scannerRef.current) return;
    
    try {
      if (scannerPaused) {
        await scannerRef.current.resume();
        setScannerPaused(false);
        setScannerStatus('Scanner ready - Point camera at QR code');
      } else {
        await scannerRef.current.pause();
        setScannerPaused(true);
        setScannerStatus('Scanner paused');
      }
    } catch (error) {
      console.error('Error toggling scanner:', error);
    }
  };

  // Filter tickets based on search and status
  const filteredTickets = allTickets.filter(ticket => {
    const matchesSearch = 
      ticket.attendee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.attendee_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' ||
      (filterStatus === 'checked-in' && ticket.checked_in) ||
      (filterStatus === 'not-checked-in' && !ticket.checked_in);
    
    return matchesSearch && matchesFilter;
  });

  const playSuccessSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    audio.play().catch(() => {});
  };

  const playErrorSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    audio.play().catch(() => {});
  };

  const showSuccessToast = (message: string) => {
    // Simple toast implementation
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const showErrorToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const showConfetti = () => {
    // Simple confetti effect
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = ['#E50609', '#ffffff', '#ffd700'][Math.floor(Math.random() * 3)];
      confetti.style.zIndex = '9999';
      confetti.style.pointerEvents = 'none';
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.style.transition = 'all 3s ease-out';
        confetti.style.transform = `translateY(100vh) rotate(720deg)`;
        setTimeout(() => confetti.remove(), 3000);
      }, 100);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">QR Scanner</h1>
          <p className="text-muted-foreground">Scan tickets for check-in</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Checked In Today</p>
                <p className="text-2xl font-bold">{stats.totalToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Check-in Rate</p>
                <p className="text-2xl font-bold">{stats.checkInRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Last Scan</p>
                <p className="text-sm font-bold">
                  {stats.lastScanTime 
                    ? new Date(stats.lastScanTime).toLocaleTimeString()
                    : 'No scans yet'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              QR Code Scanner
            </CardTitle>
            <CardDescription>Point camera at ticket QR code to check in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Scanner Status */}
              <div className="text-center">
                <Badge variant={scannerStatus.includes('ready') ? 'default' : scannerStatus.includes('failed') ? 'destructive' : 'secondary'}>
                  {scannerStatus}
                </Badge>
              </div>
              
              {/* Scanner Viewport - always visible */}
              <div 
                id="qr-reader" 
                className="w-full aspect-square max-w-md mx-auto rounded-lg overflow-hidden border-2 border-primary"
                style={{ position: 'relative' }}
              />
              
              {/* Manual Input */}
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Or enter attendee email manually"
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleManualCheckIn()}
                  disabled={showTicketSelection}
                />
                <Button 
                  onClick={handleManualCheckIn} 
                  disabled={!manualEmail.trim() || showTicketSelection}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Check In
                </Button>
              </div>
              
              {/* Ticket Selection */}
              {showTicketSelection && (availableTickets.length > 0 || checkedInTickets.length > 0) && (
                <div className="space-y-3">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">Ticket Status</h3>
                    <p className="text-sm text-muted-foreground">
                      Multiple tickets found for {scannedTicketEmail}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {scannedTicketEmail === manualEmail ? 'Manual entry' : 'QR code scan'}
                    </p>
                  </div>
                  
                  {/* Available Tickets */}
                  {availableTickets.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-green-600">Available for Check-in</h4>
                      {availableTickets.map((ticket) => (
                        <div 
                          key={ticket.id}
                          className="flex items-center justify-between p-3 border border-green-200 rounded-lg hover:bg-green-50 cursor-pointer"
                          onClick={() => handleTicketSelection(ticket.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {ticket.ticket_type === 'event' ? 'E' : 'A'}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{ticket.attendee_name}</p>
                              <p className="text-sm text-muted-foreground">
                                {ticket.ticket_type === 'event' ? 'Event Only' : 'Event + After Party'}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">${ticket.price}</p>
                            <p className="text-xs text-muted-foreground">
                              ID: {ticket.id.slice(-8)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Already Checked In Tickets */}
                  {checkedInTickets.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500">Already Checked In</h4>
                      {checkedInTickets.map((ticket) => (
                        <div 
                          key={ticket.id}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-600">{ticket.attendee_name}</p>
                              <p className="text-sm text-gray-400">
                                {ticket.ticket_type === 'event' ? 'Event Only' : 'Event + After Party'}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-600">${ticket.price}</p>
                            <p className="text-xs text-gray-400">
                              Checked in: {ticket.checked_in_at ? new Date(ticket.checked_in_at).toLocaleTimeString() : 'Unknown'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-center">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowTicketSelection(false);
                        setAvailableTickets([]);
                        setCheckedInTickets([]);
                        setManualEmail('');
                        setScannedTicketEmail('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Debug Test Button */}
              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    // console.log('Testing scan result...');
                    handleScanResult('eyJ0aWNrZXRJZCI6IlRFRFgtVEVTVC0xMjM0NTY3ODkwLUFCQzEyMyIsInRpbWVzdGFtcCI6MTc2MTE3NjA0OTMzNCwic2lnbmF0dXJlIjoiZjBkM2NhM2ZjYzJiODkyMTMyOWYxYjcwM2M1NjAwMmY4NWI1ZDNmZDZkZGM1YjY4MzY0Y2EzOGRhYjBiYWRjZCJ9');
                  }}
                >
                  Test QR Code
                </Button>
              </div>
              
              {/* Scanner Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Sound Feedback</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleScanner}
                  disabled={!scannerRef.current}
                >
                  {scannerPaused ? <Camera className="h-4 w-4 mr-2" /> : <CameraOff className="h-4 w-4 mr-2" />}
                  {scannerPaused ? 'Resume Scanner' : 'Pause Scanner'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Check-ins */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Check-ins</CardTitle>
            <CardDescription>Latest check-ins today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[32rem] overflow-y-auto">
              {recentCheckIns.map((ticket, index) => (
                <div 
                  key={ticket.id} 
                  className="flex items-center justify-between p-3 bg-secondary rounded-lg animate-in slide-in-from-right"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{ticket.attendee_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {ticket.ticket_type === 'event' ? 'Event Only' : 'Event + After Party'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="bg-green-500 text-white">
                      Checked In
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(ticket.checked_in_at!).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {recentCheckIns.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <Clock className="h-12 w-12 mx-auto mb-2" />
                  <p>No check-ins yet today</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Check-in Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Check-ins Timeline</CardTitle>
          <CardDescription>Check-ins by 5-minute intervals during event hours (9 AM - 1 PM)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={checkInData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9ca3af" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
                tickFormatter={(value) => {
                  // Show every 12th tick (every hour) to avoid crowding
                  // const hour = parseInt(value.split(':')[0]);
                  const minute = parseInt(value.split(':')[1]);
                  return minute === 0 ? value : '';
                }}
              />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '6px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#E50609" 
                strokeWidth={2}
                dot={{ fill: '#E50609', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* All Attendees Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            All Attendees
          </CardTitle>
          <CardDescription>Search and manage all attendees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or ticket ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                >
                  All ({allTickets.length})
                </Button>
                <Button
                  variant={filterStatus === 'checked-in' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('checked-in')}
                >
                  Checked In ({allTickets.filter(t => t.checked_in).length})
                </Button>
                <Button
                  variant={filterStatus === 'not-checked-in' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('not-checked-in')}
                >
                  Not Checked In ({allTickets.filter(t => !t.checked_in).length})
                </Button>
              </div>
            </div>

            {/* Attendees Table */}
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Email</th>
                      <th className="text-left p-3 font-medium">Ticket Type</th>
                      <th className="text-left p-3 font-medium">Price</th>
                      <th className="text-left p-3 font-medium">Accessibility</th>
                      <th className="text-left p-3 font-medium">Referral</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Check-in Time</th>
                      <th className="text-center p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.map((ticket) => (
                      <tr key={ticket.id} className="border-t hover:bg-muted/50">
                        <td className="p-3">
                          <div className="font-medium">{ticket.attendee_name}</div>
                          <div className="text-sm text-muted-foreground">
                            ID: {ticket.id.slice(-8)}
                          </div>
                        </td>
                        <td className="p-3 text-sm">{ticket.attendee_email}</td>
                        <td className="p-3">
                          <Badge variant={ticket.ticket_type === 'event' ? 'secondary' : 'default'}>
                            {ticket.ticket_type === 'event' ? 'Event Only' : 'Event + After Party'}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm font-medium">${ticket.price}</td>
                        <td className="p-3 text-sm">
                          {ticket.accessibility_accommodations ? (
                            <div className="max-w-xs">
                              <div className="text-xs text-muted-foreground mb-1">Accommodations:</div>
                              <div className="text-xs bg-blue-50 p-2 rounded border">
                                {ticket.accessibility_accommodations}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="p-3 text-sm">
                          {ticket.referral_code ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {ticket.referral_code}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="p-3">
                          <Badge variant={ticket.checked_in ? 'default' : 'outline'}>
                            {ticket.checked_in ? 'Checked In' : 'Not Checked In'}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">
                          {ticket.checked_in_at 
                            ? new Date(ticket.checked_in_at).toLocaleString()
                            : '-'
                          }
                        </td>
                        <td className="p-3 text-center">
                          <Button
                            size="sm"
                            variant={ticket.checked_in ? 'outline' : 'default'}
                            onClick={() => handleManualToggleCheckIn(ticket.id, ticket.checked_in)}
                            className="flex items-center gap-1"
                          >
                            {ticket.checked_in ? (
                              <>
                                <RotateCcw className="h-3 w-3" />
                                Check Out
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-3 w-3" />
                                Check In
                              </>
                            )}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredTickets.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <Users className="h-12 w-12 mx-auto mb-2" />
                  <p>No attendees found</p>
                  {searchQuery && (
                    <p className="text-sm">Try adjusting your search or filter</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}