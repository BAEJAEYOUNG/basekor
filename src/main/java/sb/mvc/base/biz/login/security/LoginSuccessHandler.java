/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 3 오후 4:20.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.login.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import sb.mvc.base.biz.login.LoginService;
import sb.mvc.base.core.security.AbstractLoginSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class LoginSuccessHandler extends AbstractLoginSuccessHandler {

    protected static final Logger logger = LoggerFactory.getLogger(LoginSuccessHandler.class);

    @Autowired
    private LoginService loginService;

    @Override
    public void process(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {

        logger.debug("LoginSuccessHandler.process Authentication [{}]", authentication);
        //logger.debug("LoginSuccessHandler.process Authentication getDetails [{}]", authentication.getDetails());
        //logger.debug("LoginSuccessHandler.process Authentication getAuthorities [{}]", authentication.getAuthorities());
        WebAuthenticationDetails details = (WebAuthenticationDetails)authentication.getDetails();
        logger.debug("LoginSuccessHandler sessionId {}", details.getSessionId());
        logger.debug("LoginSuccessHandler address {}", details.getRemoteAddress());

        Map<String, Object> param = new HashMap<String, Object>();
        param.put("mngrId", authentication.getName());
        param.put("sessionId", details.getSessionId());
        param.put("connIp", details.getRemoteAddress());
        param.put("loginSt", "S");

        Map<String, Object> sessionUser = this.loginService.selData("selSessionInfo", param);
        logger.debug("LoginSuccessHandler > sessionUser [{}]", sessionUser);
        request.getSession().setAttribute("sessionUser", sessionUser);

        //insert user login history
        loginService.insData("insLoginHis", param);
        logger.debug("LoginSuccessHandler.process param [{}]", param);

/*
        Map<String, Object> localeUser = this.loginService.selData("selUserInfo", param);
        String localeStr = "";
        if(StringUtils.isNotEmpty((CharSequence) localeUser.get("locale"))) {
            localeStr = StringUtils.replace((String)localeUser.get("locale"), "_", "-");
            Locale locale = Locale.forLanguageTag(localeStr);
            //logger.debug("get locale [{}]", locale);
            //logger.debug("get SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME [{}]", SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME);
            request.getSession().setAttribute(SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME, locale);
            response.setLocale(locale);
        }
*/

    }
}