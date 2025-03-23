package io.michaeljgkopp.github.springbootlibrary.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Arrays;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class ExtractJWT {

    public static String payloadJWTExtraction(String token, String claim) {

        // remove Bearer from token if present
        token.replace("Bearer ", "");

        // split jwt token into Header, Payload, Signature
        String[] chunks = token.split("\\.");

        // decode the payload with Base64
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String payload = new String(decoder.decode(chunks[1])); // payload is the second chunk of the jwt

        // read claims from payload
        String[] entries = payload
                .replaceAll("[\"{}]", "")   // remove quotes, opening and closing braces;
                .split(",");
        Map<String, String> claims = new HashMap<>();
        Arrays.stream(entries)
        .forEach(entry -> {
            entry = entry.replaceAll("[\"{}]", ""); // remove quotes, opening and closing braces
            String[] keyValue = entry.split(":"); // split each entry into key and value
            if (keyValue.length == 2) {
                claims.put(keyValue[0].trim(), keyValue[1].trim());
            } else {
                claims.put(keyValue[0].trim(), ""); // if no value is present, set it to empty string
            }
        });

        return claims.get("claim"); // return the subject claim (userEmail)
    }

//    public static String payloadJWTExtraction(String token) {
//        try {
//            // Remove Bearer prefix if present
//            if (token.startsWith("Bearer ")) {
//                token = token.substring(7);
//            }
//
//            // Split JWT token into parts
//            String[] chunks = token.split("\\.");
//
//            // Decode the payload (middle part)
//            Base64.Decoder decoder = Base64.getUrlDecoder();
//            String payload = new String(decoder.decode(chunks[1]));
//
//            // Use Jackson to parse the JSON payload
//            ObjectMapper mapper = new ObjectMapper();
//            Map<String, Object> claims = mapper.readValue(payload, new TypeReference<Map<String, Object>>() {});
//
//            // Return the "sub" claim or null if not present
//            return claims.containsKey("sub") ? claims.get("sub").toString() : null;
//        } catch (Exception e) {
//            // Handle parsing errors gracefully
//            return null;
//        }
}
