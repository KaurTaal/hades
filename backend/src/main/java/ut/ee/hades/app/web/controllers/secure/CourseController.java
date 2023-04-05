package ut.ee.hades.app.web.controllers.secure;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ut.ee.hades.app.web.model.dto.CourseDTO;
import ut.ee.hades.app.web.services.CourseService;

import java.util.List;

@RestController
@RequestMapping("api/course")
@RequiredArgsConstructor
@Slf4j
public class CourseController {

    private final CourseService courseService;

    @GetMapping(path = "/getAllCourses")
    public @ResponseBody List<CourseDTO> getAllCourses() {
        return courseService.getAllCourses();
    }

}
