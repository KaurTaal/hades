package ut.ee.hades.app.util;

import org.apache.poi.xwpf.usermodel.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTAbstractNum;
import org.springframework.web.multipart.MultipartFile;
import org.zwobble.mammoth.DocumentConverter;
import ut.ee.hades.app.dao.entity.FileEntity;
import ut.ee.hades.app.enums.UiAlertEnum;
import ut.ee.hades.app.enums.WordDocumentStylesEnum;
import ut.ee.hades.app.exceptions.ui.UiAlertWarningException;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.util.LinkedList;

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

        try (XWPFDocument document = new XWPFDocument()) {
            Document doc = Jsoup.parse(contentHtml);

            for (Element element : doc.getAllElements()) {
                String tagName = element.tagName().toLowerCase();

                switch (tagName) {
                    case "h1", "h2", "h3", "h4", "h5", "h6" -> handleHeader(document, element);
                    case "p" -> handleParagraph(document, element);
                    case "a" -> handleLink(document, element);
                    case "table" -> handleTable(document, element);
                    case "li" -> handleList(document, element);
                    default -> {
                        // Do nothing
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

    public static String convertShellToHtml(byte[] content) {
        String shell = new String(content, StandardCharsets.UTF_8);
        shell = "<pre class=\"language-shell\"><code>" + shell + "</code></pre>";
        return shell;
    }

    public static byte[] convertHtmlToShell(String contentHtml) {
        contentHtml = removeHtmlTags(contentHtml);
        return contentHtml.getBytes(StandardCharsets.UTF_8);
    }

    private static String removeHtmlTags(String html) {
        return html.replaceAll("<[^>]*+>", "");
    }

    private static void handleList(XWPFDocument document, Element element) {
        WordDocumentStylesEnum listType = getListType(element.parent());
        int indentationLevel = getIndentationLevel(element.parent());

        XWPFParagraph para = document.createParagraph();
        XWPFRun run = para.createRun();
        para.setStyle("ListParagraph");
        para.setNumID(addListStyle(document, listType.getValue()));
        para.getCTP().getPPr().getNumPr().addNewIlvl().setVal(BigInteger.valueOf(indentationLevel));
        run.setText(element.ownText());
    }

    private static int getIndentationLevel(Element parentElement) {
        int indentationLevel = -1;
        while (parentElement != null) {
            if (parentElement.nodeName().equals("ol") || parentElement.nodeName().equals("ul")) {
                indentationLevel++;
            }
            parentElement = parentElement.parent();
        }
        return indentationLevel;
    }

    private static BigInteger addListStyle(XWPFDocument doc, String style) {
        try {
            doc.createNumbering();
            XWPFNumbering numbering = doc.getNumbering();
            // generate numbering style from XML
            CTAbstractNum abstractNum = CTAbstractNum.Factory.parse(style);
            XWPFAbstractNum abs = new XWPFAbstractNum(abstractNum, numbering);

            // find available id in document
            BigInteger id = BigInteger.valueOf(0);
            boolean found = false;
            while (!found) {
                Object o = numbering.getAbstractNum(id);
                found = (o == null);
                if (!found) id = id.add(BigInteger.ONE);
            }
            // assign id
            abs.getAbstractNum().setAbstractNumId(id);
            // add to numbering, should get back same id
            id = numbering.addAbstractNum(abs);
            // add to num list, result is numid
            return doc.getNumbering().addNum(id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private static WordDocumentStylesEnum getListType(Element parent) {
        if (parent != null && "ul".equals(parent.tagName())) {
            return WordDocumentStylesEnum.UNORDERED_LIST;
        } else if (parent != null && "ol".equals(parent.tagName())) {
            return WordDocumentStylesEnum.ORDERED_LIST;
        } else {
            return WordDocumentStylesEnum.UNORDERED_LIST;
        }
    }

    private static void handleLink(XWPFDocument document, Element element) {
        String linkUrl = element.attr("href");
        String linkText = element.text();
        XWPFParagraph paragraph = document.createParagraph();
        XWPFHyperlinkRun hyperlink = paragraph.createHyperlinkRun(linkUrl);
        hyperlink.setText(linkText);
        hyperlink.setUnderline(UnderlinePatterns.SINGLE);
    }

    private static void handleHeader(XWPFDocument document, Element element) {
        // Create a new paragraph in the Word document
        XWPFParagraph paragraph = document.createParagraph();

        // Apply the appropriate heading style to the paragraph
        String header = element.tagName().toLowerCase();
        switch (header) {
            case "h1" -> paragraph.setStyle("Heading1");
            case "h2" -> paragraph.setStyle("Heading2");
            case "h3" -> paragraph.setStyle("Heading3");
            case "h4" -> paragraph.setStyle("Heading4");
            case "h5" -> paragraph.setStyle("Heading5");
            case "h6" -> paragraph.setStyle("Heading6");
            default -> paragraph.setStyle("Heading 1");
        }

        // Add the text content of the heading element to the paragraph
        paragraph.createRun().setText(element.text());
    }

    private static void handleParagraph(XWPFDocument document, Element element) {
        boolean hasLinkAsChild = hasLinkAsChild(element);
        boolean isInTable = isInTable(element);

        if (!hasLinkAsChild && !isInTable) {
            XWPFParagraph paragraph = document.createParagraph();
            XWPFRun run = paragraph.createRun();
            run.setText(element.text());
        }
    }

    private static void handleTable(XWPFDocument document, Element element) {
        // Create a new table in the Word document
        XWPFTable table = document.createTable();

        // Initialize the current row and column indices
        XWPFTableRow tableRow = null;
        int rowIndex = 0;
        int colIndex = 0;

        // Loop through each table row
        for (Element row : element.select("tr")) {
            // Create a new row in the Word table if necessary
            if (tableRow != null) {
                rowIndex++;
            }
            tableRow = table.getRow(rowIndex);
            if (tableRow == null) {
                tableRow = table.createRow();
            }

            // Loop through each table cell in the row
            colIndex = 0;
            for (Element cell : row.select("td, th")) {
                // Get or create a new cell in the current row at the specified column index
                XWPFTableCell tableCell = tableRow.getCell(colIndex);
                if (tableCell == null) {
                    tableCell = tableRow.createCell();
                }

                // Set the cell content to the text of the HTML cell
                for (Element cellValue : cell.children()) {
                    XWPFParagraph paragraph = tableCell.addParagraph();
                    paragraph.createRun().setText(cellValue.text());
                }

                // Move to the next column index
                colIndex++;
            }
        }
    }


    private static boolean hasLinkAsChild(Element element) {
        LinkedList<Element> elements = new LinkedList<>(element.children());
        while (!elements.isEmpty()) {
            Element child = elements.removeFirst();
            if (child.tagName().equals("a")) {
                return true;
            }
            elements.addAll(child.children());
        }
        return false;
    }

    private static boolean isInTable(Element element) {
        boolean isInTable = false;
        Element parent = element.parent();
        while (parent != null) {
            if (parent.tagName().equals("table")) {
                isInTable = true;
                break;
            }
            parent = parent.parent();
        }
        return isInTable;
    }

}
