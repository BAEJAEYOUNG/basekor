/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 19 오후 3:14.
 * Copyright (c) 2019. All rights reserved.
 */

/*
 *
 */
package sb.mvc.base.biz.base;

import org.springframework.stereotype.Service;
import sb.mvc.base.core.base.BaseService;

/**
 *
 * @author Administrator
 */
@Service
public interface BizBaseService<T> extends BaseService<T> {
    BizBaseDao<T> getDao();
}
