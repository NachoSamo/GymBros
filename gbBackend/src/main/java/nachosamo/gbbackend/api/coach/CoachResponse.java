package nachosamo.gbbackend.api.coach;
import nachosamo.gbbackend.domain.athlete.Athlete;
import nachosamo.gbbackend.domain.specialities.Speciality;

import java.util.Set;

public record CoachResponse(
    Long id,
    String name,
    String surname,
    String email,
    Set<Athlete> athletes,
    Set<Speciality> specialties
) {
}
