import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "../../lib/validation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Home } from "lucide-react";

interface PropertyDetailsStepProps {
  form: UseFormReturn<PropertyFormValues>;
}

export function PropertyDetailsStep({ form }: PropertyDetailsStepProps) {
  const { register, setValue, watch, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <Home className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Property Details</h2>
        <p className="text-muted-foreground">
          Tell us about your property
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="propertyType">Property Type *</Label>
          <Select
            value={watch("propertyType")}
            onValueChange={(value) => setValue("propertyType", value as any)}
          >
            <SelectTrigger className={errors.propertyType ? "border-destructive" : ""}>
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single-family">Single Family Home</SelectItem>
              <SelectItem value="multi-family">Multi-Family Home</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="mobile-home">Mobile Home</SelectItem>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.propertyType && (
            <p className="text-sm text-destructive mt-1">{errors.propertyType.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="condition">Property Condition *</Label>
          <Select
            value={watch("condition")}
            onValueChange={(value) => setValue("condition", value as any)}
          >
            <SelectTrigger className={errors.condition ? "border-destructive" : ""}>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent">Excellent - Move-in ready</SelectItem>
              <SelectItem value="good">Good - Minor repairs needed</SelectItem>
              <SelectItem value="fair">Fair - Some repairs needed</SelectItem>
              <SelectItem value="poor">Poor - Significant repairs needed</SelectItem>
              <SelectItem value="needs-major-repairs">Needs Major Repairs</SelectItem>
            </SelectContent>
          </Select>
          {errors.condition && (
            <p className="text-sm text-destructive mt-1">{errors.condition.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="yearBuilt">Year Built</Label>
            <Input
              id="yearBuilt"
              type="number"
              placeholder="1990"
              {...register("yearBuilt", { valueAsNumber: true })}
            />
          </div>

          <div>
            <Label htmlFor="squareFeet">Square Feet</Label>
            <Input
              id="squareFeet"
              type="number"
              placeholder="2000"
              {...register("squareFeet", { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              type="number"
              placeholder="3"
              {...register("bedrooms", { valueAsNumber: true })}
            />
          </div>

          <div>
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              type="number"
              step="0.5"
              placeholder="2"
              {...register("bathrooms", { valueAsNumber: true })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
