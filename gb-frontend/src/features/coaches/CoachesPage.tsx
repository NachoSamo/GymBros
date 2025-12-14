import React, { useState, useEffect } from 'react';
import { NewButton } from '../../components/button/Newbutton';
import { DefaultTable, type Column } from '../../components/table/DefaultTable';
import { TextFilter } from '../../components/filters/TextFilter';
import { getCoaches, type Coach } from "./services/coach.service";

interface CoachWithDetails extends Coach {
    athletesCount: number;
    specialties: string[];
}

const CoachesPage: React.FC = () => {
    const [data, setData] = useState<CoachWithDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const coaches = await getCoaches(searchTerm);

                if (!Array.isArray(coaches)) {
                    throw new Error("Invalid response format from server");
                }

                // Mock data for missing fields
                const coachesWithDetails = coaches.map(coach => ({
                    ...coach,
                    athletesCount: Math.floor(Math.random() * 30), // Mock athletes count
                    specialties: ['Strength', 'Cardio', 'HIIT', 'Yoga', 'Pilates']
                        .sort(() => 0.5 - Math.random())
                        .slice(0, Math.floor(Math.random() * 3) + 1) // Mock 1-3 specialties
                }));

                setData(coachesWithDetails);
            } catch (e: any) {
                setError(e?.message || "Error fetching coaches.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchTerm]);

    const columns: Column[] = [
        { key: 'name', label: 'Name' },
        { key: 'surname', label: 'Surname' },
        { key: 'email', label: 'Email' },
        { key: 'athletesCount', label: 'Athletes' },
        {
            key: 'specialties',
            label: 'Specialties',
            render: (value: string[]) => (
                <div className="flex gap-2 flex-wrap">
                    {value.map((specialty, index) => (
                        <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {specialty}
                        </span>
                    ))}
                </div>
            )
        },
    ];

    if (loading && data.length === 0) return <div>Loading coaches...</div>;
    if (error) return <div>Error: {error}</div>;

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

            <DefaultTable columns={columns} data={data} onRowClick={(row) => console.log(row)} />
        </div>
    );
};

export default CoachesPage;