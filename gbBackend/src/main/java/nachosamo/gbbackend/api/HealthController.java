package nachosamo.gbbackend.api;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthController {
    private final JdbcTemplate jdbcTemplate;

    public HealthController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @GetMapping("api/health/db")
    public Map<String, Object> dbHealth() {
        Integer one = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
        return Map.of("status","UP", "dbCheck",one);
    }
}
