package ut.ee.hades.app.web.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.CollectionUtils;
import ut.ee.hades.app.dao.entity.TestSuiteEntity;
import ut.ee.hades.app.util.DocumentUtils;

import java.util.LinkedList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestSuiteDTO {

    private Long testSuiteId;
    private Long exerciseId;
    private Long fileId;
    private String contentHtml;
    private String name;


    public static List<TestSuiteDTO> mapList(List<TestSuiteEntity> testSuiteEntityList) {
        List<TestSuiteDTO> testSuiteDTOList = new LinkedList<>();

        if (!CollectionUtils.isEmpty(testSuiteEntityList)) {
            testSuiteEntityList.forEach(testSuite -> testSuiteDTOList.add(TestSuiteDTO.map(testSuite)));
        }
        return testSuiteDTOList;
    }


    public static TestSuiteDTO map(TestSuiteEntity testSuiteEntity) {
        if (testSuiteEntity != null) {
            TestSuiteDTO testSuiteDTO = new TestSuiteDTO();
            testSuiteDTO.setTestSuiteId(testSuiteEntity.getTestSuiteId());
            testSuiteDTO.setExerciseId(testSuiteEntity.getExerciseEntity().getExerciseId());
            testSuiteDTO.setFileId(testSuiteEntity.getFile().getFileId());
            testSuiteDTO.setContentHtml(DocumentUtils.convertPythonToHtml(testSuiteEntity.getFile().getContent()));
            testSuiteDTO.setName(testSuiteEntity.getFile().getName());
            return testSuiteDTO;
        }
        return new TestSuiteDTO();
    }
}
