package ut.ee.hades.app.web.services.impl;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ut.ee.hades.app.dao.entity.CourseEntity;
import ut.ee.hades.app.dao.repository.CourseRepository;
import ut.ee.hades.app.web.model.dto.CourseDTO;
import ut.ee.hades.app.web.services.CourseService;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;


    @Override
    public List<CourseDTO> getAllCourses() {
        List<CourseEntity> allCourseEntitys = courseRepository.findAll();
        return CourseDTO.mapList(allCourseEntitys);
    }
}
