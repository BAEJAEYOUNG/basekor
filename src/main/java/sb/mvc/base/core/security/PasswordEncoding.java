/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 24 오후 1:23.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncoding implements PasswordEncoder {

    private PasswordEncoder passwordEncoder;

    public PasswordEncoding() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public PasswordEncoding( PasswordEncoder passwordEncoder ) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String encode( CharSequence rawPassword ) {

        return passwordEncoder.encode( rawPassword );
    }

    @Override
    public boolean matches( CharSequence rawPassword, String encodedPassword ) {

        return passwordEncoder.matches( rawPassword, encodedPassword );
    }

}
