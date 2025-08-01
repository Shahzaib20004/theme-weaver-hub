import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Phone, Mail, MapPin, Clock, User, MessageSquare } from 'lucide-react'
import { format } from 'date-fns'
import { useCar } from '@/hooks/useApi'
import { useDealershipContact } from '@/hooks/useNotifications'
import { useCreateBooking } from '@/hooks/useApi'
import { useNotifyDealershipOfBookingRequest } from '@/hooks/useNotifications'
import { useCurrentUser } from '@/hooks/useApi'
import { toast } from 'sonner'

interface BookingRequestProps {
  onSuccess?: () => void
  onCancel?: () => void
}

const BookingRequest: React.FC<BookingRequestProps> = ({ onSuccess, onCancel }) => {
  const { carId } = useParams<{ carId: string }>()
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [specialRequests, setSpecialRequests] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch data
  const { data: car, isLoading: carLoading } = useCar(carId!)
  const { data: dealershipContact } = useDealershipContact(car?.dealership_id || '')
  const { data: currentUser } = useCurrentUser()
  
  // Mutations
  const createBooking = useCreateBooking()
  const notifyDealership = useNotifyDealershipOfBookingRequest()

  // Calculate total days and amount
  const totalDays = startDate && endDate 
    ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0

  const totalAmount = totalDays * (car?.daily_rate || 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!startDate || !endDate || !currentUser || !car) {
      toast.error('Please fill in all required fields')
      return
    }

    if (totalDays <= 0) {
      toast.error('Please select valid dates')
      return
    }

    setIsSubmitting(true)

    try {
      // Create booking
      const booking = await createBooking.mutateAsync({
        car_id: car.id,
        customer_id: currentUser.id,
        dealership_id: car.dealership_id,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        total_days: totalDays,
        total_amount: totalAmount,
        with_driver: false,
        driver_amount: 0,
        status: 'pending',
        payment_status: 'pending',
        special_requests: specialRequests || null
      })

      // Notify dealership
      await notifyDealership.mutateAsync({
        booking_id: booking.id,
        customer_id: currentUser.id,
        dealership_id: car.dealership_id,
        car_id: car.id,
        customer_phone: currentUser.phone || '',
        customer_email: currentUser.email,
        special_requests: specialRequests || undefined
      })

      toast.success('Booking request sent successfully!')
      onSuccess?.()
      
      // Navigate to booking confirmation
      navigate(`/booking-confirmation/${booking.id}`)
      
    } catch (error) {
      console.error('Booking request failed:', error)
      toast.error('Failed to send booking request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (carLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">Car not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Request Booking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Car Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{car.model}</h3>
                <p className="text-gray-600 mb-2">{car.car_brands?.name} • {car.year}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    ₹{car.daily_rate.toLocaleString()}
                  </span>
                  <Badge variant={car.status === 'available' ? 'default' : 'secondary'}>
                    {car.status}
                  </Badge>
                </div>
              </div>

              {/* Date Selection */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Pickup Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, 'PPP') : 'Select pickup date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Return Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, 'PPP') : 'Select return date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => date <= (startDate || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Special Requests (Optional)
                </label>
                <Textarea
                  placeholder="Any special requirements or requests..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Booking Summary */}
              {totalDays > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{totalDays} day{totalDays > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily Rate:</span>
                      <span>₹{car.daily_rate.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount:</span>
                      <span>₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={!startDate || !endDate || isSubmitting || car.status !== 'available'}
              >
                {isSubmitting ? 'Sending Request...' : 'Send Booking Request'}
              </Button>

              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Dealership Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Dealership Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {dealershipContact ? (
              <>
                {/* Contact Person */}
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{dealershipContact.contact_person}</p>
                    <p className="text-sm text-gray-600">Contact Person</p>
                  </div>
                </div>

                {/* Phone */}
                {dealershipContact.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{dealershipContact.phone}</p>
                      <p className="text-sm text-gray-600">Phone</p>
                    </div>
                  </div>
                )}

                {/* WhatsApp */}
                {dealershipContact.whatsapp && (
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{dealershipContact.whatsapp}</p>
                      <p className="text-sm text-gray-600">WhatsApp</p>
                    </div>
                  </div>
                )}

                {/* Email */}
                {dealershipContact.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{dealershipContact.email}</p>
                      <p className="text-sm text-gray-600">Email</p>
                    </div>
                  </div>
                )}

                {/* Address */}
                {dealershipContact.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-gray-600">{dealershipContact.address}</p>
                    </div>
                  </div>
                )}

                {/* Operating Hours */}
                {dealershipContact.operating_hours && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Operating Hours</p>
                      <div className="text-sm text-gray-600 space-y-1">
                        {Object.entries(dealershipContact.operating_hours).map(([day, hours]: [string, any]) => (
                          <div key={day} className="flex justify-between">
                            <span className="capitalize">{day}:</span>
                            <span>{hours.open} - {hours.close}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Emergency Contact */}
                {dealershipContact.emergency_contact && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium text-red-600">{dealershipContact.emergency_contact}</p>
                      <p className="text-sm text-gray-600">Emergency Contact</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">Contact information not available</p>
              </div>
            )}

            {/* Important Notes */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Booking requests are sent to the dealership for approval</li>
                <li>• You'll be notified via email/SMS when approved</li>
                <li>• Contact the dealership directly for urgent requests</li>
                <li>• Payment is typically made at pickup</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BookingRequest