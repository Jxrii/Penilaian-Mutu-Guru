import { Badge } from "@/Components/ui/badge";

interface SupervisionLevelBadgeProps {
    level?: number
}

export default function SupervisionLevelBadge({ level }: SupervisionLevelBadgeProps) {
    let className = '';
    switch (level) {
        case 4:
            className = 'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-300';
            break;
        case 3:
            className = 'border-transparent bg-green-100 text-green-800 hover:bg-green-300';
            break;
        case 2:
            className = 'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-300';
            break;
        case 1:
            className = 'border-transparent bg-red-100 text-red-800 hover:bg-red-300';
            break;
        case undefined:
            className = 'border-transparent bg-gray-100 text-gray-800 hover:bg-gray-300';
            break;
    }

    return (
        <Badge className={className}>
            {level ? `Level ${level}` : 'Belum dinilai'}
        </Badge>
    );
}
