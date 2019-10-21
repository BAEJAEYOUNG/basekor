/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 21 오전 11:10.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.login.security;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import sb.mvc.base.biz.login.LoginService;
import sb.mvc.base.core.security.AbstractLoginFailureHandler;
import sb.mvc.base.core.util.MessageUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class LoginFailureHandler extends AbstractLoginFailureHandler {

    protected static final Logger logger = LoggerFactory.getLogger(LoginFailureHandler.class);

    @Autowired
    private LoginService loginService;

    @Autowired
    private MessageUtil messageUtil;

    @Override
    public void process(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception)
            throws IOException, ServletException {

        logger.debug("LoginFailureHandler.process request [{}]", request);

        Map<String, Object> param = new HashMap<String, Object>();
        param.put("mngrId", request.getParameter("mngrId"));

        Map<String, Object> mapUser = loginService.selData("selLogin", param);

        logger.debug("LoginFailureHandler userId {}", request.getParameter("mngrId"));
        logger.debug("LoginFailureHandler sessionId {}", request.getRequestedSessionId());
        logger.debug("LoginFailureHandler address {}", request.getRemoteAddr());

        param.put("sessionId", request.getRequestedSessionId());
        param.put("connIp", request.getRemoteAddr());
        param.put("loginSt", "F");

        if(mapUser == null) {
            param.put("loginMsg", "User id does not exist.");
        } else if( !mapUser.get("mngrPwd").equals(request.getParameter("mngrPwd")) ) {
            param.put("loginMsg", "Passwords do not match.");
        } else {
            param.put( "loginMsg", exception.getCause().toString() );
        }

        loginService.insData("insLoginHis", param);

        String errorMsg = null;

        if(exception instanceof BadCredentialsException) {
            errorMsg = messageUtil.getMessage("security-error.BadCredentials");
        } else if(exception instanceof InternalAuthenticationServiceException) {
            errorMsg = messageUtil.getMessage("security-error.BadCredentials");
        } else if(exception instanceof DisabledException) {
            errorMsg = messageUtil.getMessage("security-error.Disaled");
        } else if(exception instanceof CredentialsExpiredException) {
            errorMsg = messageUtil.getMessage("security-error.CredentialsExpired");
        }

        log.debug("LoginFailureHandler errormsg [{}]", errorMsg);

        request.setAttribute("errorMsg", errorMsg);
        request.getRequestDispatcher("/login?fail=true").forward(request, response);
    }
}
