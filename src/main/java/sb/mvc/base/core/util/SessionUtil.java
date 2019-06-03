/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 19 오후 1:54.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.util;

import javax.servlet.http.HttpSession;

public class SessionUtil {

    /**
     * 세션 오브젝트
     *
     * @param session
     * @return
     */
    @SuppressWarnings("unchecked")
    public static <T> T getSessionObject(HttpSession session) {

        Object sessionObject = session.getAttribute("sessionUser");
        T object = (T)sessionObject;

        return object;
    }

    /**
     * 세션 체크
     *
     * @param session
     * @return
     */
    public static <T> boolean validateSession(HttpSession session) {

        return SessionUtil.<T>getSessionObject(session) != null;
    }
}