package dk.kb.interlibraryloans.webservice.exception;

import javax.ws.rs.core.Response;

/*
 * Custom web-exception class (400)
 */
public class InvalidArgumentServiceException extends ServiceException {

    //Constant fields for the OpenApi
    public static final String description = InternalServiceException.class.getName();

    private static final Response.Status responseStatus = Response.Status.BAD_REQUEST; // 400
    public static final String responseCode = responseStatus.getStatusCode()+"";
    private static final long serialVersionUID = -2557993100213801953L;

    public InvalidArgumentServiceException() {
        super(responseStatus);
    }

    public InvalidArgumentServiceException(String message) {
        super(message, responseStatus);
    }

    public InvalidArgumentServiceException(String message, Throwable cause) {
        super(message, cause, responseStatus);
    }

    public InvalidArgumentServiceException(Throwable cause) {
        super(cause, responseStatus);
    }

    public InvalidArgumentServiceException(String mimeType, Object entity) {
        super(mimeType, entity, responseStatus);
    }

    public InvalidArgumentServiceException(String mimeType, Object entity, Throwable cause) {
        super(mimeType, entity, cause, responseStatus);
    }

}
