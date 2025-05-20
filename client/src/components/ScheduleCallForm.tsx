import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { 
  CalendarIcon, 
  Loader2, 
  CheckCircle2,
  AlertCircle,
  Clock 
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type BookingStep = 'date' | 'time' | 'details' | 'confirmation';
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function ScheduleCallForm() {
  const { toast } = useToast();
  const [step, setStep] = useState<BookingStep>('date');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  
  // Fetch available time slots when a date is selected
  useEffect(() => {
    if (!date) return;
    
    async function fetchAvailableSlots() {
      setStatus('loading');
      try {
        const dateString = format(date, 'yyyy-MM-dd');
        const response = await fetch(`/api/calendar/available?date=${dateString}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch available slots');
        }
        
        setAvailableSlots(data.availableSlots || []);
        setStatus('idle');
        setStep('time');
      } catch (err) {
        setStatus('error');
        const errorMessage = err instanceof Error ? err.message : 'Failed to load available times';
        setError(errorMessage);
        
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        });
      }
    }
    
    fetchAvailableSlots();
  }, [date, toast]);
  
  // Handle time slot selection
  const handleTimeSelect = (time: string) => {
    setSelectedSlot(time);
    setStep('details');
  };
  
  // Format a time string for display
  const formatTimeSlot = (isoString: string) => {
    const date = new Date(isoString);
    return format(date, 'h:mm a');
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSlot || !name || !email || !topic) {
      setError('Please fill out all fields');
      return;
    }
    
    setStatus('loading');
    
    try {
      const response = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          startTime: selectedSlot,
          name,
          email,
          topic
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to book appointment');
      }
      
      setStatus('success');
      setStep('confirmation');
      
      toast({
        title: "Meeting scheduled!",
        description: "Your call has been booked successfully.",
      });
    } catch (err) {
      setStatus('error');
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Booking failed",
        description: errorMessage,
      });
    }
  };
  
  // Reset the booking process
  const resetBooking = () => {
    setDate(undefined);
    setSelectedSlot(undefined);
    setName('');
    setEmail('');
    setTopic('');
    setStatus('idle');
    setError(null);
    setStep('date');
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 md:p-8 mb-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Book a Call</h3>
      
      {step === 'confirmation' ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h4 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Meeting Scheduled!</h4>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your 30-minute call has been booked. You'll receive a confirmation email shortly with the meeting details.
          </p>
          <Button onClick={resetBooking}>
            Schedule Another Call
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mr-2",
                step === 'date' 
                  ? "bg-primary-500 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              )}>
                1
              </div>
              <div className={cn(
                "h-0.5 flex-1 mr-2",
                step === 'date' || step === 'time' || step === 'details'
                  ? "bg-primary-500" 
                  : "bg-gray-200 dark:bg-gray-700"
              )}></div>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mr-2",
                step === 'time' 
                  ? "bg-primary-500 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              )}>
                2
              </div>
              <div className={cn(
                "h-0.5 flex-1 mr-2",
                step === 'time' || step === 'details'
                  ? "bg-primary-500" 
                  : "bg-gray-200 dark:bg-gray-700"
              )}></div>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                step === 'details' 
                  ? "bg-primary-500 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              )}>
                3
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className={step === 'date' ? "text-primary-500 font-medium" : "text-gray-500"}>
                Choose Date
              </span>
              <span className={step === 'time' ? "text-primary-500 font-medium" : "text-gray-500"}>
                Pick Time
              </span>
              <span className={step === 'details' ? "text-primary-500 font-medium" : "text-gray-500"}>
                Your Details
              </span>
            </div>
          </div>
          
          {step === 'date' && (
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Please select a date for our 30-minute call.
              </p>
              <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={{ before: new Date() }}
                  className="mx-auto"
                />
              </div>
            </div>
          )}
          
          {step === 'time' && (
            <div>
              <div className="flex items-start mb-4">
                <CalendarIcon className="mr-2 h-5 w-5 text-primary-500" />
                <div>
                  <p className="font-medium">{date ? format(date, 'EEEE, MMMM d, yyyy') : ''}</p>
                  <Button 
                    variant="link" 
                    onClick={() => setStep('date')} 
                    className="p-0 h-auto text-primary-500"
                  >
                    Change date
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Select an available time slot:
              </p>
              
              {status === 'loading' ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant="outline"
                      className="justify-start"
                      onClick={() => handleTimeSelect(slot)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {formatTimeSlot(slot)}
                    </Button>
                  ))}
                  
                  {availableSlots.length === 0 && status !== 'loading' && (
                    <div className="col-span-2 py-4 text-center text-gray-500">
                      No available slots for this date. Please select another date.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {step === 'details' && (
            <form onSubmit={handleSubmit}>
              <div className="flex items-start mb-4">
                <CalendarIcon className="mr-2 h-5 w-5 text-primary-500" />
                <div>
                  <p className="font-medium">
                    {date ? format(date, 'EEEE, MMMM d, yyyy') : ''} at {selectedSlot ? formatTimeSlot(selectedSlot) : ''}
                  </p>
                  <Button 
                    variant="link" 
                    onClick={() => setStep('time')} 
                    className="p-0 h-auto text-primary-500"
                  >
                    Change time
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="topic">What would you like to discuss?</Label>
                  <Textarea
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                    className="w-full"
                    rows={3}
                  />
                </div>
                
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-600 dark:text-red-400 text-sm flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Scheduling...
                    </>
                  ) : 'Schedule Call'}
                </Button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}