"use client";

import { useState, useEffect } from "react";
import ParameterForm from "@/components/forms/ParameterForm";

interface Parameter {
    id: number;
    code: string;
    description: string;
}

const API_URL = "http://localhost:5231/api/parameters";

export default function ParameterPage() {
    const [parameters, setParameters] = useState<Parameter[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentParameter, setCurrentParameter] = useState<Parameter | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch Data
    const fetchParameters = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(API_URL);
            if (res.ok) {
                const data = await res.json();
                setParameters(data);
            }
        } catch (error) {
            console.error("Error fetching parameters:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchParameters();
    }, []);

    // Handlers
    const handleCreate = () => {
        setCurrentParameter(null);
        setIsEditing(true);
    };

    const handleEdit = (parameter: Parameter) => {
        setCurrentParameter(parameter);
        setIsEditing(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this parameter?")) return;
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            fetchParameters();
        } catch (error) {
            console.error("Error deleting parameter:", error);
        }
    };

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const url = currentParameter ? `${API_URL}/${currentParameter.id}` : API_URL;
            const method = currentParameter ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setIsEditing(false);
                fetchParameters();
            } else {
                alert("Failed to save parameter");
            }
        } catch (error) {
            console.error("Error saving parameter:", error);
        } finally {
            setIsLoading(false);
        }
    }

    // Render Form
    if (isEditing) {
        return (
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    {currentParameter ? "Edit Parameter" : "Create Parameter"}
                </h2>
                <div className="bg-white dark:bg-zinc-900 shadow rounded-lg p-6">
                    <ParameterForm
                        initialData={currentParameter}
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
                    Parameters
                </h2>
                <button
                    onClick={handleCreate}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Add Parameter
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
                        {parameters.map((parameter) => (
                            <tr key={parameter.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                                    {parameter.code}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                    {parameter.description}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <button onClick={() => handleEdit(parameter)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(parameter.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {parameters.length === 0 && !isLoading && (
                            <tr>
                                <td colSpan={3} className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">No parameters found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
