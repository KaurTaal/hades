package ut.ee.hades.app.dao.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Table(name = "course")
@Entity
@Getter
@Setter
public class CourseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String courseCode;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "courseEntity", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<ExerciseEntity> exerciseEntityList;

    @OneToMany(mappedBy = "courseEntity", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<ManualEntity> manualEntityList;
}
