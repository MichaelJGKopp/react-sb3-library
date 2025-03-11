package io.michaeljgkopp.github.springbootlibrary.config;

import io.michaeljgkopp.github.springbootlibrary.entity.Book;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

// make RestRepository read-only by configuring CORS (Cross-Origin Resource Sharing)
@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    // React frontend running on port 3000 is allowed to access the API on all endpoints
    private String allowedOrigins = "http://localhost:3000";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                                                     CorsRegistry cors) {
        // Defines which HTTP methods to block, effectively making the API read-only.
        HttpMethod[] unsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PUT,
                HttpMethod.PATCH,
                HttpMethod.DELETE};

        // By default, Spring Data REST doesn't expose entity IDs in responses.
        // This line ensures Book IDs are included in REST responses.
        config.exposeIdsFor(Book.class);

        // Calls the helper method to disable the specified HTTP methods for Book entity.
        disableHttpMethods(Book.class, config, unsupportedActions);

        /* Configure CORS Mapping */
        // Configures CORS to allow requests from the specified origin to all REST endpoints.
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(allowedOrigins);
    }

    // A utility method to disable specific HTTP methods for a given entity class.
    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] unsupportedActions) {

        // Gets the exposure configuration.
        config.getExposureConfiguration()
                // Specifies which entity class to configure
                .forDomainType(theClass)
                // Disables specified HTTP methods for single item endpoints (e.g., /books/1)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions))
                // Disables specified HTTP methods for collection endpoints (e.g., /books)
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions));
    }
}
