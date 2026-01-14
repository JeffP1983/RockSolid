import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import {
  propertyFormSchema,
  addressSchema,
  propertyDetailsSchema,
  additionalDetailsSchema,
  contactInfoSchema,
  consentSchema,
  PropertyFormValues,
} from "../lib/validation";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { AddressStep } from "../components/forms/AddressStep";
import { PropertyDetailsStep } from "../components/forms/PropertyDetailsStep";
import { AdditionalDetailsStep } from "../components/forms/AdditionalDetailsStep";
import { ContactInfoStep } from "../components/forms/ContactInfoStep";
import { ConsentStep } from "../components/forms/ConsentStep";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

const STEPS = [
  { id: 1, name: "Address", schema: addressSchema },
  { id: 2, name: "Property Details", schema: propertyDetailsSchema },
  { id: 3, name: "Additional Details", schema: additionalDetailsSchema },
  { id: 4, name: "Contact Info", schema: contactInfoSchema },
  { id: 5, name: "Consent", schema: consentSchema },
];

export default function PropertyForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    mode: "onChange",
    defaultValues: {
      address: "",
      city: "",
      state: "TX",
      zipCode: "",
      propertyType: "single-family",
      condition: "good",
      hasRepairs: false,
      owesOnProperty: false,
      timeline: "flexible",
      smsConsent: false,
      emailConsent: false,
      termsAccepted: false,
      privacyAccepted: false,
    },
  });

  const validateCurrentStep = async () => {
    const currentStepData = STEPS[currentStep - 1];
    const fields = Object.keys(currentStepData.schema.shape);

    const isValid = await form.trigger(fields as any);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();

    if (isValid) {
      if (currentStep < STEPS.length) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      toast.error("Please fill in all required fields correctly");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: PropertyFormValues) => {
    setIsSubmitting(true);

    try {
      // TODO: Submit to API
      console.log("Form submitted:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Your request has been submitted!");
      setLocation("/thank-you");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary py-8">
      {/* Header */}
      <div className="container mx-auto px-4 mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition mb-6">
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <Home className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Get Your Cash Offer</h1>
        </div>
        <p className="text-muted-foreground">
          Fill out this form to receive an instant valuation estimate
        </p>
      </div>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 mb-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Step {currentStep} of {STEPS.length}</span>
            <span className="font-medium">{STEPS[currentStep - 1].name}</span>
          </div>
          <Progress value={progress} className="h-2" />

          {/* Step Indicators */}
          <div className="flex justify-between mt-4">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center gap-1 ${
                  step.id === currentStep
                    ? "text-primary"
                    : step.id < currentStep
                    ? "text-primary/60"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step.id === currentStep
                      ? "bg-primary text-primary-foreground"
                      : step.id < currentStep
                      ? "bg-primary/60 text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {step.id}
                </div>
                <span className="text-xs hidden sm:block">{step.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {currentStep === 1 && <AddressStep form={form} />}
                {currentStep === 2 && <PropertyDetailsStep form={form} />}
                {currentStep === 3 && <AdditionalDetailsStep form={form} />}
                {currentStep === 4 && <ContactInfoStep form={form} />}
                {currentStep === 5 && <ConsentStep form={form} />}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>

                  {currentStep < STEPS.length ? (
                    <Button type="button" onClick={handleNext}>
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Get My Offer"}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>🔒 Your information is secure and will never be shared</p>
            <p className="mt-2">💰 No obligation • No fees • No pressure</p>
          </div>
        </div>
      </div>
    </div>
  );
}
