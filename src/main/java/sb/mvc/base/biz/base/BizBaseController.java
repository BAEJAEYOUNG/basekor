
/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 25 오전 9:39.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.base;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import sb.mvc.base.core.base.BaseController;

/**
 *
 * @author Administrator
 */
@Controller
public abstract class BizBaseController extends BaseController {

    protected final Logger logger = LoggerFactory.getLogger(BizBaseController.class);

}
