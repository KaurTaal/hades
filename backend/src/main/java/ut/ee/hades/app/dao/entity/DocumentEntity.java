package ut.ee.hades.app.dao.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "document")
@Getter
@Setter
public class DocumentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content")
    private byte[] content;

    @Column(name = "name")
    private String fileName;

    @Column(name = "mime_type")
    private String mimeType;

    @Column(name = "size")
    private Long size;
}
