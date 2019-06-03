/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 29 오후 3:30.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sb.mvc.base.biz.base.BizBaseDao;
import sb.mvc.base.biz.base.BizBaseServiceImpl;

import java.util.Map;

@Service("mainService")
public class MainServiceImpl extends BizBaseServiceImpl<Map<String, Object>> implements MainService {

    @Autowired
    private MainDao mainDao;

    public BizBaseDao<Map<String, Object>> getDao() {

        return this.mainDao;
    }

}
