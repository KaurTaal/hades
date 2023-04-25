package ut.ee.hades.app.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum WordDocumentStylesEnum {

    ORDERED_LIST("<xml-fragment xmlns:wpc=\"http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas\"\n" +
            "              xmlns:mc=\"http://schemas.openxmlformats.org/markup-compatibility/2006\"\n" +
            "              xmlns:o=\"urn:schemas-microsoft-com:office:office\"\n" +
            "              xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\"\n" +
            "              xmlns:m=\"http://schemas.openxmlformats.org/officeDocument/2006/math\"\n" +
            "              xmlns:v=\"urn:schemas-microsoft-com:vml\"\n" +
            "              xmlns:wp14=\"http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing\"\n" +
            "              xmlns:wp=\"http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing\"\n" +
            "              xmlns:w10=\"urn:schemas-microsoft-com:office:word\"\n" +
            "              xmlns:w=\"http://schemas.openxmlformats.org/wordprocessingml/2006/main\"\n" +
            "              xmlns:w14=\"http://schemas.microsoft.com/office/word/2010/wordml\"\n" +
            "              xmlns:wpg=\"http://schemas.microsoft.com/office/word/2010/wordprocessingGroup\"\n" +
            "              xmlns:wpi=\"http://schemas.microsoft.com/office/word/2010/wordprocessingInk\"\n" +
            "              xmlns:wne=\"http://schemas.microsoft.com/office/word/2006/wordml\"\n" +
            "              xmlns:wps=\"http://schemas.microsoft.com/office/word/2010/wordprocessingShape\" mc:Ignorable=\"w14 wp14\">\n" +
            "    <w:nsid w:val=\"1656060D\"/>\n" +
            "    <w:multiLevelType w:val=\"hybridMultilevel\"/>\n" +
            "    <w:tmpl w:val=\"99FCFC1A\"/>\n" +
            "    <w:lvl w:ilvl=\"0\" w:tplc=\"0409000F\">\n" +
            "        <w:start w:val=\"1\"/>\n" +
            "        <w:numFmt w:val=\"decimal\"/>\n" +
            "        <w:lvlText w:val=\"%1.\"/>\n" +
            "        <w:lvlJc w:val=\"left\"/>\n" +
            "        <w:pPr>\n" +
            "            <w:ind w:left=\"720\" w:hanging=\"360\"/>\n" +
            "        </w:pPr>\n" +
            "    </w:lvl>\n" +
            "    <w:lvl w:ilvl=\"1\" w:tplc=\"04090019\" w:tentative=\"1\">\n" +
            "        <w:start w:val=\"1\"/>\n" +
            "        <w:numFmt w:val=\"lowerLetter\"/>\n" +
            "        <w:lvlText w:val=\"%2.\"/>\n" +
            "        <w:lvlJc w:val=\"left\"/>\n" +
            "        <w:pPr>\n" +
            "            <w:ind w:left=\"1440\" w:hanging=\"360\"/>\n" +
            "        </w:pPr>\n" +
            "    </w:lvl>\n" +
            "    <w:lvl w:ilvl=\"2\" w:tplc=\"0409001B\" w:tentative=\"1\">\n" +
            "        <w:start w:val=\"1\"/>\n" +
            "        <w:numFmt w:val=\"lowerRoman\"/>\n" +
            "        <w:lvlText w:val=\"%3.\"/>\n" +
            "        <w:lvlJc w:val=\"right\"/>\n" +
            "        <w:pPr>\n" +
            "            <w:ind w:left=\"2160\" w:hanging=\"180\"/>\n" +
            "        </w:pPr>\n" +
            "    </w:lvl>\n" +
            "    <w:lvl w:ilvl=\"3\" w:tplc=\"0409000F\" w:tentative=\"1\">\n" +
            "        <w:start w:val=\"1\"/>\n" +
            "        <w:numFmt w:val=\"decimal\"/>\n" +
            "        <w:lvlText w:val=\"%4.\"/>\n" +
            "        <w:lvlJc w:val=\"left\"/>\n" +
            "        <w:pPr>\n" +
            "            <w:ind w:left=\"2880\" w:hanging=\"360\"/>\n" +
            "        </w:pPr>\n" +
            "    </w:lvl>\n" +
            "    <w:lvl w:ilvl=\"4\" w:tplc=\"04090019\" w:tentative=\"1\">\n" +
            "        <w:start w:val=\"1\"/>\n" +
            "        <w:numFmt w:val=\"lowerLetter\"/>\n" +
            "        <w:lvlText w:val=\"%5.\"/>\n" +
            "        <w:lvlJc w:val=\"left\"/>\n" +
            "        <w:pPr>\n" +
            "            <w:ind w:left=\"3600\" w:hanging=\"360\"/>\n" +
            "        </w:pPr>\n" +
            "    </w:lvl>\n" +
            "    <w:lvl w:ilvl=\"5\" w:tplc=\"0409001B\" w:tentative=\"1\">\n" +
            "        <w:start w:val=\"1\"/>\n" +
            "        <w:numFmt w:val=\"lowerRoman\"/>\n" +
            "        <w:lvlText w:val=\"%6.\"/>\n" +
            "        <w:lvlJc w:val=\"right\"/>\n" +
            "        <w:pPr>\n" +
            "            <w:ind w:left=\"4320\" w:hanging=\"180\"/>\n" +
            "        </w:pPr>\n" +
            "    </w:lvl>\n" +
            "    <w:lvl w:ilvl=\"6\" w:tplc=\"0409000F\" w:tentative=\"1\">\n" +
            "        <w:start w:val=\"1\"/>\n" +
            "        <w:numFmt w:val=\"decimal\"/>\n" +
            "        <w:lvlText w:val=\"%7.\"/>\n" +
            "        <w:lvlJc w:val=\"left\"/>\n" +
            "        <w:pPr>\n" +
            "            <w:ind w:left=\"5040\" w:hanging=\"360\"/>\n" +
            "        </w:pPr>\n" +
            "    </w:lvl>\n" +
            "    <w:lvl w:ilvl=\"7\" w:tplc=\"04090019\" w:tentative=\"1\">\n" +
            "        <w:start w:val=\"1\"/>\n" +
            "        <w:numFmt w:val=\"lowerLetter\"/>\n" +
            "        <w:lvlText w:val=\"%8.\"/>\n" +
            "        <w:lvlJc w:val=\"left\"/>\n" +
            "        <w:pPr>\n" +
            "            <w:ind w:left=\"5760\" w:hanging=\"360\"/>\n" +
            "        </w:pPr>\n" +
            "    </w:lvl>\n" +
            "    <w:lvl w:ilvl=\"8\" w:tplc=\"0409001B\" w:tentative=\"1\">\n" +
            "        <w:start w:val=\"1\"/>\n" +
            "        <w:numFmt w:val=\"lowerRoman\"/>\n" +
            "        <w:lvlText w:val=\"%9.\"/>\n" +
            "        <w:lvlJc w:val=\"right\"/>\n" +
            "        <w:pPr>\n" +
            "            <w:ind w:left=\"6480\" w:hanging=\"180\"/>\n" +
            "        </w:pPr>\n" +
            "    </w:lvl>\n" +
            "</xml-fragment>\n"),

    UNORDERED_LIST("<xml-fragment xmlns:wpc=\"http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas\"\n" +
            "              xmlns:mc=\"http://schemas.openxmlformats.org/markup-compatibility/2006\"\n" +
            "              xmlns:o=\"urn:schemas-microsoft-com:office:office\"\n" +
            "              xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\"\n" +
            "              xmlns:m=\"http://schemas.openxmlformats.org/officeDocument/2006/math\"\n" +
            "              xmlns:v=\"urn:schemas-microsoft-com:vml\"\n" +
            "              xmlns:wp14=\"http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing\"\n" +
            "              xmlns:wp=\"http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing\"\n" +
            "              xmlns:w10=\"urn:schemas-microsoft-com:office:word\"\n" +
            "              xmlns:w=\"http://schemas.openxmlformats.org/wordprocessingml/2006/main\"\n" +
            "              xmlns:w14=\"http://schemas.microsoft.com/office/word/2010/wordml\"\n" +
            "              xmlns:wpg=\"http://schemas.microsoft.com/office/word/2010/wordprocessingGroup\"\n" +
            "              xmlns:wpi=\"http://schemas.microsoft.com/office/word/2010/wordprocessingInk\"\n" +
            "              xmlns:wne=\"http://schemas.microsoft.com/office/word/2006/wordml\"\n" +
            "              xmlns:wps=\"http://schemas.microsoft.com/office/word/2010/wordprocessingShape\"\n" +
            "              mc:Ignorable=\"w14 wp14\">\n" +
            "    <w:nsid w:val=\"1656060D\"/>\n" +
            "    <w:multiLevelType w:val=\"hybridMultilevel\"/>\n" +
            "    <w:tmpl w:val=\"B249BDDD\"/>\n" +
            "    <w:lvl w:ilvl=\"0\" w:tplc=\"0409000F\">\n" +
            "        <w:start w:val=\"1\"/>\n" +
            "        <w:numFmt w:val=\"bullet\"/>\n" +
            "        <w:lvlText w:val=\"●\"/>\n" +
            "        <w:lvlJc w:val=\"left\"/>\n" +
            "        <w:pPr>\n" +
            "            <w:ind w:left=\"720\" w:hanging=\"360\"/>\n" +
            "        </w:pPr>\n" +
            "    </w:lvl>\n" +
            "    <w:lvl w:ilvl=\"1\" w:tplc=\"04090019\" w:tentative=\"1\">\n" +
            "        <w:start w:val=\"1\"/>\n" +
            "        <w:numFmt w:val=\"bullet\"/>\n" +
            "        <w:lvlText w:val=\"○\"/>\n" +
            "        <w:lvlJc w:val=\"left\"/>\n" +
            "        <w:pPr>\n" +
            "            <w:ind w:left=\"1440\" w:hanging=\"360\"/>\n" +
            "        </w:pPr>\n" +
            "    </w:lvl>\n" +
            "    <w:lvl w:ilvl=\"2\" w:tplc=\"0409001B\" w:tentative=\"1\">\n" +
            "        <w:start w:val=\"1\"/>\n" +
            "        <w:numFmt w:val=\"bullet\"/>\n" +
            "        <w:lvlText w:val=\"■\"/>\n" +
            "        <w:lvlJc w:val=\"left\"/>\n" +
            "        <w:pPr>\n" +
            "            <w:ind w:left=\"2160\" w:hanging=\"360\"/>\n" +
            "        </w:pPr>\n" +
            "    </w:lvl>\n" +
            "    <w:lvl w:ilvl=\"3\" w:tplc=\"0409000F\" w:tentative=\"1\">\n" +
            "        <w:start w:val=\"1\"/>\n" +
            "        <w:numFmt w:val=\"bullet\"/>\n" +
            "        <w:lvlText w:val=\"▲\"/>" +
                    "<w:lvlJc w:val=\"left\"/>\n" +
                    "<w:pPr>\n" +
                        "<w:ind w:left=\"2880\" w:hanging=\"360\"/>\n" +
                    "</w:pPr>\n" +
                "</w:lvl>\n" +
            "</xml-fragment>");

    private final String value;

}
