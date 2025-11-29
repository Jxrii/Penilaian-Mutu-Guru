import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Teacher } from "@/types/models";
import { router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Teacher>[] = [
    {
        accessorKey: 'name',
        header: 'Nama',
    },
    {
        accessorKey: 'subject',
        header: 'Mata Pelajaran',
    },
    {
        accessorKey: 'class',
        header: 'Kelas',
    },
    {
        accessorKey: 'email',
        header: 'E-Mail',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const teacher = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className="h-8 w-8 p-0">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => router.get(route('teacher.edit', { teacher: teacher.id }))}
                    >
                        Ubah
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.delete(route('teacher.destroy', { teacher: teacher.id }))}
                    >
                        Hapus
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
]
