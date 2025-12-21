package nachosamo.gbbackend.domain.muscle;
import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "muscle")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Muscle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = true, columnDefinition = "TEXT")
    private String description;

}
