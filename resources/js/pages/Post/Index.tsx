import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

export default function Post({ posts }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className='container ms-auto p-4'>
                <div className='flex justify-between item-center mb-4'>
                    <h1 className='text-2xl font-bold'>Blog Post</h1>
                    <Link href='posts/create' className='bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 justify-content-end'>Create Post</Link>
                </div>
                <div className="overflow x-auto">
                    <table className="w-full table-auto shadow-lg bg-white dark:bg-neutral-800 rounded-lg">
                        <thead>
                            <tr className="bg-neutral-50 dark:bg-neutral-700">
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Title</th>
                                <th className="px-4 py-2">Content</th>
                                <th className="px-4 py-2">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} className='border-b border-neutral-100 dark-border-neutral-800'>
                                    <td className='px-4 py-2'>{post.id}</td>
                                    <td className='px-4 py-2'>{post.title}</td>
                                    <td className='px-4 py-2'>{post.content}</td>
                                
                                    <td className='px-4 py-2'>
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/posts/${post.id}/edit`}
                                                className="cursor-pointer bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                                            >
                                                Edit
                                            </Link>

                                            <Link
                                                href={`/posts/${post.id}`}
                                                method="delete"
                                                as="button"
                                                className="cursor-pointer bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                                                onClick={(e) => {
                                                    if (!confirm('Are you sure you want to delete this post?')) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                Delete
                                            </Link>
                                        </div>
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

        </AppLayout>
    );
}
