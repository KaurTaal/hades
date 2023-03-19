package ut.ee.hades.app.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ut.ee.hades.app.dao.entity.DocumentMetadataEntity;
import ut.ee.hades.app.dao.entity.LabelEntity;

@Repository

public interface DocumentMetadataRepository extends JpaRepository<DocumentMetadataEntity, Long> {
}
