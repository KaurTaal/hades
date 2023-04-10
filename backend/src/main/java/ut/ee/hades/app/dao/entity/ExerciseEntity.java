package ut.ee.hades.app.dao.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "exercise_document")
@Getter
@Setter
public class ExerciseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exerciseId;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "file_id")
    private FileEntity file;

    @ManyToMany
    @JoinTable(name = "exercise_m_label", joinColumns = @JoinColumn(name = "exercise_id"), inverseJoinColumns = @JoinColumn(name = "label_id"))
    private List<LabelEntity> labelEntityList;

    @Column(name = "year")
    private Integer year;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_code")
    private CourseEntity courseEntity;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JoinColumn(name = "solution_id")
    private SolutionEntity solutionEntity;

    @OneToMany(mappedBy = "exerciseEntity", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<TestSuiteEntity> testSuiteEntityList;


}
