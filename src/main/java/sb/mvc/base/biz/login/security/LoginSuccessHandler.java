/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 3 오후 4:20.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.login.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

import lombok.extern.slf4j.Slf4j;
import sb.mvc.base.biz.login.LoginService;
import sb.mvc.base.core.security.AbstractLoginSuccessHandler;

@Slf4j
public class LoginSuccessHandler extends AbstractLoginSuccessHandler {

    @Autowired
    private LoginService loginService;

    @Override
    public void process(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {

        log.debug("LoginSuccessHandler.process Authentication [{}]", authentication);
        //log.debug("LoginSuccessHandler.process Authentication getDetails [{}]", authentication.getDetails());
        //log.debug("LoginSuccessHandler.process Authentication getAuthorities [{}]", authentication.getAuthorities());
        WebAuthenticationDetails details = (WebAuthenticationDetails)authentication.getDetails();
        log.debug("LoginSuccessHandler sessionId {}", details.getSessionId());
        log.debug("LoginSuccessHandler address {}", details.getRemoteAddress());

        Map<String, Object> param = new HashMap<String, Object>();
        param.put("mngrId", authentication.getName());
        param.put("sessionId", details.getSessionId());
        param.put("connIp", details.getRemoteAddress());
        param.put("loginSt", "S");

        Map<String, Object> sessionUser = this.loginService.selData("selSessionInfo", param);
        log.debug("LoginSuccessHandler > sessionUser [{}]", sessionUser);
        request.getSession().setAttribute("sessionUser", sessionUser);

        //insert user login history
        loginService.insData("insLoginHis", param);
        log.debug("LoginSuccessHandler.process param [{}]", param);

/*
        Map<String, Object> localeUser = this.loginService.selData("selUserInfo", param);
        String localeStr = "";
        if(StringUtils.isNotEmpty((CharSequence) localeUser.get("locale"))) {
            localeStr = StringUtils.replace((String)localeUser.get("locale"), "_", "-");
            Locale locale = Locale.forLanguageTag(localeStr);
            //log.debug("get locale [{}]", locale);
            //log.debug("get SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME [{}]", SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME);
            request.getSession().setAttribute(SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME, locale);
            response.setLocale(locale);
        }
*/

    }
}