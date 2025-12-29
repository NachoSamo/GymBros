package nachosamo.gbbackend.domain.trainingPlan;
import lombok.*;
import jakarta.persistence.*;
import nachosamo.gbbackend.domain.level.Level;
import nachosamo.gbbackend.domain.athlete.Athlete;
import nachosamo.gbbackend.domain.changeStatus.ChangeStatus;
import nachosamo.gbbackend.domain.goal.Goal;

import java.util.HashSet;
import java.util.Set;



@Entity
@Table(name = "training_plan")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainingPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(name = "duration_weeks", nullable = false)
    private Integer durationWeeks;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="level_id")
    private Level level;

    @ManyToMany (fetch = FetchType.LAZY, mappedBy = "trainingPlans")
    private Set<Athlete> athletes = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "training_plan_goal",
        joinColumns = @JoinColumn(name = "training_plan_id"),
        inverseJoinColumns = @JoinColumn(name = "goal_id")
    )
    private Set<Goal> goals = new HashSet<>();

    @OneToMany(mappedBy = "trainingPlan", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<ChangeStatus> changeStatuses = new HashSet<>();
}
