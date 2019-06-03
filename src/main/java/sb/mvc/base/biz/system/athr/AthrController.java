/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 13 오후 3:52.
 * Copyright (c) 2019. All rights reserved.
 */

/*
 *
 */
package sb.mvc.base.biz.system.athr;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class AthrController extends BizBaseController {

    protected final Logger logger = LoggerFactory.getLogger(AthrController.class);

    public AthrController(AthrService athrService) {
        this.athrService = athrService;
    }

    private AthrService athrService;

    @RequestMapping(value= {""})
    public String view(@RequestParam Map<String, Object> param, Model model) {

        logger.debug("AthrController.view param [{}]", param);

        return "system/athr";
    }

    @RequestMapping(value= {"list"})
    public String list(@RequestParam Map<String, Object> param, Model model) {

        logger.debug("AthrController.list param [{}]", param);

        try {

            List<Map<String, Object>> resultData = this.athrService.selDataList(param);

            logger.debug("AthrController.list resultData [{}]", resultData);

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

        logger.debug("AthrController.sel param [{}]", param);

        try {

            Map<String, Object> resultData = this.athrService.selData(param);

            logger.debug("AthrController.sel resultData {}", resultData);

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

        logger.debug("AthrController.ins param [{}]", param);

        try {

            int cntGrp = this.athrService.insData(param);

            logger.debug("AthrController.ins [{}]", cntGrp);

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

        logger.debug("AthrController.upd param [{}]", param);

        try {

            int cntGrp = this.athrService.updData(param);

            logger.debug("AthrController.upd [{}]", cntGrp);

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

        logger.debug("AthrController.del param [{}]", param);

        try {

            int cntMenu = this.athrService.delData(param);

            logger.debug("AthrController.del [{}]", cntMenu);

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

        logger.debug("AthrController.selAthrMngrList param [{}]", param);

        try {

            List<Map<String, Object>> resultData = this.athrService.selDataList("selAthrMngrList", param);

            logger.debug("AthrController.selAthrMngrList resultData [{}]", resultData);

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

        logger.debug("AthrController.selAthrMngrPopupList param [{}]", param);

        try {

            List<Map<String, Object>> resultData = this.athrService.selDataList("selAthrMngrPopupList", param);

            logger.debug("AthrController.selAthrMngrPopupList resultData [{}]", resultData);

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

        logger.debug("AthrController.insAthrMngrList param [{}]", param);

        try {

            int resultData = this.athrService.insDataList("insAthrMngrList", param);

            logger.debug("AthrController.insAthrMngrList [{}]", resultData);

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

        logger.debug("AthrController.delAthrMngrList param [{}]", param);

        try {

            int resultData = this.athrService.insDataList("delAthrMngrList", param);

            logger.debug("AthrController.delAthrMngrList [{}]", resultData);

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

        logger.debug("AthrController.selAthrMenuList param [{}]", param);

        try {

            List<Map<String, Object>> resultData = this.athrService.selDataList("selAthrMenuList", param);

            logger.debug("AthrController.selAthrMenuList resultData [{}]", resultData);

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

        logger.debug("AthrController.selAthrMenuPopupList param [{}]", param);

        try {

            List<Map<String, Object>> resultData = this.athrService.selDataList("selAthrMenuPopupList", param);

            logger.debug("AthrController.selAthrMenuPopupList resultData [{}]", resultData);

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

        logger.debug("AthrController.insAthrMenuList param [{}]", param);

        try {

            int resultData = this.athrService.insDataList("insAthrMenuList", param);

            logger.debug("AthrController.insAthrMenuList [{}]", resultData);

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

        logger.debug("AthrController.delAthrMenuList param [{}]", param);

        try {

            int resultData = this.athrService.insDataList("delAthrMenuList", param);

            logger.debug("AthrController.delAthrMenuList [{}]", resultData);

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

        logger.debug("AthrController.updAthrMenuList param [{}]", param);

        try {

            int resultData = this.athrService.updDataList("updAthrMenuList", param);

            logger.debug("AthrController.updAthrMenuList [{}]", resultData);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", resultData);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }
}
