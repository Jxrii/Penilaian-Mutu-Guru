import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PerformanceItem } from "@/types";
import { Teacher, User } from "@/types/models";
import { Head, Link, usePage } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { SupervisionDataTable } from "./Partials/DataTable/SupervisionDataTable";
import { supervisionColumns } from "./Partials/DataTable/supervision-columns";

interface ListSupervisorProps {
    teachers: Teacher[];
    performanceItems: PerformanceItem[];
}

export default function ListSupervision({ teachers, performanceItems }: ListSupervisorProps) {
    console.log(teachers);
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
                    Data Supervisi
                </h2>
            }
        >
            <Head title="Data Supervisi" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* <div className='flex flex-row justify-end mb-3'>
                                <Button asChild>
                                    <Link href={route('user.create')}>
                                        <Plus className='mr-2 h-4 w-4' /> Tambah Pengguna
                                    </Link>
                                </Button>
                            </div> */}
                            <SupervisionDataTable columns={supervisionColumns(performanceItems[15])} data={teachers} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
