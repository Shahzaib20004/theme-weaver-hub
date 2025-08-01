import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gold mb-4">Privacy Policy</h1>
          <p className="text-text-secondary">Last updated: January 2024</p>
        </div>

        <Card className="bg-dark-surface border-border mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-text-secondary">
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              list a vehicle, or contact us for support.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Personal information (name, email, phone number)</li>
              <li>Vehicle information and documentation</li>
              <li>Payment and billing information</li>
              <li>Communications and correspondence</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-dark-surface border-border mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-text-secondary">
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-dark-surface border-border mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Information Sharing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-text-secondary">
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this privacy policy.
            </p>
            <p>
              We may share your information with service providers who assist us in operating our 
              platform and conducting our business.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dark-surface border-border mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-text-secondary">
            <p>
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dark-surface border-border mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Platform Responsibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-text-secondary">
            <p className="font-semibold text-gold">
              IMPORTANT DISCLAIMER: Kaar.Rentals is solely a platform service that connects car owners 
              with potential renters. We are not responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Any damage to vehicles during rental periods</li>
              <li>Personal injury or accidents involving rental vehicles</li>
              <li>Disputes between car owners and renters</li>
              <li>The condition, safety, or legality of listed vehicles</li>
              <li>Financial transactions between parties</li>
              <li>Insurance coverage or claims</li>
            </ul>
            <p className="font-semibold text-destructive">
              Users engage in rental transactions at their own risk and are responsible for obtaining 
              appropriate insurance coverage and following all applicable laws.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dark-surface border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="text-text-secondary">
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              Email: kaar.rentals@gmail.com<br />
              Phone: 03090017510
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;