"use client";
import React from "react";
import { Plus, Download, Grid, List } from "lucide-react";
import { useRouter } from "next/navigation";
import { Toaster } from "./components/ui/toaster";

const Page = () => {
    const resumeList = [
        {
            name: "Software Developer Resume",
            lastUpdated: "13 hours ago",
            id: "1",
        },
        {
            name: "Project Manager CV",
            lastUpdated: "2 days ago",
            id: "2",
        },
    ];
    const router = useRouter();

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Toaster />
            <header className="bg-gray-800 shadow-md">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-blue-400">
                        RESUME BUILDER
                    </h1>
                    <nav>
                        <button className="text-gray-300 hover:text-white transition-colors">
                            <Grid className="inline-block mr-2" size={20} />
                            Grid
                        </button>
                        <button className="text-gray-300 hover:text-white transition-colors ml-4">
                            <List className="inline-block mr-2" size={20} />
                            List
                        </button>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div
                        className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center cursor-pointer group"
                        onClick={() => router.push("/resume/3")}
                    >
                        <Plus
                            size={48}
                            className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                        />
                        <p className="mt-4 font-bold text-xl group-hover:text-blue-300 transition-colors duration-300">
                            Create a new resume
                        </p>
                        <p className="mt-2 text-sm text-gray-400 text-center">
                            Start building from scratch
                        </p>
                    </div>

                    <label
                        htmlFor="file"
                        className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center cursor-pointer group"
                    >
                        <Download
                            size={48}
                            className="text-green-400 group-hover:text-green-300 transition-colors duration-300"
                        />
                        <p className="mt-4 font-bold text-xl group-hover:text-green-300 transition-colors duration-300">
                            Import an existing resume
                        </p>
                        <p className="mt-2 text-sm text-gray-400 text-center">
                            Upload and edit your current resume
                        </p>
                        <input type="file" id="file" className="hidden" />
                    </label>

                    {resumeList.map((resume, index) => (
                        <div
                            onClick={() => router.push(`/resume/${resume.id}`)}
                            key={index}
                            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                        >
                            <h3 className="font-bold text-xl mb-2 group-hover:text-blue-300 transition-colors duration-300">
                                {resume.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                                Last updated {resume.lastUpdated}
                            </p>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    onClick={() =>
                                        router.push(`/resume/${resume.id}`)
                                    }
                                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                                >
                                    Edit
                                </button>
                                <button className="text-red-400 hover:text-red-300 transition-colors duration-300">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Page;
