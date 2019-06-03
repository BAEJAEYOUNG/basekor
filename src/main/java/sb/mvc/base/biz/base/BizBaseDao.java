
/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 22 오후 3:24.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.base;

import org.springframework.stereotype.Repository;
import sb.mvc.base.core.base.BaseDao;

/**
 * @author Administrator
 */
@Repository
public abstract class BizBaseDao<T> extends BaseDao<T> {

    public int cntDataList(T param) {
        return getSqlSession().selectOne(this.getStatementId("%s.cnt%sList"), param);
    }

    public int cntDataList(String statementId, T param) {
        return getSqlSession().selectOne(super.getStatementId("%s.%s", statementId), param);
    }
}
