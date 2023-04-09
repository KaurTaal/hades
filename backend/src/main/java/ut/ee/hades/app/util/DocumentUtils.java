package ut.ee.hades.app.util;

import org.apache.poi.xwpf.usermodel.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.web.multipart.MultipartFile;
import org.zwobble.mammoth.DocumentConverter;
import ut.ee.hades.app.dao.entity.FileEntity;
import ut.ee.hades.app.enums.UiAlertEnum;
import ut.ee.hades.app.exceptions.ui.UiAlertWarningException;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class DocumentUtils {

    private DocumentUtils() {

    }

    public static FileEntity prepareFileSave(MultipartFile file) throws IOException {
        FileEntity fileEntity = new FileEntity();
        fileEntity.setContent(file.getBytes());
        fileEntity.setSize(file.getSize());
        fileEntity.setMimeType(file.getContentType());
        fileEntity.setName(file.getOriginalFilename());

        return fileEntity;
    }

    public static void validateFileType(MultipartFile file) {
        if (AllowedMimeUtils.mimeMap.get(file.getContentType()) == null) {
            throw new UiAlertWarningException(UiAlertEnum.NOT_ALLOWED_FILE_TYPE.getName());
        }
    }

    public static String convertDocumentContentToHtml(InputStream stream) throws IOException {
        DocumentConverter converter = new DocumentConverter();
        return converter.convertToHtml(stream).getValue();
    }

    public static InputStream getInputStream(byte[] content) {
        return new ByteArrayInputStream(content);
    }


    public static byte[] convertHtmlToDocx(String contentHtml) throws IOException {

        try(XWPFDocument document = new XWPFDocument()) {
            Document parsedHtml = Jsoup.parse(contentHtml);

            Elements children = parsedHtml.body().children();

            for (Element element : children) {
                if (element.tagName().equals("h1")) {
                    XWPFParagraph heading = document.createParagraph();
                    heading.setStyle("Heading1");
                    XWPFRun run = heading.createRun();
                    run.setText(element.text());
                } else if (element.tagName().equals("p")) {
                    XWPFParagraph paragraph = document.createParagraph();
                    XWPFRun run = paragraph.createRun();
                    run.setText(element.text());
                } else if (element.tagName().equals("table")) {
                    XWPFTable table = document.createTable();
                    Elements rows = element.select("tr");
                    for (Element row : rows) {
                        XWPFTableRow tableRow = table.createRow();
                        Elements cells = row.select("td");
                        for (Element cell : cells) {
                            tableRow.createCell().setText(cell.text());
                        }
                    }
                }
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            document.write(outputStream);
            return outputStream.toByteArray();
        }

    }

    public static String convertPythonToHtml(byte[] content) {
        String python = new String(content, StandardCharsets.UTF_8);

        python = "<pre class=\"language-python\"><code>" + python + "</code></pre>";
        return python;
    }

    public static byte[] convertHtmlToPython(String contentHtml) {
        contentHtml = removeHtmlTags(contentHtml);
        return contentHtml.getBytes(StandardCharsets.UTF_8);
    }

    private static String removeHtmlTags(String html) {
        return html.replaceAll("<[^>]*+>", "");
    }
}
