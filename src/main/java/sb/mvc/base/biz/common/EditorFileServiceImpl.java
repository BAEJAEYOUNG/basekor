/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 7 오후 3:31.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.common;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import sb.mvc.base.biz.base.BizBaseDao;
import sb.mvc.base.biz.base.BizBaseServiceImpl;

import java.util.Map;

@AllArgsConstructor
@Service( "editorFileService" )
public class EditorFileServiceImpl extends BizBaseServiceImpl<Map<String, Object>> implements EditorFileService {

    private EditorFileDao editorFileDao;

    public BizBaseDao<Map<String, Object>> getDao() {
        return this.editorFileDao;
    }
}
