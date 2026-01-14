import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClipboardList } from "lucide-react";

interface AdditionalDetailsStepProps {
  form: UseFormReturn<PropertyFormValues>;
}

export function AdditionalDetailsStep({ form }: AdditionalDetailsStepProps) {
  const { register, setValue, watch } = form;

  const hasRepairs = watch("hasRepairs");
  const owesOnProperty = watch("owesOnProperty");

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <ClipboardList className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Additional Details</h2>
        <p className="text-muted-foreground">
          Help us understand your situation better
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasRepairs"
              checked={hasRepairs}
              onCheckedChange={(checked) => setValue("hasRepairs", !!checked)}
            />
            <Label
              htmlFor="hasRepairs"
              className="text-sm font-normal cursor-pointer"
            >
              Property needs repairs
            </Label>
          </div>

          {hasRepairs && (
            <div>
              <Label htmlFor="repairDescription">Describe the repairs needed</Label>
              <Input
                id="repairDescription"
                placeholder="e.g., Roof damage, plumbing issues..."
                {...register("repairDescription")}
              />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="owesOnProperty"
              checked={owesOnProperty}
              onCheckedChange={(checked) => setValue("owesOnProperty", !!checked)}
            />
            <Label
              htmlFor="owesOnProperty"
              className="text-sm font-normal cursor-pointer"
            >
              I owe money on this property
            </Label>
          </div>

          {owesOnProperty && (
            <div>
              <Label htmlFor="mortgageBalance">Approximate balance owed</Label>
              <Input
                id="mortgageBalance"
                type="number"
                placeholder="150000"
                {...register("mortgageBalance", { valueAsNumber: true })}
              />
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="timeline">When do you want to sell? *</Label>
          <Select
            value={watch("timeline")}
            onValueChange={(value) => setValue("timeline", value as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asap">As soon as possible</SelectItem>
              <SelectItem value="1-month">Within 1 month</SelectItem>
              <SelectItem value="3-months">Within 3 months</SelectItem>
              <SelectItem value="6-months">Within 6 months</SelectItem>
              <SelectItem value="flexible">I'm flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
