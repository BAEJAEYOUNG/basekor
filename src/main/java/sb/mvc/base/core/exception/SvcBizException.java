/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 24 오전 10:29.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.exception;

public class SvcBizException extends SvcBaseException {

    public SvcBizException(String messageCode, Object... messageParams) {
        super(messageCode, messageParams);
    }

    public SvcBizException(Exception e, String messageCode, Object... messageParams) {
        super(e, messageCode, messageParams);
    }

}
