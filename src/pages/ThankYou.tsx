import { Link } from "wouter";
import { CheckCircle } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-muted-foreground mb-6">
          We've received your submission and will contact you shortly with your cash offer.
        </p>
        <Link href="/">
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
