import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { PerformanceIndicator } from "@/types";
import IndicatorItemCheckbox from "./IndicatorItemCheckbox";
import { UseFormReturn } from "react-hook-form";

interface IndicatorLayoutProps {
    indicator: PerformanceIndicator;
    name: string;
}

export default function IndicatorLayout({ indicator, name }: IndicatorLayoutProps) {
    const listIndicatorItems = indicator.items.map((title, index) => {
        const keyName = `${name}_${index}`;

        return (
            <IndicatorItemCheckbox key={keyName} label={title} name={keyName} />
        );
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>{indicator.name}</CardTitle>
            </CardHeader>
            <CardContent>
                {listIndicatorItems}
            </CardContent>
        </Card>
    );
}
