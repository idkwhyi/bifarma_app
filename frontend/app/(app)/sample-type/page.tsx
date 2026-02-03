"use client";

import { useState, useEffect } from "react";
import SampleTypeForm from "@/components/forms/SampleTypeForm";

interface SampleType {
    id: number;
    code: string;
    description: string;
}

const API_URL = "http://localhost:5231/api/sample-types";

export default function SampleTypePage() {
    const [sampleTypes, setSampleTypes] = useState<SampleType[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSampleType, setCurrentSampleType] = useState<SampleType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch Data
    const fetchSampleTypes = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(API_URL);
            if (res.ok) {
                const data = await res.json();
                setSampleTypes(data);
            }
        } catch (error) {
            console.error("Error fetching sample types:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSampleTypes();
    }, []);

    // Handlers
    const handleCreate = () => {
        setCurrentSampleType(null);
        setIsEditing(true);
    };

    const handleEdit = (sampleType: SampleType) => {
        setCurrentSampleType(sampleType);
        setIsEditing(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this sample type?")) return;
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            fetchSampleTypes();
        } catch (error) {
            console.error("Error deleting sample type:", error);
        }
    };

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const url = currentSampleType ? `${API_URL}/${currentSampleType.id}` : API_URL;
            const method = currentSampleType ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setIsEditing(false);
                fetchSampleTypes();
            } else {
                alert("Failed to save sample type");
            }
        } catch (error) {
            console.error("Error saving sample type:", error);
        } finally {
            setIsLoading(false);
        }
    }

    // Render Form
    if (isEditing) {
        return (
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    {currentSampleType ? "Edit Sample Type" : "Create Sample Type"}
                </h2>
                <div className="bg-white dark:bg-zinc-900 shadow rounded-lg p-6">
                    <SampleTypeForm
                        initialData={currentSampleType}
                        onSubmit={handleSubmit}
                        onCancel={() => setIsEditing(false)}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        )
    }

    // Render List
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
                    Sample Types
                </h2>
                <button
                    onClick={handleCreate}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Add Sample Type
                </button>
            </div>

            <div className="overflow-hidden rounded-lg bg-white dark:bg-zinc-900 shadow ring-1 ring-gray-900/5 dark:ring-white/10">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-zinc-700">
                    <thead className="bg-gray-50 dark:bg-zinc-800">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                                Code
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                Description
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                        {sampleTypes.map((sampleType) => (
                            <tr key={sampleType.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                                    {sampleType.code}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                    {sampleType.description}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <button onClick={() => handleEdit(sampleType)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(sampleType.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {sampleTypes.length === 0 && !isLoading && (
                            <tr>
                                <td colSpan={3} className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">No sample types found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
