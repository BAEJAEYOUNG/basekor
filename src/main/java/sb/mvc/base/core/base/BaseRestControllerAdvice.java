/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 18 오후 5:21.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.base;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Controller
@RestControllerAdvice
public class BaseRestControllerAdvice {

    protected static final Logger logger = LoggerFactory.getLogger( BaseRestControllerAdvice.class );
}
