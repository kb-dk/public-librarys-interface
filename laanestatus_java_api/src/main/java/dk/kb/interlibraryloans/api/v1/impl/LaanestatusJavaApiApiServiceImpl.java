package dk.kb.interlibraryloans.api.v1.impl;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.json.JsonReadFeature;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider;
import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import dk.kb.interlibraryloans.api.v1.LaanestatusJavaApiApi;
import dk.kb.interlibraryloans.config.ServiceConfig;
import dk.kb.interlibraryloans.model.v1.CheckCreds;
import dk.kb.interlibraryloans.model.v1.LendingRequestState;
import dk.kb.interlibraryloans.model.v1.LibraryLoan;
import dk.kb.interlibraryloans.webservice.exception.InternalServiceException;
import dk.kb.interlibraryloans.webservice.exception.ServiceException;
import dk.kb.interlibraryloans.webservice.exception.UnauthorizedServiceException;
import org.apache.cxf.jaxrs.client.WebClient;
import org.apache.cxf.jaxrs.ext.MessageContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
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
import java.util.Objects;
import java.util.Optional;

/**
 * interlibraryloans
 *
 * <p>This pom can be inherited by projects wishing to integrate to the SBProjects development platform.     The
 * platform is similar to the SBForge.org platform.
 */
public class LaanestatusJavaApiApiServiceImpl implements LaanestatusJavaApiApi {
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


    @Override
    public String checkCreds(CheckCreds params) throws ServiceException {
        WebClient client = getWebClient();
        final String result = client.path("checkCreds")
                               .query("libraryNumber", params.getUsername())
                               .query("postcode", params.getPassword()).get(String.class);
        //If we are stil lhere and an exception is not thrown, the username/password combo worked

        //Create a session and set the libraryNumber as Attribute on this session
        HttpSession session = httpServletRequest.getSession(true);
        session.setAttribute("libraryNumber",params.getUsername());
        return result;
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
        //Get the http session, if any
        HttpSession session = httpServletRequest.getSession(false);
        if (session == null || !Objects.equals(session.getAttribute("libraryNumber"), partnerID)){
            //If no session or not a correct session, fail
            throw new UnauthorizedServiceException("You are not authorized to view the loans of "+partnerID);
        }

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
