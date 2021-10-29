package dk.kb.interlibraryloans.api.v1.impl;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.json.JsonReadFeature;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider;
import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import dk.kb.interlibraryloans.api.v1.InterlibraryloansApi;
import dk.kb.interlibraryloans.config.ServiceConfig;
import dk.kb.interlibraryloans.model.v1.LendingRequestState;
import dk.kb.interlibraryloans.model.v1.LibraryLoan;
import dk.kb.interlibraryloans.webservice.exception.InternalServiceException;
import dk.kb.interlibraryloans.webservice.exception.ServiceException;
import org.apache.cxf.jaxrs.client.WebClient;
import org.apache.cxf.jaxrs.ext.MessageContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Providers;
import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * interlibraryloans
 *
 * <p>This pom can be inherited by projects wishing to integrate to the SBProjects development platform.     The
 * platform is similar to the SBForge.org platform.
 */
public class InterlibraryloansApiServiceImpl implements InterlibraryloansApi {
    private Logger log = LoggerFactory.getLogger(this.toString());
    
    
    
    /* How to access the various web contexts. See https://cxf.apache.org/docs/jax-rs-basics.html#JAX-RSBasics-Contextannotations */
    
    @Context
    private transient UriInfo uriInfo;
    
    @Context
    private transient SecurityContext securityContext;
    
    @Context
    private transient HttpHeaders httpHeaders;
    
    @Context
    private transient Providers providers;
    
    @Context
    private transient Request request;
    
    @Context
    private transient ContextResolver contextResolver;
    
    @Context
    private transient HttpServletRequest httpServletRequest;
    
    @Context
    private transient HttpServletResponse httpServletResponse;
    
    @Context
    private transient ServletContext servletContext;
    
    @Context
    private transient ServletConfig servletConfig;
    
    @Context
    private transient MessageContext messageContext;
    
    
    private static WebClient getWebClient() {
        String libraryLoansAddress = ServiceConfig.getConfig()
                                                  .getString("libraryloans.address");
        
        JacksonJsonProvider jacksonJaxbJsonProvider = new JacksonJaxbJsonProvider();
        jacksonJaxbJsonProvider.disable(DeserializationFeature.UNWRAP_ROOT_VALUE);
        jacksonJaxbJsonProvider.disable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);
        jacksonJaxbJsonProvider.enable(DeserializationFeature.WRAP_EXCEPTIONS);
        
        jacksonJaxbJsonProvider.enable(JsonReadFeature.ALLOW_UNESCAPED_CONTROL_CHARS.mappedFeature());
        jacksonJaxbJsonProvider.enable(JsonParser.Feature.IGNORE_UNDEFINED);
        
        final List<?> providers = Arrays.asList(jacksonJaxbJsonProvider);
        WebClient client = WebClient.create(libraryLoansAddress, providers);
        return client;
    }
    
    /**
     * Check the given credentials to see if they are valid
     *
     * @param libraryNumber: The Library number
     * @param postcode:      The Library Postcode
     * @return <ul>
     *         <li>code = 200, message = "OK", response = String.class</li>
     *         <li>code = 404, message = "Library is not found", response = String.class</li>
     *         <li>code = 400, message = "Postcode is not of valid format", response = String.class</li>
     *         <li>code = 401, message = "Postcode is not the postcode of the library", response = String.class</li>
     *         <li>code = 500, message = "Internal Error", response = String.class</li>
     *         </ul>
     * @throws ServiceException when other http codes should be returned
     * @implNote return will always produce a HTTP 200 code. Throw ServiceException if you need to return other
     *         codes
     */
    @Override
    public String checkCreds(String libraryNumber, String postcode) throws ServiceException {
        WebClient client = getWebClient();
        return client.path("checkCreds")
                     .query("libraryNumber", libraryNumber)
                     .query("postcode", postcode).get(String.class);
    }
    
    /**
     * Summary TODO
     *
     * @param partnerID:           The partner id
     * @param lendingRequestState: Only find loans in the given state
     * @param modifiedAfter:       Only return loans modified after this timestamp
     * @return <ul>
     *         <li>code = 200, message = "The list of loans by the partner, subject to the filters given", response = LibraryLoan.class, responseContainer = "List"</li>
     *         </ul>
     * @throws ServiceException when other http codes should be returned
     * @implNote return will always produce a HTTP 200 code. Throw ServiceException if you need to return other
     *         codes
     */
    @Override
    public List<LibraryLoan> getPartnerLoans(String partnerID,
                                             List<LendingRequestState> lendingRequestState,
                                             OffsetDateTime modifiedAfter) throws ServiceException {
        
        WebClient client = getWebClient();
        
        final WebClient webClient = client.path("partnerLoans")
                                          .path(partnerID);
        Optional.ofNullable(lendingRequestState)
                .ifPresent(lendingRequestStates -> webClient.query("lendingRequestState", lendingRequestStates));
        Optional.ofNullable(modifiedAfter)
                .ifPresent(modifiedAfter1 -> webClient.query("modifiedAfter", modifiedAfter1));
        
        return webClient.get(List.class);
        
    }
    
    
    /**
     * This method simply converts any Exception into a Service exception
     *
     * @param e: Any kind of exception
     * @return A ServiceException
     * @see dk.kb.interlibraryloans.webservice.ServiceExceptionMapper
     */
    private ServiceException handleException(Exception e) {
        if (e instanceof ServiceException) {
            return (ServiceException) e; // Do nothing - this is a declared ServiceException from within module.
        } else {// Unforseen exception (should not happen). Wrap in internal service exception
            log.error("ServiceException(HTTP 500):", e); //You probably want to log this.
            return new InternalServiceException(e.getMessage());
        }
    }
    
}
