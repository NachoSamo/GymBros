import React, { useState, useMemo } from 'react';
import { NewButton } from '../../components/button/Newbutton';
import { SelectFilter } from '../../components/filters/SelectFilter';
import { TextFilter } from '../../components/filters/TextFilter';
import { ExerciseBox } from '../../components/box/ExcersiceBox';

const muscleGroups = [
    { value: 'all', label: 'All Muscles' },
    { value: 'chest', label: 'Chest' },
    { value: 'back', label: 'Back' },
    { value: 'legs', label: 'Legs' },
    { value: 'shoulders', label: 'Shoulders' },
    { value: 'arms', label: 'Arms' },
    { value: 'core', label: 'Core' }
];

const equipmentTypes = [
    { value: 'all', label: 'All Equipment' },
    { value: 'barbell', label: 'Barbell' },
    { value: 'dumbbell', label: 'Dumbbell' },
    { value: 'machine', label: 'Machine' },
    { value: 'bodyweight', label: 'Bodyweight' },
    { value: 'cable', label: 'Cable' }
];

const difficultyLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
];

const exerciseIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
    </svg>
);

const mockExercises = [
    {
        name: 'Barbell Bench Press',
        muscleGroup: 'Chest',
        equipment: 'Barbell',
        difficulty: 'Intermediate' as const,
        type: 'Compound',
        movement: 'Push'
    },
    {
        name: 'Deadlift',
        muscleGroup: 'Back',
        equipment: 'Barbell',
        difficulty: 'Advanced' as const,
        type: 'Compound',
        movement: 'Pull'
    },
    {
        name: 'Squat',
        muscleGroup: 'Legs',
        equipment: 'Barbell',
        difficulty: 'Intermediate' as const,
        type: 'Compound',
        movement: 'Push'
    },
    {
        name: 'Pull-ups',
        muscleGroup: 'Back',
        equipment: 'Bodyweight',
        difficulty: 'Intermediate' as const,
        type: 'Compound',
        movement: 'Pull'
    },
    {
        name: 'Dumbbell Lunges',
        muscleGroup: 'Legs',
        equipment: 'Dumbbells',
        difficulty: 'Beginner' as const,
        type: 'Unilateral',
        movement: 'Compound'
    },
    {
        name: 'Cable Flyes',
        muscleGroup: 'Chest',
        equipment: 'Machine',
        difficulty: 'Beginner' as const,
        type: 'Isolation',
        movement: 'Push'
    }
];

const ExercisesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMuscle, setSelectedMuscle] = useState('all');
    const [selectedEquipment, setSelectedEquipment] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');

    const filteredExercises = useMemo(() => {
        return mockExercises.filter(exercise => {
            const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesMuscle = selectedMuscle === 'all' || exercise.muscleGroup.toLowerCase() === selectedMuscle.toLowerCase();
            const matchesEquipment = selectedEquipment === 'all' || exercise.equipment.toLowerCase() === selectedEquipment.toLowerCase();
            const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
            return matchesSearch && matchesMuscle && matchesEquipment && matchesDifficulty;
        });
    }, [searchTerm, selectedMuscle, selectedEquipment, selectedDifficulty]);

    return (
        <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-surface-strong mb-2">Exercises</h1>
                    <p className="text-surface-muted">Browse and filter exercises by muscle group, equipment, and difficulty</p>
                </div>
                <NewButton text="Add new exercise" onClick={() => { /* In the future /newExercise */ }} />
            </div>

            <div className="flex gap-4 mb-6">
                <div className="flex-1 max-w-md">
                    <TextFilter 
                        value={searchTerm} 
                        onChange={setSearchTerm} 
                        placeholder="Search exercises..."
                    />
                </div>
                <SelectFilter
                    options={muscleGroups}
                    value={selectedMuscle}
                    onChange={setSelectedMuscle}
                />
                <SelectFilter
                    options={equipmentTypes}
                    value={selectedEquipment}
                    onChange={setSelectedEquipment}
                />
                <SelectFilter
                    options={difficultyLevels}
                    value={selectedDifficulty}
                    onChange={setSelectedDifficulty}
                />
            </div>

            <div className="mb-4 text-sm text-surface-muted">
                Showing <span className="font-semibold text-surface-strong">{filteredExercises.length}</span> exercises
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExercises.map((exercise, index) => (
                    <ExerciseBox
                        key={index}
                        name={exercise.name}
                        muscleGroup={exercise.muscleGroup}
                        equipment={exercise.equipment}
                        difficulty={exercise.difficulty}
                        type={exercise.type}
                        movement={exercise.movement}
                        icon={exerciseIcon}
                        onClick={() => { /* Handle exercise click */ }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExercisesPage;