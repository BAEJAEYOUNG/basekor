/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 19 오후 3:14.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.base;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import sb.mvc.base.core.base.BaseServiceImpl;

import java.util.HashMap;
import java.util.Map;

@Service
public abstract class BizBaseServiceImpl<T> extends BaseServiceImpl<T> implements BizBaseService<T> {

    protected final Logger logger = LoggerFactory.getLogger(BizBaseServiceImpl.class);

    public Map<String, Object> selDataPageList(T param) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        result.put("total", getDao().cntDataList(param));
        result.put("rows", getDao().selDataList(param));

        return result;
    }

    public Map<String, Object> selDataPageList(String statementId, T param) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        result.put("total", getDao().cntDataList(statementId.replaceFirst("sel", "cnt"), param));
        result.put("rows", getDao().selDataList(statementId, param));

        return result;
    }
}
