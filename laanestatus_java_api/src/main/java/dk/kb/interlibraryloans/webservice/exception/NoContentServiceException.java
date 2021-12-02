package dk.kb.interlibraryloans.webservice.exception;

import javax.ws.rs.core.Response;

/*
 * Custom web-exception class (400)
 */
public class NoContentServiceException extends ServiceException {

    //Constant fields for the OpenApi
    public static final String description = NotFoundServiceException.class.getName();



    private static final Response.Status responseStatus = Response.Status.NO_CONTENT; // 204
    public static final String responseCode = responseStatus.getStatusCode()+"";
    public NoContentServiceException() {
        super(responseStatus);
    }

    public NoContentServiceException(String message) {
        super(message, responseStatus);
    }

    public NoContentServiceException(String message, Throwable cause) {
        super(message, cause, responseStatus);
    }

    public NoContentServiceException(Throwable cause) {
        super(cause, responseStatus);
    }

    public NoContentServiceException(String mimeType, Object entity) {
        super(mimeType, entity, responseStatus);
    }

    public NoContentServiceException(String mimeType, Object entity, Throwable cause) {
        super(mimeType, entity, cause, responseStatus);
    }
}
