"use client";

import { useState, useEffect } from "react";
import AnalysesForm from "@/components/forms/AnalysesForm";

interface Analysis {
    id: number;
    code: string;
    description: string;
    parameterId: number;
    methodId: number;
    sampleTypeId: number;
    leadTime: string;
    parameter?: { code: string };
    method?: { code: string };
    sampleType?: { code: string };
}

const API_URL = "http://localhost:5231/api/analyses";

export default function AnalysesPage() {
    const [analyses, setAnalyses] = useState<Analysis[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAnalysis, setCurrentAnalysis] = useState<Analysis | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Can refer to loading list or saving

    // Fetch Data
    const fetchAnalyses = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(API_URL);
            if (res.ok) {
                const data = await res.json();
                setAnalyses(data);
            }
        } catch (error) {
            console.error("Error fetching analyses:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalyses();
    }, []);

    // Handlers
    const handleCreate = () => {
        setCurrentAnalysis(null);
        setIsEditing(true);
    };

    const handleEdit = (analysis: Analysis) => {
        setCurrentAnalysis(analysis);
        setIsEditing(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this analysis?")) return;
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            fetchAnalyses();
        } catch (error) {
            console.error("Error deleting analysis:", error);
        }
    };

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const url = currentAnalysis ? `${API_URL}/${currentAnalysis.id}` : API_URL;
            const method = currentAnalysis ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setIsEditing(false);
                fetchAnalyses();
            } else {
                alert("Failed to save analysis");
            }
        } catch (error) {
            console.error("Error saving analysis:", error);
        } finally {
            setIsLoading(false);
        }
    }

    // Render Form
    if (isEditing) {
        return (
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    {currentAnalysis ? "Edit Analysis" : "Create Analysis"}
                </h2>
                <div className="bg-white dark:bg-zinc-900 shadow rounded-lg p-6">
                    <AnalysesForm
                        initialData={currentAnalysis}
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
                    Analyses
                </h2>
                <button
                    onClick={handleCreate}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Add Analysis
                </button>
            </div>

            <div className="overflow-hidden rounded-lg bg-white dark:bg-zinc-900 shadow ring-1 ring-gray-900/5 dark:ring-white/10">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300 dark:divide-zinc-700">
                        <thead className="bg-gray-50 dark:bg-zinc-800">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                                    Code
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                    Lead Time
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                    Parameter
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                    Method
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                    Sample Type
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                            {analyses.map((analysis) => (
                                <tr key={analysis.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                                        {analysis.code}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(analysis.leadTime).toLocaleDateString()}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        {analysis.parameter?.code || analysis.parameterId}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        {analysis.method?.code || analysis.methodId}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        {analysis.sampleType?.code || analysis.sampleTypeId}
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <button onClick={() => handleEdit(analysis)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(analysis.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {analyses.length === 0 && !isLoading && (
                                <tr>
                                    <td colSpan={6} className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">No analyses found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
