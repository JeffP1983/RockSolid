import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "../../lib/validation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { MapPin } from "lucide-react";

interface AddressStepProps {
  form: UseFormReturn<PropertyFormValues>;
}

export function AddressStep({ form }: AddressStepProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Property Address</h2>
        <p className="text-muted-foreground">
          Let's start with where your property is located
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="address">Street Address *</Label>
          <Input
            id="address"
            placeholder="123 Main Street"
            {...register("address")}
            className={errors.address ? "border-destructive" : ""}
          />
          {errors.address && (
            <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              placeholder="Dallas"
              {...register("city")}
              className={errors.city ? "border-destructive" : ""}
            />
            {errors.city && (
              <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              placeholder="TX"
              maxLength={2}
              {...register("state")}
              className={errors.state ? "border-destructive" : ""}
            />
            {errors.state && (
              <p className="text-sm text-destructive mt-1">{errors.state.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="zipCode">ZIP Code *</Label>
          <Input
            id="zipCode"
            placeholder="75201"
            maxLength={5}
            {...register("zipCode")}
            className={errors.zipCode ? "border-destructive" : ""}
          />
          {errors.zipCode && (
            <p className="text-sm text-destructive mt-1">{errors.zipCode.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
