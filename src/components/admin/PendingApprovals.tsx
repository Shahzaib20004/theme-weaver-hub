import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Car, 
  MapPin, 
  DollarSign, 
  Calendar,
  User,
  CreditCard,
  Clock,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PendingCar {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  daily_rate: number;
  description: string;
  images: string[];
  location: {
    address: string;
    city: string;
    area: string;
    latitude: number;
    longitude: number;
  };
  package_type: string;
  package_price: number;
  payment_data: any;
  user_id: string;
  created_at: string;
  condition: string;
  color: string;
  transmission: string;
  fuel_type: string;
  seats: number;
  features: string[];
  mileage: string;
  with_driver: boolean;
  owner_name?: string;
  owner_email?: string;
  owner_phone?: string;
}

const PendingApprovals = () => {
  const [pendingCars, setPendingCars] = useState<PendingCar[]>([]);
  const [selectedCar, setSelectedCar] = useState<PendingCar | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('cars')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email,
            phone
          )
        `)
        .eq('status', 'pending_approval')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedData = data?.map(car => ({
        ...car,
        owner_name: car.profiles?.full_name || 'Unknown',
        owner_email: car.profiles?.email || 'No email',
        owner_phone: car.profiles?.phone || 'No phone'
      })) || [];

      setPendingCars(formattedData);
    } catch (error) {
      console.error('Error fetching pending approvals:', error);
      toast({
        title: "Error",
        description: "Failed to fetch pending approvals",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const approveCar = async (carId: string) => {
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('cars')
        .update({ 
          status: 'approved',
          approved_at: new Date().toISOString(),
          is_available: true
        })
        .eq('id', carId);

      if (error) throw error;

      // Send notification to user (you can implement email/SMS here)
      await sendNotificationToUser(selectedCar?.user_id, 'approved', selectedCar?.title);

      toast({
        title: "Car Approved!",
        description: "The car listing has been approved and is now live.",
      });

      fetchPendingApprovals();
      setShowDetails(false);
      setSelectedCar(null);
    } catch (error) {
      console.error('Error approving car:', error);
      toast({
        title: "Error",
        description: "Failed to approve car listing",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const rejectCar = async () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Rejection reason required",
        description: "Please provide a reason for rejection",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('cars')
        .update({ 
          status: 'rejected',
          rejection_reason: rejectionReason,
          rejected_at: new Date().toISOString()
        })
        .eq('id', selectedCar?.id);

      if (error) throw error;

      // Send notification to user
      await sendNotificationToUser(selectedCar?.user_id, 'rejected', selectedCar?.title, rejectionReason);

      toast({
        title: "Car Rejected",
        description: "The car listing has been rejected and user has been notified.",
      });

      fetchPendingApprovals();
      setShowDetails(false);
      setShowRejectModal(false);
      setSelectedCar(null);
      setRejectionReason("");
    } catch (error) {
      console.error('Error rejecting car:', error);
      toast({
        title: "Error",
        description: "Failed to reject car listing",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const sendNotificationToUser = async (userId: string, status: 'approved' | 'rejected', carTitle?: string, reason?: string) => {
    try {
      // Insert notification into database
      await supabase
        .from('notifications')
        .insert([{
          user_id: userId,
          type: 'listing_status',
          title: `Car Listing ${status === 'approved' ? 'Approved' : 'Rejected'}`,
          message: status === 'approved' 
            ? `Your car listing "${carTitle}" has been approved and is now live!`
            : `Your car listing "${carTitle}" has been rejected. Reason: ${reason}`,
          read: false,
          created_at: new Date().toISOString()
        }]);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const getPackageBadgeColor = (packageType: string) => {
    switch (packageType) {
      case 'premium': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'featured': return 'bg-gold/20 text-gold border-gold/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-gold border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading pending approvals...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Pending Approvals</h2>
        <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
          {pendingCars.length} Pending
        </Badge>
      </div>

      {pendingCars.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">All Caught Up!</h3>
            <p className="text-muted-foreground">No pending car listings require approval at this time.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {pendingCars.map((car) => (
            <Card key={car.id} className="hover:border-gold/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Car Image */}
                  <div className="w-24 h-24 bg-dark-elevated rounded-lg overflow-hidden flex-shrink-0">
                    {car.images && car.images[0] ? (
                      <img 
                        src={car.images[0]} 
                        alt={car.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Car className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Car Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground truncate">
                          {car.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {car.brand} {car.model} ({car.year})
                        </p>
                      </div>
                      <Badge className={getPackageBadgeColor(car.package_type)}>
                        {car.package_type.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gold" />
                        <span>PKR {car.daily_rate?.toLocaleString()}/day</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span>{car.location?.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-green-400" />
                        <span>{car.owner_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-400" />
                        <span>{formatDate(car.created_at)}</span>
                      </div>
                    </div>

                    {car.package_type !== 'basic' && car.payment_data && (
                      <div className="mt-2 p-2 bg-blue-500/10 border border-blue-500/20 rounded">
                        <div className="flex items-center gap-2 text-sm text-blue-400">
                          <CreditCard className="w-4 h-4" />
                          <span>Payment: PKR {car.package_price} - {car.payment_data.transactionId}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedCar(car);
                        setShowDetails(true);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detailed Review Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Car className="w-5 h-5 text-gold" />
              Review Car Listing
            </DialogTitle>
          </DialogHeader>

          {selectedCar && (
            <div className="space-y-6">
              {/* Image Gallery */}
              <div>
                <h3 className="font-semibold mb-3">Images ({selectedCar.images?.length || 0})</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {selectedCar.images?.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Car image ${index + 1}`}
                        className="w-full h-24 object-cover rounded border"
                      />
                      {index === 0 && (
                        <Badge className="absolute top-1 left-1 text-xs">Main</Badge>
                      )}
                    </div>
                  )) || (
                    <p className="text-muted-foreground col-span-full">No images uploaded</p>
                  )}
                </div>
              </div>

              {/* Car Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Car Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Title:</span>
                      <span>{selectedCar.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Brand:</span>
                      <span>{selectedCar.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Model:</span>
                      <span>{selectedCar.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Year:</span>
                      <span>{selectedCar.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span>{selectedCar.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Color:</span>
                      <span>{selectedCar.color || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Condition:</span>
                      <span>{selectedCar.condition || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transmission:</span>
                      <span>{selectedCar.transmission || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fuel Type:</span>
                      <span>{selectedCar.fuel_type || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seats:</span>
                      <span>{selectedCar.seats || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mileage:</span>
                      <span>{selectedCar.mileage || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">With Driver:</span>
                      <span>{selectedCar.with_driver ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Daily Rate:</span>
                      <span className="font-semibold text-gold">PKR {selectedCar.daily_rate?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Owner & Package</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Owner:</span>
                      <span>{selectedCar.owner_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{selectedCar.owner_email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>{selectedCar.owner_phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Package:</span>
                      <Badge className={getPackageBadgeColor(selectedCar.package_type)}>
                        {selectedCar.package_type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Package Price:</span>
                      <span className="font-semibold">PKR {selectedCar.package_price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Submitted:</span>
                      <span>{formatDate(selectedCar.created_at)}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <h3 className="font-semibold mb-3 mt-6">Location</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Address:</span>
                      <span>{selectedCar.location?.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">City:</span>
                      <span>{selectedCar.location?.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Area:</span>
                      <span>{selectedCar.location?.area}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`https://maps.google.com/?q=${selectedCar.location?.latitude},${selectedCar.location?.longitude}`, '_blank')}
                    >
                      View on Map
                    </Button>
                  </div>
                </div>
              </div>

              {/* Features */}
              {selectedCar.features && selectedCar.features.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCar.features.map((feature, index) => (
                      <Badge key={index} variant="secondary">{feature}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {selectedCar.description && (
                <div>
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-sm text-muted-foreground p-3 bg-dark-elevated rounded border">
                    {selectedCar.description}
                  </p>
                </div>
              )}

              {/* Payment Information */}
              {selectedCar.package_type !== 'basic' && selectedCar.payment_data && (
                <div>
                  <h3 className="font-semibold mb-3">Payment Information</h3>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sender Name:</span>
                      <span>{selectedCar.payment_data.senderName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Transaction ID:</span>
                      <span>{selectedCar.payment_data.transactionId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Amount:</span>
                      <span>PKR {selectedCar.payment_data.amount}</span>
                    </div>
                    {selectedCar.payment_data.paymentDate && (
                      <div className="flex justify-between text-sm">
                        <span>Payment Date:</span>
                        <span>{selectedCar.payment_data.paymentDate}</span>
                      </div>
                    )}
                    {selectedCar.payment_data.receiptImage && (
                      <div className="mt-2">
                        <span className="text-sm font-medium">Payment Receipt:</span>
                        <img 
                          src={selectedCar.payment_data.receiptImage} 
                          alt="Payment receipt"
                          className="mt-2 max-w-xs h-auto rounded border cursor-pointer"
                          onClick={() => window.open(selectedCar.payment_data.receiptImage, '_blank')}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => approveCar(selectedCar.id)}
                  disabled={isProcessing}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {isProcessing ? "Approving..." : "Approve"}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setShowRejectModal(true)}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Rejection Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Reject Car Listing
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please provide a reason for rejecting this car listing. This will be sent to the owner.
            </p>
            <div>
              <Label htmlFor="rejection-reason">Rejection Reason</Label>
              <Textarea
                id="rejection-reason"
                placeholder="e.g., Images are unclear, missing documentation, inappropriate content..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowRejectModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={rejectCar}
                disabled={isProcessing || !rejectionReason.trim()}
                className="flex-1"
              >
                {isProcessing ? "Rejecting..." : "Reject Listing"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PendingApprovals;