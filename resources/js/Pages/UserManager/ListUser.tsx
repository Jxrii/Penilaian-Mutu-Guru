import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types/models";
import { Head, Link, usePage } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { userColumns } from "./Partials/DataTable/user-columns";
import { UserDataTable } from "./Partials/DataTable/UserDataTable";

interface ListUserProps {
    users: User[];
}

export default function ListUser({ users }: ListUserProps) {
    const flash = usePage().props.flash;
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Data Pengguna
                </h2>
            }
        >
            <Head title="Data Guru" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className='flex flex-row justify-end mb-3'>
                                <Button asChild>
                                    <Link href={route('user.create')}>
                                        <Plus className='mr-2 h-4 w-4' /> Tambah Pengguna
                                    </Link>
                                </Button>
                            </div>
                            <UserDataTable columns={userColumns} data={users} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
