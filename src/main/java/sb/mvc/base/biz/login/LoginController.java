/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 21 오전 11:36.
 * Copyright (c) 2019. All rights reserved.
 */

/*
 *
 */
package sb.mvc.base.biz.login;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import sb.mvc.base.biz.base.BizBaseController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 *
 * @author Administrator
 */
@Controller
@RequestMapping("login")
public class LoginController extends BizBaseController {

    protected static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private LoginService loginService;

    @RequestMapping(value= {""})
    public String view(@RequestParam Map<String, Object> param, Model model,
                       HttpServletRequest request) {

        logger.debug("LoginController.view param [{}]", param);

        String ajaxHeader = request.getHeader("X-Requested-With");
        boolean isAjaxCall = new Boolean(request.getHeader("ajax"));

        logger.debug("=====> LoginController.view ajaxHeader [{}]", ajaxHeader);
        logger.debug("=====> LoginController.view isAjaxCall [{}]", isAjaxCall);

        if ("XMLHttpRequest".equals(ajaxHeader)) {
            if (isAjaxCall) {
                model.addAttribute("resultCd", "98");
                return "json";
            } else {
                return "index";
            }
        } else {
            return "login/login";
        }
    }

    @RequestMapping(value= {"success"})
    public String success(@RequestParam Map<String, Object> param, Model model) {

        logger.debug("LoginController.success param [{}]", param);

        return "login/success";
    }

    @RequestMapping(value= {"fail"})
    public String fail(@RequestParam Map<String, Object> param, Model model) {

        logger.debug("LoginController.fail param [{}]", param);

        return "login/fail";
    }



    @RequestMapping(value= {"initPwd"})
    public String initPwd(@RequestParam Map<String, Object> param, Model model) {

        logger.debug("LoginController.view param [{}]", param);

        return "/login/initPwd";
    }


    @RequestMapping(value= {"initPwdProc"})
    public String initPwdProc(@RequestParam Map<String, Object> param, Model model) {

        logger.debug("LoginController.initPwdProc param [{}]", param);

        try {

            // 아이디 , 이메일로 사용자 조회
            Map<String, Object> mapUser = this.loginService.selData("selInitPwdUserOne", param);

            logger.debug("initPwdProc() > mapUser [{}]", mapUser);

            if(mapUser == null) {
                /* ID 미존재 */
                model.addAttribute("resultCd", "91");
                model.addAttribute("resultData", "");

            } else {
                /* EMAIL 미존재 */
                String sEmail = (String)mapUser.get("email");
                if(sEmail.length() == 0) {
                    model.addAttribute("resultCd", "91");
                    model.addAttribute("resultData", "");
                } else {
                    if(sEmail.equals(param.get("email"))) {
                        // 해당 사용자가 존재하므로 비밀번호 발급 및 이메일 전송 처리를 하자
                        this.loginService.issuePwdSendMail(param);

                        model.addAttribute("resultCd", "00");
                        model.addAttribute("resultData", "");
                    } else {
                        model.addAttribute("resultCd", "91");
                        model.addAttribute("resultData", "");
                    }
                }

            }

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }

}
