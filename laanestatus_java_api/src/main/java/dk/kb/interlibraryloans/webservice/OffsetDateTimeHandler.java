package dk.kb.interlibraryloans.webservice;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider;

import javax.annotation.Nullable;
import javax.ws.rs.ext.ParamConverter;
import javax.ws.rs.ext.ParamConverterProvider;
import java.io.IOException;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Locale;
import java.util.Optional;


/**
 * Dates have to live in three places, and they have to agree on the format
 * The first place is the JSON output of webservice. This is the domain of getJsonProviderWithFixedOffsetDateTimes()
 * The second place is in the input filter for Alma Analytics. This is handled by forAlmaAnalytics(OffsetDateTime
 * offsetDateTime)
 * The third place is as an input (query) param for the webservice method. This is handled by OffsetDateTimeProvider
 */
public class OffsetDateTimeHandler {


    /**
     * This allows us to configure jackson to format java 8 datetime things nicely
     *
     * @see Application_v1#getSingletons()
     */
    public static JacksonJaxbJsonProvider getJsonProviderWithFixedOffsetDateTimes() {
        // see https://github.com/FasterXML/jackson-modules-java8
        ObjectMapper mapper = new ObjectMapper();

        //mapper.findAndRegisterModules(); //we add the module explicitly instead

        final JavaTimeModule javaTimeModule = new JavaTimeModule();


        //Firstly, there is the json output. This is where this formatter comes in
        //It ENSURES that the milliseconds and timezone (with :) is included, unlike the default for OffsetDateTime
        //This is nessesary, as I want the ability to use the output dates (from the json) directly as the input values for the webservice
        // The swagger GUI uses Javascript Date.parse() to check if an input value is a datetime
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#date_time_string_format
        // And this only allows for the formats "2011-10-10T14:48:00", or "2011-10-10T14:48:00.000+09:00" meaning that
        // if you specify an offset, you MUST also specify milliseconds and you MUST use :00 on the offset.
        //
        // See also OffsetDateTimeProvider for the thing that allows CXF to convert stringy query params to OffsetDateTimes
        //
        final DateTimeFormatter offsetDateTimeFormatter = DateTimeFormatter.ofPattern("uuuu-MM-dd'T'HH:mm:ss.SSSXXX",
                                                                                      Locale.getDefault());
        javaTimeModule.addSerializer(OffsetDateTime.class, new JsonSerializer<>() {
            @Override
            public void serialize(OffsetDateTime value, JsonGenerator gen, SerializerProvider serializers)
                    throws IOException {
                gen.writeString(value.format(offsetDateTimeFormatter));
            }
        });
        mapper.registerModule(javaTimeModule);
        return new JacksonJaxbJsonProvider(mapper,
                                           JacksonJaxbJsonProvider.DEFAULT_ANNOTATIONS);
    }

    /**
     * Method used to format offsetDateTimes in a way that Alma Analytics can work with
     * We assume that the dates to Alma Analytics are in UTC timezone
     * @param offsetDateTime the offset datetime to format for alma analytics
     * @return the same instant, moved to UTC and truncated to seconds and without zone or offset.
     */
    public static String forAlmaAnalytics(OffsetDateTime offsetDateTime) {
        return offsetDateTime
                       .atZoneSameInstant(ZoneId.of("UTC"))
                       .toLocalDateTime()
                       .truncatedTo(ChronoUnit.SECONDS) + "Z";
    }

    /**
     * Utility method to parse Alma Analytics row values as OffsetDateTimes
     * We assume that the dates from Alma Analytics are in UTC timezone
     * @param value the datetime (formatted as "2021-07-07T12:28:38") or an empty string
     * @return the date parses as a OffsetDateTime
     */
    @Nullable
    public static OffsetDateTime toDateTime(String value) {
        return Optional.ofNullable(value)
                       .filter(s -> !s.isBlank())
                       .map(s -> LocalDateTime.parse(s)
                                              .atZone(ZoneId.of("UTC"))
                                              .withZoneSameInstant(ZoneId.systemDefault())
                                              .toOffsetDateTime())
                       .orElse(null);
    }

    /**
     * Swagger json schema produdes OffsetDateTime for
     * format: date-time
     * but LocalDate for
     * format: date
     * <p>
     * This method is to parse the Alma Analytics date values as LocalDates
     *
     * @param value the date (formatted as "2021-07-06"), or an empty string
     * @return the date as a LocalDate
     */
    @Nullable
    public static LocalDate toDate(String value) {
        return Optional.ofNullable(value)
                       .filter(s -> !s.isBlank())
                       .map(LocalDate::parse)
                       .orElse(null);
    }

    /**
     * This class allows Apache CXF to handle query params of OffsetDateTime
     * When openapi specifies a param as
     * type: string
     * format: date-time
     * the java interface will handle it as a OffsetDateTime
     * But Apache CXF does not per-default include the capability of parsing strings to OffsetDateTimes
     * See https://stackoverflow.com/a/39850842
     * <p>
     * See offsetDateTimeFormatter above for how offsetDateTimes are formattet for json output
     */
    //@javax.ws.rs.ext.Provider //Explicit mention in Application_v1.java instead
    public static class OffsetDateTimeProvider implements ParamConverterProvider {

        @Override
        public <T> ParamConverter<T> getConverter(Class<T> clazz, Type type, Annotation[] annotations) {
            if (clazz.getName().equals(OffsetDateTime.class.getName())) {

                return new ParamConverter<>() {

                    @SuppressWarnings("unchecked")
                    @Override
                    public T fromString(String value) {
                        //TODO be more gentle with parsing input values here
                        OffsetDateTime time = OffsetDateTime.parse(value);
                        return (T) time;
                    }

                    @Override
                    public String toString(T time) {
                        return (time).toString();
                    }
                };
            }
            return null;
        }
    }
}
