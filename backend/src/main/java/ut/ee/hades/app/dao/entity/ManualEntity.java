package ut.ee.hades.app.dao.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "manual_document")
@Getter
@Setter
public class ManualEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long manualId;


    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "file_id")
    private FileEntity file;
}
