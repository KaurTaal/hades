package ut.ee.hades.app.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ut.ee.hades.app.dao.entity.TestSuiteEntity;

public interface TestSuiteRepository extends JpaRepository<TestSuiteEntity, Long> {
}
