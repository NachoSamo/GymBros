package nachosamo.gbbackend.domain.specialities;

import jakarta.persistence.*;
import lombok.*;

@Data
@Table(name = "goal")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Speciality {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

}
