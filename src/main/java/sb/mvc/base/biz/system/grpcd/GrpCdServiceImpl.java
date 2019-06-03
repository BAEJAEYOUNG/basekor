/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 3 오전 9:28.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.system.grpcd;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import sb.mvc.base.biz.base.BizBaseDao;
import sb.mvc.base.biz.base.BizBaseServiceImpl;

import java.util.Map;

@Service("grpCdService")
public class GrpCdServiceImpl extends BizBaseServiceImpl<Map<String, Object>> implements GrpCdService {

    protected final Logger logger = LoggerFactory.getLogger(GrpCdServiceImpl.class);

    public GrpCdServiceImpl(GrpCdDao grpCdDao) {
        this.grpCdDao = grpCdDao;
    }

    private GrpCdDao grpCdDao;

    public BizBaseDao<Map<String, Object>> getDao() {
        return this.grpCdDao;
    }
}
