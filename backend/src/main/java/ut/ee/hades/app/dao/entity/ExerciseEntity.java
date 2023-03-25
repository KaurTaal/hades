package ut.ee.hades.app.dao.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "exercise_document")
@Getter
@Setter
public class ExerciseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinTable(name = "document", joinColumns = @JoinColumn(name = "id"))
    private FileEntity document;
}
