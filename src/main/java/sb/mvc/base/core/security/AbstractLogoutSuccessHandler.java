/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 24 오후 1:23.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public abstract class AbstractLogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler {

    @Override
    public void onLogoutSuccess( HttpServletRequest request, HttpServletResponse response, Authentication authentication ) throws IOException, ServletException {

        this.process( request, response, authentication );

        super.onLogoutSuccess( request, response, authentication );
    }

    public abstract void process( HttpServletRequest request, HttpServletResponse response, Authentication authentication ) throws IOException, ServletException;
}
