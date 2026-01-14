export type PropertyType =
  | "single-family"
  | "multi-family"
  | "condo"
  | "townhouse"
  | "mobile-home"
  | "land"
  | "commercial"
  | "other";

export type PropertyCondition =
  | "excellent"
  | "good"
  | "fair"
  | "poor"
  | "needs-major-repairs";

export type TimelinePreference =
  | "asap"
  | "1-month"
  | "3-months"
  | "6-months"
  | "flexible";

export interface PropertyFormData {
  // Step 1: Property Address
  address: string;
  city: string;
  state: string;
  zipCode: string;

  // Step 2: Property Details
  propertyType: PropertyType;
  yearBuilt?: number;
  squareFeet?: number;
  bedrooms?: number;
  bathrooms?: number;
  condition: PropertyCondition;

  // Step 3: Additional Details
  hasRepairs: boolean;
  repairDescription?: string;
  owesOnProperty: boolean;
  mortgageBalance?: number;
  timeline: TimelinePreference;

  // Step 4: Contact Information
  fullName: string;
  email: string;
  phone: string;

  // Step 5: Consent & Legal
  smsConsent: boolean;
  emailConsent: boolean;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

export interface PropertyValuation {
  estimatedValue: number;
  cashOffer: number;
  arv: number; // After Repair Value
  repairCosts?: number;
  comparables?: {
    address: string;
    price: number;
    distance: number;
  }[];
  confidence: "high" | "medium" | "low";
  lastUpdated: Date;
}

export interface PropertySubmission extends PropertyFormData {
  id: string;
  submittedAt: Date;
  valuation?: PropertyValuation;
  status: "pending" | "reviewed" | "offer-sent" | "closed" | "rejected";
}
