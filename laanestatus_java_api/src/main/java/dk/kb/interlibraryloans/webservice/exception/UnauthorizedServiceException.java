package dk.kb.interlibraryloans.webservice.exception;

import javax.ws.rs.core.Response;

public class UnauthorizedServiceException extends ServiceException {

    //Constant fields for the OpenApi
    public static final String description = UnauthorizedServiceException.class.getName();

    private static final Response.Status responseStatus = Response.Status.UNAUTHORIZED; // 401
    public static final String responseCode = responseStatus.getStatusCode()+"";

    private static final long serialVersionUID = 7740355268378756580L;

    public UnauthorizedServiceException() {
        super(responseStatus);
    }

    public UnauthorizedServiceException(String message) {
        super(message, responseStatus);
    }

    public UnauthorizedServiceException(String message, Throwable cause) {
        super(message, cause, responseStatus);
    }

    public UnauthorizedServiceException(Throwable cause) {
        super(cause, responseStatus);
    }

    public UnauthorizedServiceException(String mimeType, Object entity) {
        super(mimeType, entity, responseStatus);
    }

    public UnauthorizedServiceException(String mimeType,
                                        Object entity,
                                        Throwable cause) {
        super(mimeType, entity, cause, responseStatus);
    }
}
