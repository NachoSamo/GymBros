package nachosamo.gbbackend.domain.excercise;
import lombok.*;
import nachosamo.gbbackend.domain.equipment.Equipment;
import nachosamo.gbbackend.domain.level.Level;
import nachosamo.gbbackend.domain.muscle.Muscle;

import java.util.Set;
import java.util.HashSet;
import jakarta.persistence.*;

@Entity
@Table(name = "excercise")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Excercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(nullable = true, columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="equipment_id")
    private Equipment equipment;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "exercise_level",
        joinColumns = @JoinColumn(name = "exercise_id"),
        inverseJoinColumns = @JoinColumn(name = "level_id")
    )
    private Set<Level> levels = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "exercise_muscle",
        joinColumns = @JoinColumn(name = "exercise_id"),
        inverseJoinColumns = @JoinColumn(name = "muscle_id")
    )
    private Set<Muscle> muscles = new HashSet<>();

}
