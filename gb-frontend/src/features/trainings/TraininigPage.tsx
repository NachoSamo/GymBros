import React, { useState, useMemo } from 'react';
import { NewButton } from '../../components/button/Newbutton';
import { SelectFilter } from '../../components/filters/SelectFilter';
import { DefaultTable, type Column } from '../../components/table/DefaultTable';
import { TextFilter } from '../../components/filters/TextFilter';

let planGoals = [{ value: 'all', label: 'All Goals' },
                        { value: 'hypertrophy', label: 'Hypertrophy' },
                        { value: 'strength', label: 'Strength' },
                        { value: 'fatloss', label: 'Fat Loss' },
                        { value: 'maintenance', label: 'Maintenance' }];

let planLevels = [{ value: 'all', label: 'All Levels' },
                         { value: 'beginner', label: 'Beginner' },
                         { value: 'intermediate', label: 'Intermediate' },
                         { value: 'advanced', label: 'Advanced' }];

let tableColumns: Column[] = [{
    key: 'name',
    label: 'Plan Name',
    align: 'left',
}, {
    key: 'goal',
    label: 'Goal',
    align: 'left',
    render: (value) => (
        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
            {value}
        </span>
    )
}, {
    key: 'level',
    label: 'Level',
    align: 'left',
    render: (value) => (
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            value === 'Beginner' ? 'bg-status-info/10 text-blue-600' :
            value === 'Intermediate' ? 'bg-status-warning/10 text-yellow-700' :
            value === 'Advanced' ? 'bg-status-danger/10 text-red-600' :
            ''
        }`}>
            {value}
        </span>
    )
}, {
    key: 'duration',
    label: 'Duration',
    align: 'left',

}, {
    key: 'athletes',
    label: 'Athletes',
    align: 'left',
},{
    key: 'status',
    label: 'Status',
    align: 'left',
    render: (value) => (
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            value === 'Active' ? 'bg-status-success/10 text-green-700' :
            value === 'Draft' ? 'bg-gray-100 text-gray-700' :
            'bg-gray-200 text-gray-600'
        }`}>
            {value}
        </span>
    )
}];

const mockTrainingPlans = [
    {
        name: 'Hypertrophy Foundation',
        goal: 'Hypertrophy',
        level: 'Beginner',
        duration: '8 weeks',
        athletes: 5,
        status: 'Active'
    },
    {
        name: 'Strength Builder Pro',
        goal: 'Strength',
        level: 'Intermediate',
        duration: '12 weeks',
        athletes: 8,
        status: 'Active'
    },
    {
        name: 'Fat Loss Accelerator',
        goal: 'Fat Loss',
        level: 'Beginner',
        duration: '6 weeks',
        athletes: 12,
        status: 'Active'
    },
    {
        name: 'Advanced Powerlifting',
        goal: 'Strength',
        level: 'Advanced',
        duration: '16 weeks',
        athletes: 3,
        status: 'Draft'
    },
    {
        name: 'Maintenance Program',
        goal: 'Maintenance',
        level: 'Intermediate',
        duration: '4 weeks',
        athletes: 0,
        status: 'Archived'
    }
];

const TrainingPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGoal, setSelectedGoal] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');

    const filteredPlans = useMemo(() => {
        return mockTrainingPlans.filter(plan => {
            const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGoal = selectedGoal === 'all' || plan.goal.toLowerCase() === selectedGoal.toLowerCase();
            const matchesLevel = selectedLevel === 'all' || plan.level.toLowerCase() === selectedLevel.toLowerCase();
            return matchesSearch && matchesGoal && matchesLevel;
        });
    }, [searchTerm, selectedGoal, selectedLevel]);

    return (
        <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-surface-strong mb-2">Training Plans</h1>
                    <p className="text-surface-muted">Create and manage periodized training programs</p>
                </div>
                <NewButton text="Create new plan" onClick={() => { /* In the future /newPlan */ }} />
            </div>

            <div className="flex gap-4 mb-6">
                <div className="flex-1 max-w-md">
                    <TextFilter 
                        value={searchTerm} 
                        onChange={setSearchTerm} 
                        placeholder="Search plans..."
                    />
                </div>
                <SelectFilter
                    options={planGoals}
                    value={selectedGoal}
                    onChange={setSelectedGoal}
                />
                <SelectFilter
                    options={planLevels}
                    value={selectedLevel}
                    onChange={setSelectedLevel}
                />
            </div>
            <DefaultTable
                columns={tableColumns}
                data={filteredPlans}
                onRowClick={(row) => { /* Handle row click */ }}
            />
        </div>
    );
};

export default TrainingPage;