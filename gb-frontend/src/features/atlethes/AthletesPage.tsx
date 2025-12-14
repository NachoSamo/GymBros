
import React, { useState, useMemo } from 'react';
import { NewButton } from '../../components/button/Newbutton';
import { SelectFilter } from '../../components/filters/SelectFilter';
import { DefaultTable, type Column } from '../../components/table/DefaultTable';
import { TextFilter } from '../../components/filters/TextFilter';

const athleteGoals = [
    { value: 'all', label: 'All Goals' },
    { value: 'hypertrophy', label: 'Hypertrophy' },
    { value: 'strength', label: 'Strength' },
    { value: 'fatloss', label: 'Fat Loss' },
    { value: 'performance', label: 'Performance' }
];

const athleteStatus = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
];

const tableColumns: Column[] = [
    {
        key: 'name',
        label: 'Name',
        align: 'left',
    },
    {
        key: 'age',
        label: 'Age',
        align: 'left',
    },
    {
        key: 'goal',
        label: 'Main Goal',
        align: 'left',
        render: (value) => (
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
                {value}
            </span>
        )
    },
    {
        key: 'coach',
        label: 'Assigned Coach',
        align: 'left',
    },
    {
        key: 'status',
        label: 'Status',
        align: 'left',
        render: (value) => (
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                value === 'Active' ? 'bg-status-success/10 text-green-700' :
                'bg-gray-200 text-gray-600'
            }`}>
                {value}
            </span>
        )
    },
    {
        key: 'nextSession',
        label: 'Next Session',
        align: 'left',
    },
    {
        key: 'actions',
        label: '',
        align: 'right',
        render: (_value) => (
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

const mockAthletes = [
    {
        name: 'Marcus Johnson',
        age: 28,
        goal: 'Hypertrophy',
        coach: 'Alex Rivera',
        status: 'Active',
        nextSession: 'Dec 10, 2024'
    },
    {
        name: 'Sarah Chen',
        age: 32,
        goal: 'Fat Loss',
        coach: 'Alex Rivera',
        status: 'Active',
        nextSession: 'Dec 9, 2024'
    },
    {
        name: 'James Wilson',
        age: 24,
        goal: 'Strength',
        coach: 'Maria Santos',
        status: 'Active',
        nextSession: 'Dec 11, 2024'
    },
    {
        name: 'Emily Brown',
        age: 29,
        goal: 'Performance',
        coach: 'Maria Santos',
        status: 'Active',
        nextSession: 'Dec 10, 2024'
    },
    {
        name: 'David Kim',
        age: 35,
        goal: 'Hypertrophy',
        coach: 'Alex Rivera',
        status: 'Inactive',
        nextSession: '-'
    },
    {
        name: 'Lisa Anderson',
        age: 27,
        goal: 'Fat Loss',
        coach: 'John Miller',
        status: 'Active',
        nextSession: 'Dec 9, 2024'
    }
];

const AthletesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGoal, setSelectedGoal] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const filteredAthletes = useMemo(() => {
        return mockAthletes.filter(athlete => {
            const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGoal = selectedGoal === 'all' || athlete.goal.toLowerCase() === selectedGoal.toLowerCase();
            const matchesStatus = selectedStatus === 'all' || athlete.status.toLowerCase() === selectedStatus.toLowerCase();
            return matchesSearch && matchesGoal && matchesStatus;
        });
    }, [searchTerm, selectedGoal, selectedStatus]);

    const activeCount = useMemo(() => {
        return filteredAthletes.filter(a => a.status === 'Active').length;
    }, [filteredAthletes]);

    return (
        <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-surface-strong mb-2">Athletes</h1>
                    <p className="text-surface-muted">Manage your athlete roster and track their progress</p>
                </div>
                <NewButton text="Add new athlete" onClick={() => { /* In the future /newAthlete */ }} />
            </div>

            <div className="flex gap-4 mb-4">
                <div className="flex-1 max-w-md">
                    <TextFilter 
                        value={searchTerm} 
                        onChange={setSearchTerm} 
                        placeholder="Search athletes..."
                    />
                </div>
                <SelectFilter
                    options={athleteGoals}
                    value={selectedGoal}
                    onChange={setSelectedGoal}
                />
                <SelectFilter
                    options={athleteStatus}
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                />
            </div>

            <div className="mb-4 text-sm text-surface-muted">
                Showing <span className="font-semibold text-surface-strong">{filteredAthletes.length}</span> athletes 
                <span className="mx-2">•</span>
                <span className="font-semibold text-surface-strong">{activeCount}</span> active
            </div>

            <DefaultTable
                columns={tableColumns}
                data={filteredAthletes}
            />
        </div>
    );
};

export default AthletesPage;