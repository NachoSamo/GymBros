package nachosamo.gbbackend.api.coach;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UpdateCoachRequest(
        @NotBlank String name,
        @NotBlank String surname,
        @NotBlank @Email String email
) {
}
