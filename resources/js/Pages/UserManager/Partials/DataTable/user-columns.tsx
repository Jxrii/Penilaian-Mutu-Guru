import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { UserRoles } from "@/enums/UserRoles";
import { User } from "@/types/models";
import { router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Nama',
    },
    {
        accessorKey: 'email',
        header: 'E-Mail',
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => {
            const role = row.getValue('role') as string;
            let className = '';
            switch (role) {
                case UserRoles.ADMIN:
                    className = 'border-transparent bg-green-100 text-green-800 hover:bg-green-300';
                    break;
                case UserRoles.SUPERADMIN:
                    className = 'border-transparent bg-red-100 text-red-800 hover:bg-red-300';
                    break;
                case UserRoles.SUPERVISOR:
                    className = 'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-300';
                    break;
            }

            return (
                <Badge className={className}>{role.charAt(0).toUpperCase() + role.slice(1)}</Badge>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const user = row.original;

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
                        onClick={() => router.get(route('user.edit', { user: user.id }))}
                    >
                        Ubah
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.delete(route('user.destroy', { user: user.id }))}
                    >
                        Hapus
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    },
];
