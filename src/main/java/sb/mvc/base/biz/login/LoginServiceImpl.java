/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 3 오후 5:43.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.login;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import sb.mvc.base.biz.base.BizBaseDao;
import sb.mvc.base.biz.base.BizBaseServiceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("loginService")
public class LoginServiceImpl extends BizBaseServiceImpl<Map<String, Object>> implements LoginService {

    protected static final Logger logger = LoggerFactory.getLogger(LoginServiceImpl.class);

    @Autowired
    private LoginDao loginDao;

    @Override
    public BizBaseDao<Map<String, Object>> getDao() {
        return loginDao;
    }

    @Override
    public UserDetails loadUserByUsername(String mngrId) throws UsernameNotFoundException {

        logger.debug("LoginServiceImpl.loadUserByUsername mngrId [{}]", mngrId);

        Map<String, Object> param = new HashMap<String, Object>();
        param.put("mngrId", mngrId);

        Map<String, Object> data = this.loginDao.selData(param);

        logger.debug("LoginServiceImpl.loadUserByUsername data [{}]", data);

        logger.debug("LoginServiceImpl.loadUserByUsername withUsername [{}]", data.get("mngrId"));

        if (ObjectUtils.isEmpty(data)) {
            return User.withUsername((String)data.get("mngrId"))
                       .password("")
                       .authorities(new ArrayList<GrantedAuthority>())
                       .disabled(true)
                       .build();
        }

        String mngrPwd = String.valueOf(data.get("mngrPwd"));

        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

        String[] roles = String.valueOf(data.get("athrCd")).split(",");
        for (String role : roles) {
            authorities.add(new SimpleGrantedAuthority(String.format("ROLE_%s", role)));
        }

        logger.debug("LoginServiceImpl.loadUserByUsername authorities [{}]", authorities);

        UserDetails user = new User((String)data.get("mngrId"), mngrPwd, authorities);

        logger.debug("LoginServiceImpl.loadUserByUsername user [{}]", user);

        return user;
    }

    @Override
    public void issuePwdSendMail(Map<String, Object> param) {

        String initPwd = LoginUtils.temporaryPassword(8);

        param.put("mngrPwd", initPwd);

        logger.debug("issuePwdSendMail() > param [{}]", param);
        /* change password, init_pw */
        this.loginDao.updData("updInitPwd", param);

        /* TO-DO : insert email id,password */
        //this.loginDao.insData("insEmailInitPwd", param);

    }

}
