/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 25 오전 9:37.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.base;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Controller
public abstract class BaseController {

    protected static final Logger logger = LoggerFactory.getLogger( BaseController.class );

    @PostConstruct
    public void initialize() {

    }

    @PreDestroy
    public void destroy() {

    }
}
