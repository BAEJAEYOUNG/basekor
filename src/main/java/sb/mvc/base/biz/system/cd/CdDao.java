/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 3 오전 9:26.
 * Copyright (c) 2019. All rights reserved.
 */

/*
 *
 */
package sb.mvc.base.biz.system.cd;

import org.springframework.stereotype.Repository;
import sb.mvc.base.biz.base.BizBaseDao;

import java.util.Map;

/**
 * @author Administrator
 */
@Repository
public class CdDao extends BizBaseDao<Map<String, Object>> {

    @Override
    protected String getNameSpace() {

        return "NS_Cd";
    }

    @Override
    protected String getMapperId() {

        return "Cd";
    }

}
