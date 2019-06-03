/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 24 오후 4:28.
 * Copyright (c) 2019. All rights reserved.
 */

/*
 *
 */
package sb.mvc.base.biz.login;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;
import sb.mvc.base.biz.base.BizBaseDao;

import java.util.Map;

/**
 *
 * @author Administrator
 */
@Repository
public class LoginDao extends BizBaseDao<Map<String, Object>> {

    @Override
    protected String getNameSpace() {

        return "NS_Login";
    }

    @Override
    protected String getMapperId() {

        return "Login";
    }

}
