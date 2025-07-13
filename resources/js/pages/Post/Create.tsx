import AppLayout from "@/layouts/app-layout";
import appLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { title } from "process";
import { useState } from "react";

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Create Post',
            href: '/posts/create',
        },
    ];
    export default function CreatePost() {

        const {data, setData, errors, post, reset, processing } = useForm ({
            title: '',
            content: '',
        });


    const submit = (e: React.FormEvent) =>{
        e.preventDefault();
        post('/posts',{
            onSuccess:() => {
                reset();
            },
        });
    }

         return(
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Create Post"/>
                <div className="container ms-auto p-4">
                    <div className="flex justify-between item-center mb-4">
                    <h1 className="text-2xl font-bold">Create Post</h1>    
                    <Link href="/posts" className="bg-gray-500 text-white px-4 py-1 
                    rounded hover:bg-gray-600">Back to Post</Link>
                </div>
                </div>
                <form onSubmit={submit} method="post">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" name="title" id="title" 
                        value={data.title} onChange={(e)=> setData('title', e.currentTarget.value)}
                        className="mt-1 block w-full px-3 py-2 border 
                        border-gray-300 rounded-md shadow-sm focus:outline-none 
                        focus:ring-indigo-500 sm:test-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea name="content" id="content"
                        value={data.content} onChange={(e)=> setData('content', e.currentTarget.value)}
                        className="mt-1 block w-full px-3 py-2 border 
                        border-gray-300 rounded-md shadow-sm focus:outline-none 
                        focus:ring-indigo-500 sm:test-sm"></textarea>
                    </div>
                    <div className="mb-4">
                        <button type="submit" className=" cursor-pointer bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600">
                            {processing ? 'Creating....' : 'Create Post'}
                        </button>
                    </div>
                </form>
            </AppLayout>
        );
    }
