package nachosamo.gbbackend.api.coach;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nachosamo.gbbackend.application.coach.CoachService;
import nachosamo.gbbackend.domain.coach.Coach;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coach")
@RequiredArgsConstructor
public class CoachController {

    private final CoachService coachService;

    @PostMapping
    public CoachResponse create(@RequestBody @Valid CreateCoachRequest request) {

        Coach coach = coachService.createCoach(
            request.name(), request.surname(), request.email()
        );
        return toResponse(coach);
    }

    @GetMapping
    public List<CoachResponse> list(@RequestParam(required = false)String name) {
        List<Coach> coaches = coachService.findAll(name);
        return coaches.stream()
                .map(this::toResponse)
                .toList();
    }

    @PutMapping("/{id}")
    public CoachResponse update(@PathVariable Long id,@RequestBody @Valid UpdateCoachRequest req) {
        Coach coachUpdated = coachService.updateCoach(id, req);
        return toResponse(coachUpdated);
    }

    //Util method to convert Coach to CoachResponse
    private CoachResponse toResponse(Coach coach) {
        return new CoachResponse(
                coach.getId(),
                coach.getName(),
                coach.getSurname(),
                coach.getEmail()
        );
    }
}
