/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 25 오후 2:30.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.login.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class LoginAuthenticationEntryPoint implements AuthenticationEntryPoint {

    protected static final Logger logger = LoggerFactory.getLogger(LoginAuthenticationEntryPoint.class);

    private Boolean redirect = true;

    private String targetUrl;

    public Boolean getRedirect() {

        return redirect;
    }

    public void setRedirect(Boolean redirect) {

        this.redirect = redirect;
    }

    public void setTargetUrl(String targetUrl) {

        this.targetUrl = targetUrl;
    }

    public String getTargetUrl() {

        return targetUrl;
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException exception) throws IOException, ServletException {

//        logger.debug("LoginAuthenticationEntryPoint.commence url [{}] exception [{}]", request.getRequestURL().toString(), exception);

        if (redirect) {
            response.sendRedirect(this.targetUrl);
        } else {
            RequestDispatcher dispatcher = request.getRequestDispatcher(this.targetUrl);
            dispatcher.forward(request, response);
        }
    }
}
