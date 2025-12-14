-- Seed mínimo: 1 fila por tabla (y M:N con 1 relación)
-- Nota: asume que el schema ya se creó (01_schema.sql) y que las tablas están vacías.

-- 1) Catálogos
INSERT INTO level (name) VALUES ('Beginner');
INSERT INTO goal (name) VALUES ('Hypertrophy');
INSERT INTO status (name) VALUES ('Active');

INSERT INTO equipment (name, description)
VALUES ('Dumbbells', 'Standard dumbbells set');

INSERT INTO muscle (name, description)
VALUES ('Chest', 'Pectoralis major/minor');

-- 2) Entidades principales
INSERT INTO coach (name, surname, email)
VALUES ('Juan', 'Pérez', 'juan.perez@gymbros.com');

INSERT INTO athlete (name, surname, age, height_cm, weight_kg, coach_id, actual_level_id)
VALUES (
  'Ana', 'Gómez', 24, 165.0, 60.5,
  (SELECT id FROM coach WHERE email = 'juan.perez@gymbros.com'),
  (SELECT id FROM level WHERE name = 'Beginner')
);

INSERT INTO training_plan (name, duration_weeks, level_id)
VALUES (
  'Plan Starter 4W', 4,
  (SELECT id FROM level WHERE name = 'Beginner')
);

INSERT INTO exercise (name, description, equipment_id)
VALUES (
  'Dumbbell Bench Press', 'Press with dumbbells on flat bench',
  (SELECT id FROM equipment WHERE name = 'Dumbbells')
);

-- 3) Change status (para Athlete y para TrainingPlan)
INSERT INTO change_status (date_at, date_since, status_id, athlete_id, training_plan_id)
VALUES (
  now(), now(),
  (SELECT id FROM status WHERE name = 'Active'),
  (SELECT id FROM athlete WHERE name='Ana' AND surname='Gómez'),
  NULL
);

INSERT INTO change_status (date_at, date_since, status_id, athlete_id, training_plan_id)
VALUES (
  now(), now(),
  (SELECT id FROM status WHERE name = 'Active'),
  NULL,
  (SELECT id FROM training_plan WHERE name='Plan Starter 4W')
);

-- 4) Relaciones M:N (una fila por tabla puente)
INSERT INTO coach_goal (coach_id, goal_id)
VALUES (
  (SELECT id FROM coach WHERE email='juan.perez@gymbros.com'),
  (SELECT id FROM goal WHERE name='Hypertrophy')
);

INSERT INTO athlete_goal (athlete_id, goal_id)
VALUES (
  (SELECT id FROM athlete WHERE name='Ana' AND surname='Gómez'),
  (SELECT id FROM goal WHERE name='Hypertrophy')
);

INSERT INTO training_plan_goal (training_plan_id, goal_id)
VALUES (
  (SELECT id FROM training_plan WHERE name='Plan Starter 4W'),
  (SELECT id FROM goal WHERE name='Hypertrophy')
);

INSERT INTO athlete_training_plan (athlete_id, training_plan_id)
VALUES (
  (SELECT id FROM athlete WHERE name='Ana' AND surname='Gómez'),
  (SELECT id FROM training_plan WHERE name='Plan Starter 4W')
);

INSERT INTO exercise_level (exercise_id, level_id)
VALUES (
  (SELECT id FROM exercise WHERE name='Dumbbell Bench Press'),
  (SELECT id FROM level WHERE name='Beginner')
);

INSERT INTO exercise_muscle (exercise_id, muscle_id)
VALUES (
  (SELECT id FROM exercise WHERE name='Dumbbell Bench Press'),
  (SELECT id FROM muscle WHERE name='Chest')
);
