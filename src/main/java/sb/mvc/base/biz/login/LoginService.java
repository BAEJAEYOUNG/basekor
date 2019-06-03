/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 24 오후 4:27.
 * Copyright (c) 2019. All rights reserved.
 */

/*
 *
 */
package sb.mvc.base.biz.login;

import org.springframework.security.core.userdetails.UserDetailsService;
import sb.mvc.base.biz.base.BizBaseService;

import java.util.Map;

/**
 *
 * @author Administrator
 */
public interface LoginService extends BizBaseService<Map<String, Object>>, UserDetailsService {

    void issuePwdSendMail(Map<String, Object> param);

}
