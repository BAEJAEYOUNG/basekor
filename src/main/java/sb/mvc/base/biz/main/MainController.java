/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 21 오전 11:33.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.main;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import sb.mvc.base.biz.base.BizBaseController;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = {"/main"})
public class MainController extends BizBaseController {

    protected static final Logger logger = LoggerFactory.getLogger(MainController.class);

    public MainController(
            HttpSession session,
            MainService mainService
    ) {
        this.session = session;
        this.mainService = mainService;
    }

    private HttpSession session;
    private MainService mainService;

    @RequestMapping(value={""})
    public String root(@RequestParam Map<String, Object> param, Model model) {
        logger.debug("###### MainController.root param [{}]", param);
        Map<String, Object> sessionUser = (Map<String, Object>) this.session.getAttribute("sessionUser");
        logger.info("sessionUser, {}", sessionUser);
        model.addAttribute("sessionUser", sessionUser);
        return "main/main";
    }

    @RequestMapping(value = {"main"})
    public String view(@RequestParam Map<String, Object> param, Model model) {
        logger.debug("##### MainController.main param [{}]", param);
        Map<String, Object> sessionUser = (Map<String, Object>) this.session.getAttribute("sessionUser");
        model.addAttribute("sessionUser", sessionUser);
        logger.info("sessionUser, {}", sessionUser);
        return "main/main";
    }

    @RequestMapping(value = {"mainMenuList"})
    public String mainMenuList(@RequestParam Map<String, Object> param, Model model) {

        logger.debug("MainController.list param [{}]", param);

        try {

            Map<String, Object> sessionUser = (Map<String, Object>) this.session.getAttribute("sessionUser");
            param.put("mngrId", sessionUser.get("mngrId"));

            logger.debug("MainController.list param [{}]", param);

            List<Map<String, Object>> resultData = this.mainService.selDataList("selMainMenuList", param);

            logger.debug("MainController.list resultData [{}]", resultData);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", resultData);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";

    }

}
