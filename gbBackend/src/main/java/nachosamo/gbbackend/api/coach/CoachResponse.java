package nachosamo.gbbackend.api.coach;
import nachosamo.gbbackend.domain.athlete.Athlete;
import nachosamo.gbbackend.domain.specialities.Speciality;

import java.util.List;

public record CoachResponse(
    Long id,
    String name,
    String surname,
    String email,
    List<Athlete> athletes,
    List<Speciality> specialties
) {
}
