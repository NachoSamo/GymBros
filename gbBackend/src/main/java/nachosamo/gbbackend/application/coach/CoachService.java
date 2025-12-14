package nachosamo.gbbackend.application.coach;

import nachosamo.gbbackend.api.coach.UpdateCoachRequest;
import nachosamo.gbbackend.domain.coach.Coach;
import nachosamo.gbbackend.infraestructure.coach.CoachRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CoachService {

    private CoachRepository coachRepository;

    public CoachService(CoachRepository coachRepository) {
        this.coachRepository = coachRepository;
    }

    @Transactional
    public Coach createCoach(String name, String surname, String email) {
        if (coachRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Coach with email " + email + " already exists.");
        }
        Coach coach = Coach.builder()
                .name(name)
                .surname(surname)
                .email(email)
                .build();
        return coachRepository.save(coach);
    }

    public Coach updateCoach(Long id,UpdateCoachRequest req){
        Coach coach = coachRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Coach with id " + id + " not found."));
        if (coachRepository.existsByEmailAndIdNot(req.email(), id)){
            throw new IllegalArgumentException("Coach with email " + req.email() + " already exists.");
        }
        coach.updateProfile(req.name(), req.surname(), req.email());
        return coachRepository.save(coach);
    }

    @Transactional(readOnly = true)
    public List<Coach> findAll(String name) {
        return coachRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Coach findById(Long id) {
        return coachRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Coach with id " + id + " not found."));
    }
}
