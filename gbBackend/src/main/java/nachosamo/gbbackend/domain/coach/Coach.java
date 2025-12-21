package nachosamo.gbbackend.domain.coach;
import nachosamo.gbbackend.domain.athlete.Athlete;
import nachosamo.gbbackend.domain.specialities.Speciality;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table (name = "coach")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Coach {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (nullable = false, length = 100)
    private String name;

    @Column (nullable = false, length = 100)
    private String surname;

    @Column (nullable = false, length = 150, unique = true)
    private String email;

    @OneToMany(mappedBy = "coach", fetch = FetchType.LAZY)
    private Set<Athlete> athletes = new HashSet<>();

    private Set<Speciality> specialities = new HashSet<>();

    public void updateProfile(String name, String surname, String email){
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    // helpers opcionales (recomendado para mantener consistencia bidireccional)
    public void addAthlete(Athlete athlete) {
        athletes.add(athlete);
        athlete.setCoach(this);
    }

    public void removeAthlete(Athlete athlete) {
        athletes.remove(athlete);
        athlete.setCoach(null);
    }

}
