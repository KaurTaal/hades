package ut.ee.hades.app.dao.entity;

import jakarta.persistence.*;

@Entity
public class DocumentContentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "metadata_id")
    private DocumentMetadataEntity metadata;

    @Column(name = "binary_content")
    private byte[] binaryContent;

    @Column(name = "text_content")
    private String textContent;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DocumentMetadataEntity getMetadata() {
        return metadata;
    }

    public void setMetadata(DocumentMetadataEntity metadata) {
        this.metadata = metadata;
    }

    public byte[] getBinaryContent() {
        return binaryContent;
    }

    public void setBinaryContent(byte[] binaryContent) {
        this.binaryContent = binaryContent;
    }

    public String getTextContent() {
        return textContent;
    }

    public void setTextContent(String textContent) {
        this.textContent = textContent;
    }
}
