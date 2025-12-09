import React from 'react';

interface ExerciseBoxProps {
  name: string;
  muscleGroup: string;
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: string;
  movement: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const ExerciseBox: React.FC<ExerciseBoxProps> = ({
  name,
  muscleGroup,
  equipment,
  difficulty,
  type,
  movement,
  icon,
  onClick
}) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'Advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-5 ${
        onClick ? 'hover:shadow-md cursor-pointer' : ''
      } transition-shadow`}
    >
      <div className="flex items-start gap-3 mb-3">
        {icon && (
          <div className="bg-blue-100 rounded-lg p-2.5 text-blue-600 flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-surface-strong text-base mb-1">
            {name}
          </h3>
          <p className="text-sm text-surface-muted">{muscleGroup}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          {equipment}
        </span>
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
          {difficulty}
        </span>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          {type}
        </span>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          {movement}
        </span>
      </div>
    </div>
  );
};