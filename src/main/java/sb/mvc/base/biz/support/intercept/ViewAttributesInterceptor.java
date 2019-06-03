/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 29 오전 9:22.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.support.intercept;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import sb.mvc.base.config.ConfigProperty;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class ViewAttributesInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    ConfigProperty configProperty;

    /**
     * 컨트롤러(즉 RequestMapping이 선언된 메서드 진입) 실행 직전에 동작.
     * 반환 값이 true일 경우 정상적으로 진행이 되고, false일 경우 실행이 멈춥니다.(컨트롤러 진입을 하지 않음)
     * 전달인자 중 Object handler는 핸들러 매핑이 찾은 컨트롤러 클래스 객체입니다.
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        log.debug("=============== ViewAttributesInterceptor.preHandle() =================");
        return super.preHandle(request, response, handler);
    }

    /**
     * 컨트롤러 진입 후 view가 랜더링 되기 전 수행이 됩니다.
     * 전달인자의 modelAndView을 통해 화면 단에 들어가는 데이터 등의 조작이 가능합니다.
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
//        log.debug("=============== ViewAttributesInterceptor.postHandle() =================");
        if(modelAndView != null) {
            modelAndView.addObject("contextPath", request.getContextPath() );
            modelAndView.addObject("incPath", configProperty.getIncPath());
            modelAndView.addObject("projectTitle", configProperty.getProjectTitle());
        }
        super.postHandle(request, response, handler, modelAndView);
    }

    /**
     * 컨트롤러 진입 후 view가 정상적으로 랜더링 된 후 제일 마지막에 실행이 되는 메서드입니다.
     * @param request
     * @param response
     * @param handler
     * @param ex
     * @throws Exception
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
//        log.debug("=============== ViewAttributesInterceptor.afterCompletion() =================");
        super.afterCompletion(request, response, handler, ex);
    }
}
