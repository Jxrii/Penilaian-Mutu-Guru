import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { columns } from './table/columns';
import { DataTable } from './table/data-table';
import { Button } from '@/Components/ui/button';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Teacher } from '@/types/models';

interface ListTeacherProps {
    teachers: Teacher[],
}

export default function ListTeacher({ teachers }: ListTeacherProps) {
    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Data Guru
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
                                    <Link href={route('teacher.create')}>
                                        <Plus className='mr-2 h-4 w-4' /> Tambah Guru
                                    </Link>
                                </Button>
                            </div>
                            <DataTable columns={columns} data={teachers} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
