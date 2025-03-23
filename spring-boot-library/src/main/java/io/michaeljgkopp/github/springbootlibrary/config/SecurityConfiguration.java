package io.michaeljgkopp.github.springbootlibrary.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {

    @Value("${spring.data.rest.base-path}")
    private String basePath;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // Protect endpoints at /api/v1/<type>/secure/**
        http
                .csrf(csrf -> csrf.disable())   // disable CSRF for REST API
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(basePath + "/*/secure/**")
                        .authenticated()
                        // Allow all other endpoints without authentication
                        .anyRequest().permitAll())
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(withDefaults()));    // Use JWT for authentication

        // Overwrite cors
        http.cors(withDefaults());

        // Add content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class,
                new HeaderContentNegotiationStrategy());

        // Force a non-empty response body for 401's to make the response friendly
        Okta.configureResourceServer401ResponseBody(http);

        return http.build();
    }
}
