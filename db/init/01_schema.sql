-- Opcional: crea la base de datos
-- CREATE DATABASE training_platform;
-- \c training_platform;

-- 1) Tablas "catálogo" simples

CREATE TABLE level (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE goal (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE status (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE equipment (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE muscle (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- 2) Entidades principales

CREATE TABLE coach (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    surname     VARCHAR(100) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE athlete (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    surname         VARCHAR(100) NOT NULL,
    age             INTEGER,
    height_cm       NUMERIC(5,2),
    weight_kg       NUMERIC(5,2),
    coach_id        BIGINT REFERENCES coach(id),
    actual_level_id BIGINT REFERENCES level(id)
);

CREATE TABLE training_plan (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    -- en tu diagrama decía duration:dateTime; aquí lo modelamos como semanas
    duration_weeks  INTEGER,
    level_id        BIGINT REFERENCES level(id)
);

CREATE TABLE exercise (
    id            BIGSERIAL PRIMARY KEY,
    name          VARCHAR(150) NOT NULL,
    description   TEXT,
    equipment_id  BIGINT REFERENCES equipment(id)
);

-- 3) Historial de cambios de estado (ChangeStatus)
-- Se puede asociar a un Athlete o a un TrainingPlan

CREATE TABLE change_status (
    id                BIGSERIAL PRIMARY KEY,
    date_at           TIMESTAMPTZ NOT NULL,
    date_since        TIMESTAMPTZ NOT NULL,
    status_id         BIGINT NOT NULL REFERENCES status(id),
    athlete_id        BIGINT REFERENCES athlete(id),
    training_plan_id  BIGINT REFERENCES training_plan(id),
    CHECK (athlete_id IS NOT NULL OR training_plan_id IS NOT NULL)
);

-- 4) Relaciones muchos-a-muchos

-- Coach tiene especialidades (Goal[])
CREATE TABLE coach_goal (
    coach_id BIGINT NOT NULL REFERENCES coach(id) ON DELETE CASCADE,
    goal_id  BIGINT NOT NULL REFERENCES goal(id),
    PRIMARY KEY (coach_id, goal_id)
);

-- Athlete tiene goals (Goal[])
CREATE TABLE athlete_goal (
    athlete_id BIGINT NOT NULL REFERENCES athlete(id) ON DELETE CASCADE,
    goal_id    BIGINT NOT NULL REFERENCES goal(id),
    PRIMARY KEY (athlete_id, goal_id)
);

-- TrainingPlan tiene goals (Goal[])
CREATE TABLE training_plan_goal (
    training_plan_id BIGINT NOT NULL REFERENCES training_plan(id) ON DELETE CASCADE,
    goal_id          BIGINT NOT NULL REFERENCES goal(id),
    PRIMARY KEY (training_plan_id, goal_id)
);

-- Relación Athlete <-> TrainingPlan (un atleta puede tener varios planes,
-- y un plan puede estar asignado a varios atletas)
CREATE TABLE athlete_training_plan (
    athlete_id       BIGINT NOT NULL REFERENCES athlete(id) ON DELETE CASCADE,
    training_plan_id BIGINT NOT NULL REFERENCES training_plan(id) ON DELETE CASCADE,
    PRIMARY KEY (athlete_id, training_plan_id)
);

-- Exercise puede ser apto para varios levels (Level[])
CREATE TABLE exercise_level (
    exercise_id BIGINT NOT NULL REFERENCES exercise(id) ON DELETE CASCADE,
    level_id    BIGINT NOT NULL REFERENCES level(id),
    PRIMARY KEY (exercise_id, level_id)
);

-- Exercise trabaja varios muscles (Muscle[])
CREATE TABLE exercise_muscle (
    exercise_id BIGINT NOT NULL REFERENCES exercise(id) ON DELETE CASCADE,
    muscle_id   BIGINT NOT NULL REFERENCES muscle(id),
    PRIMARY KEY (exercise_id, muscle_id)
);
