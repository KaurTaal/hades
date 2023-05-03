package ut.ee.hades.web.services.impl;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import ut.ee.hades.app.dao.entity.CourseEntity;
import ut.ee.hades.app.dao.repository.CourseRepository;
import ut.ee.hades.app.web.model.dto.CourseDTO;
import ut.ee.hades.app.web.services.impl.CourseServiceImpl;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class CourseServiceImplTest {

    @Mock
    private CourseRepository courseRepository;

    @InjectMocks
    private CourseServiceImpl sut;


    @Test
    public void testAllCoursesSize() {
        Mockito.when(courseRepository.findAll()).thenReturn(List.of(new CourseEntity()));

        List<CourseDTO> allCourses = sut.getAllCourses();
        Assertions.assertThat(allCourses).hasSize(1);
    }

    @Test
    public void testAllCoursesMapping() {
        CourseEntity courseEntity = new CourseEntity();
        courseEntity.setCourseCode("Test code");
        courseEntity.setName("Test");

        Mockito.when(courseRepository.findAll()).thenReturn(List.of(courseEntity));

        List<CourseDTO> allCourses = sut.getAllCourses();
        Assertions.assertThat(allCourses).hasSize(1);
        CourseDTO result = allCourses.get(0);
        Assertions.assertThat(result.getCourseName()).isEqualTo("Test");
        Assertions.assertThat(result.getCourseCode()).isEqualTo("Test code");
    }
}
