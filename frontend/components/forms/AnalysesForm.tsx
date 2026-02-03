"use client";

import { useState, useEffect } from "react";

interface Analysis {
    id?: number;
    code: string;
    description: string;
    parameterId: number;
    methodId: number;
    sampleTypeId: number;
    leadTime: string;
}

interface Option {
    id: number;
    code: string;
    description: string;
}

interface AnalysesFormProps {
    initialData?: Analysis | null;
    onSubmit: (data: Analysis) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const API_BASE_URL = "http://localhost:5231/api";

export default function AnalysesForm({
    initialData,
    onSubmit,
    onCancel,
    isLoading = false,
}: AnalysesFormProps) {
    const [formData, setFormData] = useState<Analysis>({
        code: "",
        description: "",
        parameterId: 0,
        methodId: 0,
        sampleTypeId: 0,
        leadTime: new Date().toISOString().slice(0, 16), // Default format for datetime-local
    });

    const [methods, setMethods] = useState<Option[]>([]);
    const [parameters, setParameters] = useState<Option[]>([]);
    const [sampleTypes, setSampleTypes] = useState<Option[]>([]);

    useEffect(() => {
        // Fetch dependencies
        const fetchData = async () => {
            try {
                const [methodsRes, paramsRes, samplesRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/methods`),
                    fetch(`${API_BASE_URL}/parameters`),
                    fetch(`${API_BASE_URL}/sampletypes`) // Endpoint might vary, assuming 'sampletypes' or similar
                ]);

                // We might need to handle 404s if endpoints don't exist yet, but assuming they do or will
                if (methodsRes.ok) setMethods(await methodsRes.json());
                if (paramsRes.ok) setParameters(await paramsRes.json());
                if (samplesRes.ok) setSampleTypes(await samplesRes.json());

            } catch (error) {
                console.error("Failed to fetch form dependencies", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                leadTime: new Date(initialData.leadTime).toISOString().slice(0, 16),
            });
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name.endsWith("Id") ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Code
                    </label>
                    <input
                        type="text"
                        name="code"
                        id="code"
                        required
                        value={formData.code}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="leadTime" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Lead Time
                    </label>
                    <input
                        type="datetime-local"
                        name="leadTime"
                        id="leadTime"
                        required
                        value={formData.leadTime}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="methodId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Method
                    </label>
                    <select
                        name="methodId"
                        id="methodId"
                        required
                        value={formData.methodId}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value={0}>Select a Method</option>
                        {methods.map((m) => (
                            <option key={m.id} value={m.id}>{m.code} - {m.description}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="parameterId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Parameter
                    </label>
                    <select
                        name="parameterId"
                        id="parameterId"
                        required
                        value={formData.parameterId}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value={0}>Select a Parameter</option>
                        {parameters.map((p) => (
                            <option key={p.id} value={p.id}>{p.code} - {p.description}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="sampleTypeId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Sample Type
                    </label>
                    <select
                        name="sampleTypeId"
                        id="sampleTypeId"
                        required
                        value={formData.sampleTypeId}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value={0}>Select a Sample Type</option>
                        {sampleTypes.map((s) => (
                            <option key={s.id} value={s.id}>{s.code} - {s.description}</option>
                        ))}
                    </select>
                </div>
            </div>


            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Description
                </label>
                <textarea
                    name="description"
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-700"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Save"}
                </button>
            </div>
        </form>
    );
}
