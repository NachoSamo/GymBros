package nachosamo.gbbackend.domain.athlete;
import lombok.*;
import nachosamo.gbbackend.domain.changeStatus.ChangeStatus;
import nachosamo.gbbackend.domain.coach.Coach;
import nachosamo.gbbackend.domain.goal.Goal;
import nachosamo.gbbackend.domain.trainingPlan.TrainingPlan;
import nachosamo.gbbackend.domain.level.Level;
import nachosamo.gbbackend.domain.status.Status;
import nachosamo.gbbackend.domain.trainingPlan.TrainingPlan;


import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name = "athlete")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Athlete {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String surname;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false)
    private BigDecimal height_cm;

    @Column(nullable = false )
    private BigDecimal weight_kg;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="coach_id")
    private Coach coach;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="actual_level_id")
    private Level actualLevel;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "athlete_training_plan",
        joinColumns = @JoinColumn(name = "athlete_id"),
        inverseJoinColumns = @JoinColumn(name = "training_plan_id")
    )
    private Set<TrainingPlan> trainingPlans = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "athlete_goal",
        joinColumns = @JoinColumn(name = "athlete_id"),
        inverseJoinColumns = @JoinColumn(name = "goal_id")
    )
    private Set<Goal> goals = new HashSet<>();

    @OneToMany(mappedBy = "athlete", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<ChangeStatus> changeStatuses = new HashSet<>();

    

    




}
