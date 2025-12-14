package nachosamo.gbbackend.api.coach;

public record CoachResponse(
    Long id,
    String name,
    String surname,
    String email
) {
}
