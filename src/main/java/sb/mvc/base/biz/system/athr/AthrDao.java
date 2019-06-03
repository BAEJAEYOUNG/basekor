/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 13 오후 3:51.
 * Copyright (c) 2019. All rights reserved.
 */

/*
 *
 */
package sb.mvc.base.biz.system.athr;

import org.springframework.stereotype.Repository;
import sb.mvc.base.biz.base.BizBaseDao;

import java.util.Map;

/**
 *
 * @author Administrator
 */
@Repository
public class AthrDao extends BizBaseDao<Map<String, Object>> {

    @Override
    protected String getNameSpace() {

        return "NS_Athr";
    }

    @Override
    protected String getMapperId() {

        return "Athr";
    }

}
