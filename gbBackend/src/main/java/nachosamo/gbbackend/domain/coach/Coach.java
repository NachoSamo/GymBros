package nachosamo.gbbackend.domain.coach;
import jakarta.persistence.*;
import lombok.*;

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

    private Coach(String name, String surname, String email) {
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    public static Coach create(String name, String surname, String email) {
        return new Coach(name, surname, email);
    }

    public void updateProfile(String name, String surname, String email){
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

}
