/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 24 오전 10:29.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.exception;

public class SvcBaseException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private String messageCode;
    private Object[] messageParams;

    public SvcBaseException(String messageCode, Object... messageParams) {
        super();
        this.messageCode = messageCode;
        this.messageParams = messageParams;
    }

    public SvcBaseException(Exception e, String messageCode, Object... messageParams) {
        super(e);
        this.messageCode = messageCode;
        this.messageParams = messageParams;
    }

    public String getMessageCode() {
        return messageCode;
    }

    public void setMessageCode(String messageCode) {
        this.messageCode = messageCode;
    }

    public Object[] getMessageParams() {
        return messageParams;
    }

    public void setMessageParams(Object[] messageParams) {
        this.messageParams = messageParams;
    }

}
