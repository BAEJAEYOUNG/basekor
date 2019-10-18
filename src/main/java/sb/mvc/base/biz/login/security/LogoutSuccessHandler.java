/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 24 오후 4:33.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.login.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import sb.mvc.base.biz.login.LoginService;
import sb.mvc.base.core.security.AbstractLogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class LogoutSuccessHandler extends AbstractLogoutSuccessHandler {

    protected static final Logger logger = LoggerFactory.getLogger(LogoutSuccessHandler.class);

    @Autowired
    private LoginService loginService;

    @Override
    public void process(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {

        logger.debug("LogoutSuccessHandler.process Authentication [{}]", authentication);
        User user = (User)authentication.getPrincipal();

        WebAuthenticationDetails details = (WebAuthenticationDetails)authentication.getDetails();
        logger.debug("LogoutSuccessHandler sessionId {}", details.getSessionId());

        Map<String, Object> param = new HashMap<String, Object>();
        param.put("mngrId", user.getUsername());
        param.put("sessionId", details.getSessionId());
        logger.debug("param [{}]", param);

        //기존 정보에 update
        loginService.updData("insLogoutHis", param);
    }
}
