package dk.kb.interlibraryloans.webservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class RewriteFilter implements Filter {
    private static final Logger log = LoggerFactory.getLogger(RewriteFilter.class);
    
    private List<Pattern> patterns;
    private String replacement;
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        final String rewritePatternsString = Optional.ofNullable(filterConfig.getInitParameter("rewrite.patterns"))
                                                     .orElse("");
        patterns    = Arrays.stream(rewritePatternsString.split("\n"))
                            .map(String::trim)
                            .map(Pattern::compile)
                            .collect(Collectors.toList());
        replacement = Optional.ofNullable(filterConfig.getInitParameter("rewrite.replacement")).orElse("/index.jsp");
    }
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        if (request instanceof HttpServletRequest) {
            HttpServletRequest httpServletRequest = (HttpServletRequest) request;
            
            final String servletPath = httpServletRequest.getServletPath();
            String pathInfo = Optional.ofNullable(servletPath).orElse("/");
            boolean notExcepted = patterns.stream().noneMatch(pattern -> pattern.matcher(pathInfo).matches());
            
            if (notExcepted) {
                String newPath = replacement;
                log.debug("Redirected request from {} to {}", pathInfo, newPath);
                HttpServletRequestWrapper wrappedRequest = new HttpServletRequestWrapper(httpServletRequest) {
                    @Override
                    public String getServletPath() {
                        return newPath;
                    }
                };
                request = wrappedRequest;
            }
        }
        
        chain.doFilter(request, response);
    }
    
    @Override
    public void destroy() {
    
    }
}
