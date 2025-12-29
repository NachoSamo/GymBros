package nachosamo.gbbackend.domain.changeStatus;
import nachosamo.gbbackend.domain.athlete.Athlete;
import nachosamo.gbbackend.domain.status.Status;
import nachosamo.gbbackend.domain.trainingPlan.TrainingPlan;
import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "change_status")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChangeStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name= "date_at", nullable = false)
    private String dateAt;

    @Column(name= "date_since", nullable = true)
    private String dateSince;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="status_id", nullable=false)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="athlete_id")
    private Athlete athlete;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="training_plan_id")
    private TrainingPlan trainingPlan;
}
