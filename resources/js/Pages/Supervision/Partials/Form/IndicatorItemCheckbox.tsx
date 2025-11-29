import { Checkbox } from "@/Components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";
import { useFormContext, UseFormReturn } from "react-hook-form";

interface IndicatorCheckboxProps {
    name: string;
    label: string;
}

export default function IndicatorItemCheckbox({ name, label }: IndicatorCheckboxProps) {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox
                            disabled={field.disabled}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>{label}</FormLabel>
                    </div>
                </FormItem>
            )}
        />
    );
}
