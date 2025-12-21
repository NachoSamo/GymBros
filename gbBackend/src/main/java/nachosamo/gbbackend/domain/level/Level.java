package nachosamo.gbbackend.domain.level;
import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "level")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Level {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique= true, length = 50)
    private String name;

}
