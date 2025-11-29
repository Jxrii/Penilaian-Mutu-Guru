import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { PerformanceItem } from "@/types";
import { Teacher } from "@/types/models";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { ClipboardPenLine } from "lucide-react";
import { DateTime } from "luxon";

// export const supervisionColumns: ColumnDef<Supervision>[] = [
//     {
//         accessorKey: 'teacher.name',
//         header: 'Nama Guru',
//     }
//     {
//         accessorKey:
//     }
// ]

export function supervisionColumns(performanceItem: PerformanceItem): ColumnDef<Teacher>[] {
    return [
        {
            accessorKey: 'name',
            header: 'Nama Guru',
        },
        {
            id: 'level',
            header: 'Level',
            cell: ({ row }) => {
                const supervision = row.original.supervision;
                const level = supervision?.simple_result.level;

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
                )
            }
        },
        {
            id: 'updated_at',
            header: 'Tanggal Supervisi',
            cell: ({ row }) => {
                const supervisedAt = row.original.supervision?.supervised_at;

                if (!supervisedAt) return 'Belum dinilai';

                const luxonSupervisedAt = DateTime.fromSQL(supervisedAt, {
                    zone: 'Asia/Jakarta',
                    locale: 'id',
                });

                return luxonSupervisedAt.toLocaleString(DateTime.DATE_FULL);
            }
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const teacher = row.original;

                return (
                    <>
                        <Button className="me-2" asChild>
                            <Link href={route('supervision.start', { teacher: teacher.id })}>
                                <ClipboardPenLine className='mr-2 h-4 w-4' /> Supervisi
                            </Link>
                        </Button>
                        {teacher.supervision && (
                            <Button asChild>
                                <Link href={route('supervision.check', { teacher: teacher.id })}>
                                    <ClipboardPenLine className='mr-2 h-4 w-4' /> Cek Supervisi
                                </Link>
                            </Button>
                        )}
                    </>
                );
            }
        }
    ];
}
