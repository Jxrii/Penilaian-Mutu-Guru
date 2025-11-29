import { Badge } from "@/Components/ui/badge";
import { Check, X } from "lucide-react";

interface SupervisionIndicatorBadgeProps {
    fulfilled?: boolean
}

export default function SupervisionIndicatorBadge({ fulfilled = false }: SupervisionIndicatorBadgeProps) {
    const className = fulfilled ? 'w-10 h-10 border-transparent bg-green-100 text-green-800 hover:bg-green-300' : 'w-10 h-10 border-transparent bg-red-100 text-red-800 hover:bg-red-300';
    const icon = fulfilled ? (<Check />) : (<X />);

    return (
        <Badge className={className}>
            {icon}
        </Badge>
    );
}
