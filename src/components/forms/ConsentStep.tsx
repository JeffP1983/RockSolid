import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "@/lib/validation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { Shield } from "lucide-react";

interface ConsentStepProps {
  form: UseFormReturn<PropertyFormValues>;
}

export function ConsentStep({ form }: ConsentStepProps) {
  const { setValue, watch, formState: { errors } } = form;

  const smsConsent = watch("smsConsent");
  const emailConsent = watch("emailConsent");
  const termsAccepted = watch("termsAccepted");
  const privacyAccepted = watch("privacyAccepted");

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <Shield className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Communication Consent</h2>
        <p className="text-muted-foreground">
          We need your permission to contact you about your property
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="smsConsent"
              checked={smsConsent}
              onCheckedChange={(checked) => setValue("smsConsent", !!checked)}
              className={errors.smsConsent ? "border-destructive" : ""}
            />
            <div className="space-y-1">
              <Label
                htmlFor="smsConsent"
                className="text-sm font-normal cursor-pointer leading-relaxed"
              >
                I consent to receive automated text messages (SMS) at the phone number provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt-out.
              </Label>
              {errors.smsConsent && (
                <p className="text-sm text-destructive">{errors.smsConsent.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="emailConsent"
              checked={emailConsent}
              onCheckedChange={(checked) => setValue("emailConsent", !!checked)}
              className={errors.emailConsent ? "border-destructive" : ""}
            />
            <div className="space-y-1">
              <Label
                htmlFor="emailConsent"
                className="text-sm font-normal cursor-pointer leading-relaxed"
              >
                I consent to receive automated emails at the email address provided. You can unsubscribe at any time.
              </Label>
              {errors.emailConsent && (
                <p className="text-sm text-destructive">{errors.emailConsent.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="termsAccepted"
              checked={termsAccepted}
              onCheckedChange={(checked) => setValue("termsAccepted", !!checked)}
              className={errors.termsAccepted ? "border-destructive" : ""}
            />
            <div className="space-y-1">
              <Label
                htmlFor="termsAccepted"
                className="text-sm font-normal cursor-pointer leading-relaxed"
              >
                I have read and agree to the{" "}
                <Link href="/terms" className="text-primary underline hover:no-underline" target="_blank">
                  Terms & Conditions
                </Link>
              </Label>
              {errors.termsAccepted && (
                <p className="text-sm text-destructive">{errors.termsAccepted.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="privacyAccepted"
              checked={privacyAccepted}
              onCheckedChange={(checked) => setValue("privacyAccepted", !!checked)}
              className={errors.privacyAccepted ? "border-destructive" : ""}
            />
            <div className="space-y-1">
              <Label
                htmlFor="privacyAccepted"
                className="text-sm font-normal cursor-pointer leading-relaxed"
              >
                I have read and agree to the{" "}
                <Link href="/privacy" className="text-primary underline hover:no-underline" target="_blank">
                  Privacy Policy
                </Link>
              </Label>
              {errors.privacyAccepted && (
                <p className="text-sm text-destructive">{errors.privacyAccepted.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-muted/50 p-4 rounded-lg">
          <p className="font-semibold mb-2">TCPA Compliance Notice:</p>
          <p>
            By providing your contact information and checking these boxes, you expressly consent
            to be contacted by Rock Solid Redevelopment using automated telephone dialing systems,
            artificial or prerecorded voice messages, and text messages to the phone number(s)
            provided, even if your number is on a federal or state Do Not Call list. Consent is
            not required as a condition of purchasing any goods or services. Standard message and
            data rates may apply.
          </p>
        </div>
      </div>
    </div>
  );
}
