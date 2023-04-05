package ut.ee.hades.app.dao.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Table(name = "exercise_m_label")
@Entity
@Getter
@Setter
public class ExerciseLabelEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


}
