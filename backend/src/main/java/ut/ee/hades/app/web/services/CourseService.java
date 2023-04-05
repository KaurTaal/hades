package ut.ee.hades.app.web.services;

import ut.ee.hades.app.web.model.dto.CourseDTO;

import java.util.List;

public interface CourseService {

    List<CourseDTO> getAllCourses();
}
