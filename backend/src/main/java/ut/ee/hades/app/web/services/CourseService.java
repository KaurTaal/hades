package ut.ee.hades.app.web.services;

import ut.ee.hades.app.web.model.dto.CourseDTO;

import java.util.List;

public interface CourseService {

    /**
     * Retrieves all courses
     * @return - all courses
     */
    List<CourseDTO> getAllCourses();
}
