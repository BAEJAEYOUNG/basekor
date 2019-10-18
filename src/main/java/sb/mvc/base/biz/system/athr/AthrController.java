/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 13 오후 3:52.
 * Copyright (c) 2019. All rights reserved.
 */

/*
 *
 */
package sb.mvc.base.biz.system.athr;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import sb.mvc.base.biz.base.BizBaseController;

import java.util.List;
import java.util.Map;

/**
 *
 * @author Administrator
 */
@Controller
@RequestMapping("system/athr")
@Slf4j
public class AthrController extends BizBaseController {

    public AthrController(AthrService athrService) {
        this.athrService = athrService;
    }

    private AthrService athrService;

    @RequestMapping(value= {""})
    public String view(@RequestParam Map<String, Object> param, Model model) {

        log.debug("AthrController.view param [{}]", param);

        return "system/athr";
    }

    @RequestMapping(value= {"list"})
    public String list(@RequestParam Map<String, Object> param, Model model) {

        log.debug("AthrController.list param [{}]", param);

        try {

            List<Map<String, Object>> resultData = this.athrService.selDataList(param);

            log.debug("AthrController.list resultData [{}]", resultData);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", resultData);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }


        return "json";
    }

    @RequestMapping(value= {"sel"})
    public String sel(@RequestParam Map<String, Object> param, Model model) {

        log.debug("AthrController.sel param [{}]", param);

        try {

            Map<String, Object> resultData = this.athrService.selData(param);

            log.debug("AthrController.sel resultData {}", resultData);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", resultData);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }


        return "json";
    }

    @RequestMapping(value= {"ins"})
    public String ins(@RequestParam Map<String, Object> param, Model model) {

        log.debug("AthrController.ins param [{}]", param);

        try {

            int cntGrp = this.athrService.insData(param);

            log.debug("AthrController.ins [{}]", cntGrp);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", cntGrp);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }

    @RequestMapping(value= {"upd"})
    public String upd(@RequestParam Map<String, Object> param, Model model) {

        log.debug("AthrController.upd param [{}]", param);

        try {

            int cntGrp = this.athrService.updData(param);

            log.debug("AthrController.upd [{}]", cntGrp);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", cntGrp);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }

    @RequestMapping(value= {"del"})
    public String del(@RequestParam Map<String, Object> param, Model model) {

        log.debug("AthrController.del param [{}]", param);

        try {

            int cntMenu = this.athrService.delData(param);

            log.debug("AthrController.del [{}]", cntMenu);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", cntMenu);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }

    @RequestMapping(value= {"selAthrMngrList"})
    public String selAthrMngrList(@RequestParam Map<String, Object> param, Model model) {

        log.debug("AthrController.selAthrMngrList param [{}]", param);

        try {

            List<Map<String, Object>> resultData = this.athrService.selDataList("selAthrMngrList", param);

            log.debug("AthrController.selAthrMngrList resultData [{}]", resultData);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", resultData);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }


        return "json";
    }

    @RequestMapping(value= {"selAthrMngrPopupList"})
    public String selAthrMngrPopupList(@RequestParam Map<String, Object> param, Model model) {

        log.debug("AthrController.selAthrMngrPopupList param [{}]", param);

        try {

            List<Map<String, Object>> resultData = this.athrService.selDataList("selAthrMngrPopupList", param);

            log.debug("AthrController.selAthrMngrPopupList resultData [{}]", resultData);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", resultData);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }


        return "json";
    }

    @RequestMapping(value= {"insAthrMngrList"})
    public String insAthrMngrList(@RequestBody List<Map<String, Object>> param, Model model) {

        log.debug("AthrController.insAthrMngrList param [{}]", param);

        try {

            int resultData = this.athrService.insDataList("insAthrMngrList", param);

            log.debug("AthrController.insAthrMngrList [{}]", resultData);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", resultData);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }

    @RequestMapping(value= {"delAthrMngrList"})
    public String delAthrMngrList(@RequestBody List<Map<String, Object>> param, Model model) {

        log.debug("AthrController.delAthrMngrList param [{}]", param);

        try {

            int resultData = this.athrService.insDataList("delAthrMngrList", param);

            log.debug("AthrController.delAthrMngrList [{}]", resultData);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", resultData);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }

    @RequestMapping(value= {"selAthrMenuList"})
    public String selAthrMenuList(@RequestParam Map<String, Object> param, Model model) {

        log.debug("AthrController.selAthrMenuList param [{}]", param);

        try {

            List<Map<String, Object>> resultData = this.athrService.selDataList("selAthrMenuList", param);

            log.debug("AthrController.selAthrMenuList resultData [{}]", resultData);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", resultData);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }


        return "json";
    }

    @RequestMapping(value= {"selAthrMenuPopupList"})
    public String selAthrMenuPopupList(@RequestParam Map<String, Object> param, Model model) {

        log.debug("AthrController.selAthrMenuPopupList param [{}]", param);

        try {

            List<Map<String, Object>> resultData = this.athrService.selDataList("selAthrMenuPopupList", param);

            log.debug("AthrController.selAthrMenuPopupList resultData [{}]", resultData);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", resultData);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }


        return "json";
    }

    @RequestMapping(value= {"insAthrMenuList"})
    public String insAthrMenuList(@RequestBody List<Map<String, Object>> param, Model model) {

        log.debug("AthrController.insAthrMenuList param [{}]", param);

        try {

            int resultData = this.athrService.insDataList("insAthrMenuList", param);

            log.debug("AthrController.insAthrMenuList [{}]", resultData);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", resultData);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }

    @RequestMapping(value= {"delAthrMenuList"})
    public String delAthrMenuList(@RequestBody List<Map<String, Object>> param, Model model) {

        log.debug("AthrController.delAthrMenuList param [{}]", param);

        try {

            int resultData = this.athrService.insDataList("delAthrMenuList", param);

            log.debug("AthrController.delAthrMenuList [{}]", resultData);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", resultData);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }

    @RequestMapping(value= {"updAthrMenuList"})
    public String updAthrMenuList(@RequestBody List<Map<String, Object>> param, Model model) {

        log.debug("AthrController.updAthrMenuList param [{}]", param);

        try {

            int resultData = this.athrService.updDataList("updAthrMenuList", param);

            log.debug("AthrController.updAthrMenuList [{}]", resultData);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", resultData);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }
}
