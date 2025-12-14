package nachosamo.gbbackend.infraestructure.coach;

import nachosamo.gbbackend.domain.coach.Coach;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CoachRepository extends JpaRepository<Coach, Long> {
    List<Coach> findByNameContainingIgnoreCase(String name);
    boolean existsByEmail(String email);
    boolean existsByEmailAndIdNot(String email, Long id);
}
