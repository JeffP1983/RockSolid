import { Link } from "wouter";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-primary hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            Terms and conditions content will be populated here...
          </p>
        </div>
      </div>
    </div>
  );
}
