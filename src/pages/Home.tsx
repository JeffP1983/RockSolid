import { Link } from "wouter";
import { Home as HomeIcon, DollarSign, Clock, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HomeIcon className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Rock Solid Redevelopment</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="/get-offer" className="text-foreground hover:text-primary transition">
              Get Offer
            </Link>
          </nav>
          <Link href="/get-offer">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition">
              Get Cash Offer
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Sell Your House Fast for Cash
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Get an instant cash offer for your property. No fees, no repairs, no hassle.
          We buy houses in any condition across Texas.
        </p>
        <Link href="/get-offer">
          <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition">
            Get Your Free Offer Now
          </button>
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fair Cash Offers</h3>
            <p className="text-muted-foreground">
              Competitive prices based on current market value and property condition
            </p>
          </div>
          <div className="text-center p-6">
            <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Closing</h3>
            <p className="text-muted-foreground">
              Close in as little as 7 days, or on your timeline
            </p>
          </div>
          <div className="text-center p-6">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Obligations</h3>
            <p className="text-muted-foreground">
              Get your offer with no commitment, no fees, no pressure
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Rock Solid Redevelopment. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/privacy" className="hover:text-primary transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
