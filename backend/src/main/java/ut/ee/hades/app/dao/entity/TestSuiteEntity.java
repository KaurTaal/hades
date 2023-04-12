package ut.ee.hades.app.dao.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Table(name = "test_suite")
@Entity
@Getter
@Setter
public class TestSuiteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long testSuiteId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id", referencedColumnName = "exerciseId")
    private ExerciseEntity exerciseEntity;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "file_id")
    private FileEntity file;
}
