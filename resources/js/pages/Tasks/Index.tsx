import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';
import { title } from 'process';
import { BreadcrumbItem } from '@/types';
import { Props } from 'node_modules/@headlessui/react/dist/types';
import { compileFunction } from 'vm';






interface Task {
    id: member;
    title: srting;
    description: string | null;
    is_completed: boolean;
    due_date: string } null;
    list_id: number;
    list:{
        id:number;
        title: string;

    };

interface List {
    id: number;
    title: string;

}
 
interface props {
    tasks: {
        data: Task[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    lists: List[];
    filters: {
        search: string;
        filter: string;
    };   
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: '/tasks',
    },
];

export default function TasksIndex({tasks, lists, filters, flash}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [searchTerm, setSearchTerm] = useState(filters.search);
    const [completionFilters, setCompletionFilter] = useState<'all' | 'completed' | 'pending'>(filters.filter as 'all');
}

useEffect(() => {
    if (flash?.success) {
        setToastMessage(flash.success);
        setToastType('success');
        setShowToast(true);

    } else if (flash? error){
        setToastMessage(flash.error);
        setToastType('error');
        setShowToast(true);
    }

}, [flash]);

useEffect(() => {
    if(showToast) {
        const timer = setTimeout(() => {
            setShowToast(false);

        }, 3000);
        return () => clearTimeout(timer);
        
    }, [showToast]);

    const {data, setData, post, put, processing, reset, delete: destroy} = useForm({
        title: '',
        description: '',
        due_date: '',
        list_id: '',
        is_completed: false as boolean,

    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingTask) {
            put (route('task.update', editingTask.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setEditingTask(null);
                }
            });
        }else {
            post(route('task.store'), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();

                }
            });
        }
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setData({
            title: task.title,
            description: task.description || '',
            due_date: task.due_date || '',
            list_id: task.list_id.toString(),
            is_completed: task.is_completed,
        });
        setIsOpen(true);
    };

    const handleDelete = (taskId: number) => {
        destroy(route('task.destroy', taskId));
    };


    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get(route('task.index'),{
            search: searchTerm,
            filter: compileFilter,
        }, {
            preserveState: true,
            PreserveScroll: true,
        });
    };

    const handleFilterChange = (value: 'all' | 'completed' | 'pending') => {
        setCompletionFilter(value);
        router.get(route('task.index'), {
            search: searchTerm,
            filter: value,

        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handlePageChange = (page: number) => {
        router.get(router('tasks.index'), {
            page,
            search: searchTerm,
            filter: completionFilter,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>

            <Head title="Tasks" />
            < className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background to-muted/20"
            {showToast && (
                <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg 
                    ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500' } 
                    text-white animate-in fade-in slide-in-form-top-5`}>
                {toastType === 'success' ? (
                    <CheckCircle2 className='h-5 w-5' />
                ): (
                    <XCircle className='h-5 w-5' />
                )}
                <span>{toastMessage}</span>   </div>)}

            <div className='flex justify-between items-center'>
                
            </div>
    )

        
    