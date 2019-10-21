/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 3 오전 9:26.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.system.cd;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import sb.mvc.base.biz.base.BizBaseDao;
import sb.mvc.base.biz.base.BizBaseServiceImpl;

import java.util.Map;

@AllArgsConstructor
@Service( "cdService" )
public class CdServiceImpl extends BizBaseServiceImpl<Map<String, Object>> implements CdService {

    private CdDao cdDao;

    public BizBaseDao<Map<String, Object>> getDao() {
        return this.cdDao;
    }
}
