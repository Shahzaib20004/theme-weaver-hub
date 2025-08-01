import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gold mb-4">Terms and Conditions</h1>
          <p className="text-text-secondary">Last updated: January 2024</p>
        </div>

        <Card className="bg-dark-surface border-border mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-text-secondary">
            <p>
              By accessing and using Kaar.Rentals, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dark-surface border-border mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Platform Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-text-secondary">
            <p>
              Kaar.Rentals is an online platform that facilitates connections between car owners 
              and individuals seeking to rent vehicles. We do not own, operate, or control any 
              of the vehicles listed on our platform.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dark-surface border-border mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">User Responsibilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-text-secondary">
            <p>Users agree to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide accurate and truthful information</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Respect the rights and property of others</li>
              <li>Use the platform for legitimate purposes only</li>
              <li>Maintain the confidentiality of their account credentials</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-dark-surface border-border mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground text-destructive">LIMITATION OF LIABILITY</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-text-secondary">
            <p className="font-bold text-destructive text-lg">
              KAAR.RENTALS DISCLAIMS ALL RESPONSIBILITY AND LIABILITY FOR:
            </p>
            <ul className="list-disc list-inside space-y-2 font-semibold">
              <li>ANY DAMAGE, LOSS, OR INJURY TO PERSONS OR PROPERTY</li>
              <li>VEHICLE ACCIDENTS, BREAKDOWNS, OR MECHANICAL FAILURES</li>
              <li>THEFT, VANDALISM, OR DAMAGE TO RENTAL VEHICLES</li>
              <li>DISPUTES BETWEEN CAR OWNERS AND RENTERS</li>
              <li>FINANCIAL LOSSES OR PAYMENT DISPUTES</li>
              <li>INSURANCE CLAIMS OR COVERAGE ISSUES</li>
              <li>LEGAL VIOLATIONS OR REGULATORY NON-COMPLIANCE</li>
            </ul>
            <p className="font-bold text-destructive bg-dark-elevated p-4 rounded-lg border border-destructive">
              USERS ACKNOWLEDGE THAT THEY ENGAGE IN ALL RENTAL TRANSACTIONS ENTIRELY AT THEIR OWN RISK. 
              KAAR.RENTALS IS SOLELY A PLATFORM SERVICE AND BEARS NO RESPONSIBILITY FOR ANY CONSEQUENCES 
              ARISING FROM THE USE OF OUR PLATFORM OR RENTAL ACTIVITIES.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dark-surface border-border mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Insurance and Legal Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-text-secondary">
            <p>
              Users are solely responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Obtaining appropriate insurance coverage</li>
              <li>Verifying driver licenses and legal requirements</li>
              <li>Ensuring compliance with local laws and regulations</li>
              <li>Resolving any legal disputes independently</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-dark-surface border-border mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Account Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-text-secondary">
            <p>
              We reserve the right to terminate or suspend your account at any time for violations 
              of these terms or for any other reason at our sole discretion.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dark-surface border-border mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Indemnification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-text-secondary">
            <p className="font-semibold">
              Users agree to indemnify and hold harmless Kaar.Rentals from any claims, damages, 
              losses, or expenses arising from their use of the platform or rental activities.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dark-surface border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="text-text-secondary">
            <p>
              For questions about these Terms and Conditions, contact us at:
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

export default Terms;