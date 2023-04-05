package ut.ee.hades.app.web.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ut.ee.hades.app.dao.entity.CourseEntity;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {

    private String courseCode;

    private String courseName;


    public static List<CourseDTO> mapList(List<CourseEntity> courseEntityList) {
        List<CourseDTO> courseDTOS = new LinkedList<>();
        courseEntityList.forEach(course -> courseDTOS.add(CourseDTO.map(course)));
        return courseDTOS;
    }

    public static CourseDTO map(CourseEntity courseEntity) {
        CourseDTO courseDTO = new CourseDTO();
        courseDTO.setCourseCode(courseEntity.getCourseCode());
        courseDTO.setCourseName(courseEntity.getName());
        return courseDTO;
    }

}
