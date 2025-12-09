import React, { useState, useMemo } from 'react';
import { NewButton } from '../../components/button/Newbutton';
import { DefaultTable, type Column } from '../../components/table/DefaultTable';
import { TextFilter } from '../../components/filters/TextFilter';

const tableColumns: Column[] = [
    {
        key: 'name',
        label: 'Name',
        align: 'left',
    },
    {
        key: 'specialty',
        label: 'Specialty',
        align: 'left',
        render: (value) => (
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
                {value}
            </span>
        )
    },
    {
        key: 'athletes',
        label: 'Athletes',
        align: 'left',
        render: (value) => (
            <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{value}</span>
            </div>
        )
    },
    {
        key: 'contact',
        label: 'Contact',
        align: 'left',
        render: (value) => (
            <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-blue-600">{value}</span>
            </div>
        )
    },
    {
        key: 'actions',
        label: '',
        align: 'right',
        render: (value, row) => (
            <button className="text-surface-muted hover:text-surface-strong text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View profile
            </button>
        )
    }
];

const mockCoaches = [
    {
        name: 'Alex Rivera',
        specialty: 'Hypertrophy',
        athletes: 12,
        contact: 'alex.r@gymbros.com'
    },
    {
        name: 'Maria Santos',
        specialty: 'Strength',
        athletes: 8,
        contact: 'maria.s@gymbros.com'
    },
    {
        name: 'John Miller',
        specialty: 'Endurance',
        athletes: 10,
        contact: 'john.m@gymbros.com'
    },
    {
        name: 'Sophie Williams',
        specialty: 'Fat Loss',
        athletes: 15,
        contact: 'sophie.w@gymbros.com'
    }
];

const CoachesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCoaches = useMemo(() => {
        return mockCoaches.filter(coach => {
            const matchesSearch = coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 coach.specialty.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });
    }, [searchTerm]);

    const totalAthletes = useMemo(() => {
        return filteredCoaches.reduce((sum, coach) => sum + coach.athletes, 0);
    }, [filteredCoaches]);

    return (
        <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-surface-strong mb-2">Coaches</h1>
                    <p className="text-surface-muted">View your coaching team and their specialties</p>
                </div>
                <NewButton text="Add new coach" onClick={() => { /* In the future /newCoach */ }} />
            </div>

            <div className="flex gap-4 mb-4">
                <div className="flex-1 max-w-md">
                    <TextFilter 
                        value={searchTerm} 
                        onChange={setSearchTerm} 
                        placeholder="Search coaches..."
                    />
                </div>
            </div>

            <div className="mb-4 text-sm text-surface-muted">
                <span className="font-semibold text-surface-strong">{filteredCoaches.length}</span> coaches 
                <span className="mx-2">•</span>
                <span className="font-semibold text-surface-strong">{totalAthletes}</span> total athletes
            </div>

            <DefaultTable
                columns={tableColumns}
                data={filteredCoaches}
            />
        </div>
    );
};

export default CoachesPage;