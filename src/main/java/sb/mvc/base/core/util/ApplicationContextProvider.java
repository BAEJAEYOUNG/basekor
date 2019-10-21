/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 19 오후 1:54.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;

/**
 * @author Administrator
 */
public class ApplicationContextProvider {

    private static ApplicationContext ctx = null;

    public static ApplicationContext getApplicationContext() {

        return ctx;
    }

    public void setApplicationContext( ApplicationContext ctx ) throws BeansException {

        ApplicationContextProvider.ctx = ctx;
    }
}
