package ut.ee.hades.app.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ut.ee.hades.app.dao.entity.ExerciseEntity;

@Repository
public interface ExerciseRepository extends JpaRepository<ExerciseEntity, Long> {
}
