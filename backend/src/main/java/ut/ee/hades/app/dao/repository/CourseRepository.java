package ut.ee.hades.app.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ut.ee.hades.app.dao.entity.CourseEntity;

public interface CourseRepository extends JpaRepository<CourseEntity, Long> {


    CourseEntity findByCourseCode(String courseCode);

}
