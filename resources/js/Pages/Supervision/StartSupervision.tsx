import { Button } from "@/Components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Select } from "@/Components/ui/select";
import { UserRoles } from "@/enums/UserRoles";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PerformanceIndicator, PerformanceItem } from "@/types";
import { Teacher } from "@/types/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, router } from "@inertiajs/react";
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { Form, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import IndicatorLayout from "./Partials/Form/IndicatorLayout";

export const addUserFormSchema = z.object({
    name: z.string().min(3).max(191),
    email: z.string().email(),
    password: z.string().min(6).max(191),
    role: z.nativeEnum(UserRoles),
});

interface SupervisionFormSchemaInterface {
    [key: string]: z.ZodBoolean;
}

export function startSupervisionFormSchema(performanceItem: PerformanceItem, performanceItemNumber: number) {
    const indicators = performanceItem.indicators;
    const indicatorKeys = Object.keys(indicators);
    let formSchemaObject: SupervisionFormSchemaInterface = {};
    indicatorKeys.forEach((indicatorKey) => {
        const indicator = indicators[indicatorKey];
        const items = indicator.items;
        items.forEach((item, itemIndex) => {
            const name = `${performanceItemNumber}_${indicatorKey}_${itemIndex}`;
            formSchemaObject[name] = z.boolean();
        });
    });

    return z.object(formSchemaObject);
}

interface StartSupervisionProps {
    teacher: Teacher;
    performanceItem: PerformanceItem;
    performanceItemNumber: number;
}

export default function StartSupervision({ teacher, performanceItem, performanceItemNumber }: StartSupervisionProps) {
    const formSchema = startSupervisionFormSchema(performanceItem, performanceItemNumber);

    let defaultValues: { [key: string]: boolean } = {};
    const indicators = performanceItem.indicators;
    const indicatorKeys = Object.keys(indicators);
    indicatorKeys.forEach((indicatorKey) => {
        const indicator = indicators[indicatorKey];
        const items = indicator.items;
        items.forEach((item, itemIndex) => {
            const name = `${performanceItemNumber}_${indicatorKey}_${itemIndex}`;
            defaultValues[name] = false;
        });
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post(route('supervision.save', { teacher: teacher.id }), values);
    }

    const listPerformanceIndicators = indicatorKeys.map((indicatorKey) => {
        const indicator = indicators[indicatorKey];
        const keyName = `${performanceItemNumber}_${indicatorKey}`;

        return (
            <IndicatorLayout key={keyName} indicator={indicator} name={keyName} />
        );
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Supervisi {teacher.name} - {teacher.subject} ({teacher.class})
                </h2>
            }
        >
            <Head title={`Supervisi ${teacher.name} - ${teacher.subject} (${teacher.class})`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <FormProvider {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                                {listPerformanceIndicators}
                                <Button type='submit'>Submit</Button>
                            </form>
                        </FormProvider>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
