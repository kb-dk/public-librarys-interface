package dk.kb.interlibraryloans.webservice.exception;


import javax.ws.rs.core.Response;

/*
 * Custom web-exception class (404)
 */
public class NotFoundServiceException extends ServiceException {

    //Constant fields for the OpenApi
    public static final String description = NotFoundServiceException.class.getName();
    private static final Response.Status responseStatus = Response.Status.NOT_FOUND; //404
    public static final String responseCode = responseStatus.getStatusCode()+"";
    private static final long serialVersionUID = -7239935093005257333L;

    public NotFoundServiceException() {
        super(responseStatus);
    }

    public NotFoundServiceException(String message) {
        super(message, responseStatus);
    }

    public NotFoundServiceException(String message, Throwable cause) {
        super(message, cause, responseStatus);
    }

    public NotFoundServiceException(Throwable cause) {
        super(cause, responseStatus);
    }

    public NotFoundServiceException(String mimeType, Object entity) {
        super(mimeType, entity, responseStatus);
    }

    public NotFoundServiceException(String mimeType, Object entity, Throwable cause) {
        super(mimeType, entity, cause, responseStatus);
    }
}

