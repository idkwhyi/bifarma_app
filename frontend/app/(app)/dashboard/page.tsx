"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Analysis {
    id: number;
    code: string;
    leadTime: string;
    parameter?: { code: string };
    method?: { code: string };
    sampleType?: { code: string };
    lastUpdatedOn?: string;
}

export default function DashboardPage() {
    const [counts, setCounts] = useState({
        analyses: 0,
        sampleTypes: 0,
        methods: 0,
        parameters: 0,
    });
    const [recentAnalyses, setRecentAnalyses] = useState<Analysis[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_BASE = "http://localhost:5231/api";
                const [analysesRes, sampleTypesRes, methodsRes, parametersRes] = await Promise.all([
                    fetch(`${API_BASE}/analyses`),
                    fetch(`${API_BASE}/sample-types`),
                    fetch(`${API_BASE}/methods`),
                    fetch(`${API_BASE}/parameters`),
                ]);

                if (analysesRes.ok && sampleTypesRes.ok && methodsRes.ok && parametersRes.ok) {
                    const analysesData: Analysis[] = await analysesRes.json();
                    const sampleTypesData = await sampleTypesRes.json();
                    const methodsData = await methodsRes.json();
                    const parametersData = await parametersRes.json();

                    setCounts({
                        analyses: analysesData.length,
                        sampleTypes: sampleTypesData.length,
                        methods: methodsData.length,
                        parameters: parametersData.length,
                    });

                    const sortedAnalyses = analysesData.sort((a, b) => {
                        const dateA = a.lastUpdatedOn ? new Date(a.lastUpdatedOn).getTime() : 0;
                        const dateB = b.lastUpdatedOn ? new Date(b.lastUpdatedOn).getTime() : 0;
                        return dateB - dateA;
                    }).slice(0, 5);

                    setRecentAnalyses(sortedAnalyses);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        Dashboard
                    </h2>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <Link
                        href="/analyses"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Manage Analyses
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Stat Card 1 - Analyses */}
                <div className="overflow-hidden rounded-lg bg-white dark:bg-zinc-900 shadow ring-1 ring-gray-900/5 dark:ring-white/10">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Total Analyses</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                                            {isLoading ? "..." : counts.analyses}
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stat Card 2 - Sample Types */}
                <div className="overflow-hidden rounded-lg bg-white dark:bg-zinc-900 shadow ring-1 ring-gray-900/5 dark:ring-white/10">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Sample Types</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                                            {isLoading ? "..." : counts.sampleTypes}
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stat Card 3 - Methods */}
                <div className="overflow-hidden rounded-lg bg-white dark:bg-zinc-900 shadow ring-1 ring-gray-900/5 dark:ring-white/10">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Methods</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                                            {isLoading ? "..." : counts.methods}
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stat Card 4 - Parameters */}
                <div className="overflow-hidden rounded-lg bg-white dark:bg-zinc-900 shadow ring-1 ring-gray-900/5 dark:ring-white/10">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Parameters</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                                            {isLoading ? "..." : counts.parameters}
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="overflow-hidden rounded-lg bg-white dark:bg-zinc-900 shadow ring-1 ring-gray-900/5 dark:ring-white/10">
                <div className="border-b border-gray-200 dark:border-zinc-800 px-4 py-5 sm:px-6">
                    <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Recent Analyses</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300 dark:divide-zinc-700">
                        <thead className="bg-gray-50 dark:bg-zinc-800">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">Code</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Parameter</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Method</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Updated</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="py-4 text-center text-sm text-gray-500">Loading...</td>
                                </tr>
                            ) : recentAnalyses.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-4 text-center text-sm text-gray-500">No recent analyses found.</td>
                                </tr>
                            ) : (
                                recentAnalyses.map((analysis) => (
                                    <tr key={analysis.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                                            {analysis.code}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {analysis.parameter?.code}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {analysis.method?.code}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {analysis.lastUpdatedOn ? new Date(analysis.lastUpdatedOn).toLocaleDateString() : '-'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
