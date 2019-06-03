/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 3 오후 4:27.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.login.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class LoginAccessDeniedHandler implements AccessDeniedHandler {

    protected static final Logger logger = LoggerFactory.getLogger(LoginAccessDeniedHandler.class);

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
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException, ServletException {

        logger.debug("LoginAccessDeniedHandler.handle url [{}]", request.getRequestURL().toString());
        logger.debug("LoginAccessDeniedHandler.handle accessDeniedException [{}]", accessDeniedException.getMessage());

        if (redirect) {
            response.sendRedirect(this.targetUrl);
        } else {
            RequestDispatcher dispatcher = request.getRequestDispatcher(this.targetUrl);
            dispatcher.forward(request, response);
        }
    }
}
