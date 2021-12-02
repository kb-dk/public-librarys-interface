package dk.kb.interlibraryloans.webservice.exception;

import javax.ws.rs.core.Response;

/*
 * Custom web-exception class (500)
 */
public class InternalServiceException extends ServiceException {

    //Constant fields for the OpenApi
    public static final String description = "InternalServiceException";


    private static final Response.Status responseStatus = Response.Status.INTERNAL_SERVER_ERROR; //500
    public static final String responseCode = responseStatus.getStatusCode()+"";
    private static final long serialVersionUID = -3161577937901194624L;


    public InternalServiceException() {
        super(responseStatus);
    }

    public InternalServiceException(String message) {
        super(message, responseStatus);
    }

    public InternalServiceException(String message, Throwable cause) {
        super(message, cause, responseStatus);
    }

    public InternalServiceException(Throwable cause) {
        super(cause, responseStatus);
    }

    public InternalServiceException(String mimeType, Object entity) {
        super(mimeType, entity, responseStatus);
    }

    public InternalServiceException(String mimeType, Object entity, Throwable cause) {
        super(mimeType, entity, cause, responseStatus);
    }

}


