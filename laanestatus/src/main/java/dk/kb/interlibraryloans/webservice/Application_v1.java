package dk.kb.interlibraryloans.webservice;


import dk.kb.interlibraryloans.api.v1.impl.LaanestatusApiServiceImpl;
import org.apache.cxf.rs.security.cors.CrossOriginResourceSharingFilter;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


public class Application_v1 extends javax.ws.rs.core.Application {

    @Override
    public Set<Object> getSingletons() {
        //Providers added here will be used before providers added in getClasses below
        //But for good order, we do not add JacksonJaxbJsonProvider.class anyway
        final var jsonProviderWithFixedOffsetDateTimes =
                OffsetDateTimeHandler.getJsonProviderWithFixedOffsetDateTimes();
        //TODO get this configurable
        final var crossOriginResourceSharingFilter = new CrossOriginResourceSharingFilter();
        crossOriginResourceSharingFilter.setAllowCredentials(true);
        crossOriginResourceSharingFilter.setAllowOrigins(List.of("http://localhost:4200"));
        return Set.of(jsonProviderWithFixedOffsetDateTimes, crossOriginResourceSharingFilter);
        //return Set.of(jsonProviderWithFixedOffsetDateTimes);
    }

    @Override
    public Set<Class<?>> getClasses() {
        return new HashSet<>(Arrays.asList(LaanestatusApiServiceImpl.class,
                                           ServiceExceptionMapper.class,
                                           //The provider that allows us to take offsetDateTime query params
                                           OffsetDateTimeHandler.OffsetDateTimeProvider.class
                                          ));
    }

}
