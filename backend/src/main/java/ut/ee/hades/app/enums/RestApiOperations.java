package ut.ee.hades.app.enums;

public enum RestApiOperations {

    GET_ALL_LABELS("getAllLabels"),
    GET_ALL_MANUALS("getAllManuals"),
    CREATE_MANUAL("createManual"),
    DELETE_MANUAL("deleteManual");

    private final String name;

    RestApiOperations(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
