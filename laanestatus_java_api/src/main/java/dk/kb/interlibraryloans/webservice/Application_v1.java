package dk.kb.interlibraryloans.webservice;


import dk.kb.interlibraryloans.api.v1.impl.LaanestatusJavaApiApiServiceImpl;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;


public class Application_v1 extends javax.ws.rs.core.Application {

    @Override
    public Set<Object> getSingletons() {
        //Providers added here will be used before providers added in getClasses below
        //But for good order, we do not add JacksonJaxbJsonProvider.class anyway
        final var jsonProviderWithFixedOffsetDateTimes =
                OffsetDateTimeHandler.getJsonProviderWithFixedOffsetDateTimes();

        return Set.of(jsonProviderWithFixedOffsetDateTimes);
    }

    @Override
    public Set<Class<?>> getClasses() {
        return new HashSet<>(Arrays.asList(LaanestatusJavaApiApiServiceImpl.class,
                                           ServiceExceptionMapper.class,
                                           //The provider that allows us to take offsetDateTime query params
                                           OffsetDateTimeHandler.OffsetDateTimeProvider.class
                                          ));
    }

}
