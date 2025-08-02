import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Copy, CheckCircle, Upload, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageType: "basic" | "featured" | "premium";
  onPaymentSubmit: (paymentData: any) => void;
}

const PaymentModal = ({ isOpen, onClose, packageType, onPaymentSubmit }: PaymentModalProps) => {
  const [paymentData, setPaymentData] = useState({
    senderName: "",
    transactionId: "",
    amount: "",
    paymentDate: "",
    notes: "",
    receiptImage: null as string | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const packageDetails = {
    basic: { price: 0, features: ["Basic listing", "Standard visibility", "7 days active"] },
    featured: { price: 1000, features: ["Featured placement", "Enhanced visibility", "30 days active", "Priority support"] },
    premium: { price: 5000, features: ["Top placement", "Maximum visibility", "60 days active", "Premium badge", "Priority support", "Social media promotion"] }
  };

  const bankDetails = {
    bankName: "Faysal Bank",
    accountNumber: "3773301000000145",
    accountTitle: "Kaar.Rentals",
    iban: "PK47FAYS3773301000000145"
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Account number copied to clipboard",
    });
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPaymentData({ ...paymentData, receiptImage: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!paymentData.senderName || !paymentData.transactionId || !paymentData.amount) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      if (parseInt(paymentData.amount) !== packageDetails[packageType].price) {
        toast({
          title: "Incorrect amount",
          description: `Amount should be PKR ${packageDetails[packageType].price}`,
          variant: "destructive",
        });
        return;
      }

      await onPaymentSubmit({
        ...paymentData,
        packageType,
        expectedAmount: packageDetails[packageType].price
      });

      toast({
        title: "Payment submitted!",
        description: "Your payment details have been submitted for verification.",
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit payment details",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (packageType === "basic") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Free Basic Listing
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Basic listing is free! Your ad will be submitted for admin approval.
            </p>
            <Button onClick={onClose} className="bg-gold hover:bg-gold/90 text-dark">
              Continue with Basic Listing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-gold" />
            {packageType === "featured" ? "Featured" : "Premium"} Package Payment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Package Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Package Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Package:</span>
                  <Badge variant="secondary" className="bg-gold/20 text-gold">
                    {packageType.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Price:</span>
                  <span className="text-xl font-bold text-gold">
                    PKR {packageDetails[packageType].price.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="font-medium mb-2 block">Features:</span>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {packageDetails[packageType].features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bank Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Bank Transfer Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-dark-elevated rounded">
                  <div>
                    <p className="font-medium">Bank Name</p>
                    <p className="text-muted-foreground">{bankDetails.bankName}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-dark-elevated rounded">
                  <div>
                    <p className="font-medium">Account Number</p>
                    <p className="text-muted-foreground">{bankDetails.accountNumber}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(bankDetails.accountNumber)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-dark-elevated rounded">
                  <div>
                    <p className="font-medium">Account Title</p>
                    <p className="text-muted-foreground">{bankDetails.accountTitle}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-dark-elevated rounded">
                  <div>
                    <p className="font-medium">IBAN</p>
                    <p className="text-muted-foreground text-sm">{bankDetails.iban}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(bankDetails.iban)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Confirmation</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="senderName">Sender Name *</Label>
                    <Input
                      id="senderName"
                      value={paymentData.senderName}
                      onChange={(e) => setPaymentData({ ...paymentData, senderName: e.target.value })}
                      placeholder="Name on bank account"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="transactionId">Transaction ID *</Label>
                    <Input
                      id="transactionId"
                      value={paymentData.transactionId}
                      onChange={(e) => setPaymentData({ ...paymentData, transactionId: e.target.value })}
                      placeholder="Bank transaction reference"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Amount Paid *</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={paymentData.amount}
                      onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                      placeholder={`PKR ${packageDetails[packageType].price}`}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="paymentDate">Payment Date</Label>
                    <Input
                      id="paymentDate"
                      type="date"
                      value={paymentData.paymentDate}
                      onChange={(e) => setPaymentData({ ...paymentData, paymentDate: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="receiptUpload">Upload Payment Receipt</Label>
                  <div className="mt-2">
                    <Input
                      id="receiptUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleReceiptUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('receiptUpload')?.click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {paymentData.receiptImage ? "Receipt Uploaded" : "Upload Receipt"}
                    </Button>
                  </div>
                  {paymentData.receiptImage && (
                    <img
                      src={paymentData.receiptImage}
                      alt="Payment receipt"
                      className="mt-2 w-32 h-32 object-cover rounded border"
                    />
                  )}
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={paymentData.notes}
                    onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
                    placeholder="Any additional information about the payment"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gold hover:bg-gold/90 text-dark"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Payment"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;