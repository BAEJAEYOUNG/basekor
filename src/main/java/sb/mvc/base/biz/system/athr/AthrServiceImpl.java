/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 13 오후 3:52.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.system.athr;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import sb.mvc.base.biz.base.BizBaseDao;
import sb.mvc.base.biz.base.BizBaseServiceImpl;

import java.util.Map;

import javax.transaction.Transactional;

@Slf4j
@AllArgsConstructor
@Service( "athrService" )
public class AthrServiceImpl extends BizBaseServiceImpl<Map<String, Object>> implements AthrService {

    private AthrDao athrDao;

    public BizBaseDao<Map<String, Object>> getDao() {
        return this.athrDao;
    }

    @Override
    @Transactional
    public int delDataAll(Map<String, Object> param) {
        int cntDelAthr = this.athrDao.delData(param);
        int cntDelAthrMngr = this.athrDao.delData("delAthrMngrInAthr", param);
        int cntDelAthrMenu = this.athrDao.delData("delAthrMenuInAthr", param);
        log.debug("cntDelAthr={}, cntDelAthrMngr={}, cntDelAthrMenu={}", cntDelAthr, cntDelAthrMngr, cntDelAthrMenu);
        return cntDelAthr;
    }

}
