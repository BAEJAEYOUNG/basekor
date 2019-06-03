/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 3 오전 9:26.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.system.cd;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import sb.mvc.base.biz.base.BizBaseDao;
import sb.mvc.base.biz.base.BizBaseServiceImpl;

import java.util.Map;

@Service("cdService")
public class CdServiceImpl extends BizBaseServiceImpl<Map<String, Object>> implements CdService {

    protected final Logger logger = LoggerFactory.getLogger(CdServiceImpl.class);

    public CdServiceImpl(CdDao cdDao) {
        this.cdDao = cdDao;
    }

    private CdDao cdDao;

    public BizBaseDao<Map<String, Object>> getDao() {
        return this.cdDao;
    }
}
