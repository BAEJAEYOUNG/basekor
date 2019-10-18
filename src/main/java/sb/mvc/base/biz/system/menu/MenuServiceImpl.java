/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 22 오후 1:28.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.system.menu;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import sb.mvc.base.biz.base.BizBaseDao;
import sb.mvc.base.biz.base.BizBaseServiceImpl;

import java.util.Map;

@AllArgsConstructor
@Service("menuService")
public class MenuServiceImpl extends BizBaseServiceImpl<Map<String, Object>> implements MenuService {

    private MenuDao menuDao;

    public BizBaseDao<Map<String, Object>> getDao() {
        return this.menuDao;
    }
}
