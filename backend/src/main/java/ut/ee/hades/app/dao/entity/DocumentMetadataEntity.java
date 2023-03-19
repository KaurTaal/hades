package ut.ee.hades.app.dao.entity;

import java.util.Date;
import jakarta.persistence.*;


@Entity
@Table(name = "document_metadata")
public class DocumentMetadataEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "author")
    private String author;

    @Column(name = "upload_date")
    private Date uploadDate;

    @Column(name = "document_type")
    private String documentType;

    @Column(name = "document_category")
    private String documentCategory;

    @OneToOne
    private DocumentContentEntity content;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Date getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getDocumentCategory() {
        return documentCategory;
    }

    public void setDocumentCategory(String documentCategory) {
        this.documentCategory = documentCategory;
    }

    public DocumentContentEntity getContent() {
        return content;
    }

    public void setContent(DocumentContentEntity content) {
        this.content = content;
    }
}
