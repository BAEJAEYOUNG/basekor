/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 9 오후 1:15.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.system.menu;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequestMapping(value = {"/system/menu"})
public class MenuController {

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    private MenuService menuService;

    @RequestMapping(value = {""})
    public String Menu() {
        return "/system/menu";
    }

    @RequestMapping(value = {"selKey"})
    public String sel(@RequestParam Map<String, Object> param, Model model) {

        log.debug("MenuController.sel param [{}]", param);

        try {

            String resultData = (String) this.menuService.selValue("selKey", param);

            log.debug("MenuController.sel resultData {}", resultData);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", resultData);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }


        return "json";
    }

    @RequestMapping(value = {"list"})
    public String list(@RequestParam Map<String, Object> param, Model model) {

        log.debug("MenuController.list param [{}]", param);

        try {

            List<Map<String, Object>> resultData = this.menuService.selDataList(param);

            log.debug("MenuController.list resultData [{}]", resultData);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", resultData);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }

    @RequestMapping(value = {"ins"})
    public String ins(@RequestParam Map<String, Object> param, Model model) {

        log.debug("MenuController.ins param [{}]", param);

        try {

            int cntCd = this.menuService.insData(param);

            log.debug("MenuController.ins [{}]", cntCd);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", cntCd);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }

    @RequestMapping(value = {"upd"})
    public String upd(@RequestParam Map<String, Object> param, Model model) {

        log.debug("MenuController.selCdList param [{}]", param);

        try {

            int cntCd = this.menuService.updData(param);

            log.debug("MenuController.upd [{}]", cntCd);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", cntCd);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }

    @RequestMapping(value = {"del"})
    public String del(@RequestParam Map<String, Object> param, Model model) {

        log.debug("MenuController.del param [{}]", param);

        try {

            int cntCd = this.menuService.delData(param);

            log.debug("MenuController.del [{}]", cntCd);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", cntCd);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }

}
