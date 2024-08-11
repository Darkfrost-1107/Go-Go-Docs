package gogodocs.backend.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JwtService {
    @Value ("${security.jwt.secret-key}")
    private String SECRET_KEY;

    public String getToken(UserDetails user) {
        return getToken(new HashMap<>(), user);
    }

    public String getToken(HashMap<String, Object> map, UserDetails user) {
        return Jwts.builder()
                .setClaims(map)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String getUsernameFromToken (String token) {
        return getClaim(token, Claims::getSubject);
    }

    private Claims getClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private <T> T getClaim (String token, Function<Claims, T> resolver) {
        final Claims claims = getClaims(token);
        return resolver.apply(claims);
    }

    private Date getExpirationDate (String token) {
        return getClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired (String token) {
        return getExpirationDate(token).before(new Date());
    }
}
