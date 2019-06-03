/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 13 오후 3:52.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.system.athr;

import org.springframework.stereotype.Service;
import sb.mvc.base.biz.base.BizBaseDao;
import sb.mvc.base.biz.base.BizBaseServiceImpl;

import java.util.Map;

@Service("athrService")
public class AthrServiceImpl extends BizBaseServiceImpl<Map<String, Object>> implements AthrService {

    public AthrServiceImpl(AthrDao athrDao) {
        this.athrDao = athrDao;
    }

    private AthrDao athrDao;

    public BizBaseDao<Map<String, Object>> getDao() {
        return this.athrDao;
    }

}
