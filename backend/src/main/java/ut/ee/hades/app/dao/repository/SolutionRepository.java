package ut.ee.hades.app.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ut.ee.hades.app.dao.entity.SolutionEntity;

public interface SolutionRepository extends JpaRepository<SolutionEntity, Long> {
}
