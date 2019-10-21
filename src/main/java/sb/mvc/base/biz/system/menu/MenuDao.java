/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 19 오후 3:15.
 * Copyright (c) 2019. All rights reserved.
 */

/*
 *
 */
package sb.mvc.base.biz.system.menu;

import org.springframework.stereotype.Repository;
import sb.mvc.base.biz.base.BizBaseDao;

import java.util.Map;

/**
 * @author Administrator
 */
@Repository
public class MenuDao extends BizBaseDao<Map<String, Object>> {

    @Override
    protected String getNameSpace() {
        return "NS_Menu";
    }

    @Override
    protected String getMapperId() {

        return "Menu";
    }

}
