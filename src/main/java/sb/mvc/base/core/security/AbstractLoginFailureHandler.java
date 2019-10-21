/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 24 오후 1:23.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public abstract class AbstractLoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure( HttpServletRequest request, HttpServletResponse response, AuthenticationException exception ) throws IOException, ServletException {

        this.process( request, response, exception );

        super.onAuthenticationFailure( request, response, exception );
    }

    public abstract void process( HttpServletRequest request, HttpServletResponse response, AuthenticationException exception ) throws IOException, ServletException;
}
