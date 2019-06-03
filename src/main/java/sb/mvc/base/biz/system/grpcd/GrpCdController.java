/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 3 오전 9:28.
 * Copyright (c) 2019. All rights reserved.
 */

/*
 *
 */
package sb.mvc.base.biz.system.grpcd;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
@RequestMapping("system/grpCd")
public class GrpCdController extends BizBaseController {

    protected final Logger logger = LoggerFactory.getLogger(GrpCdController.class);

    public GrpCdController(GrpCdService grpCdService) {
        this.grpCdService = grpCdService;
    }

    private GrpCdService grpCdService;

    @RequestMapping(value= {"list"})
    public String list(@RequestParam Map<String, Object> param, Model model) {

        logger.debug("GrpCdController.list param [{}]", param);

        try {

            List<Map<String, Object>> resultData = this.grpCdService.selDataList(param);

            logger.debug("GrpCdController.list resultData [{}]", resultData);

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

        logger.debug("GrpCdController.sel param [{}]", param);

        try {

            Map<String, Object> resultData = this.grpCdService.selData(param);

            logger.debug("GrpCdController.sel resultData {}", resultData);

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

        logger.debug("GrpCdController.ins param [{}]", param);

        try {

            int cntGrp = this.grpCdService.insData(param);

            logger.debug("GrpCdController.ins [{}]", cntGrp);

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

        logger.debug("GrpCdController.selCdList param [{}]", param);

        try {

            int cntGrp = this.grpCdService.updData(param);

            logger.debug("GrpCdController.upd [{}]", cntGrp);

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

        logger.debug("GrpCdController.del param [{}]", param);

        try {

            int cntGrp = this.grpCdService.delData(param);
            // 해당 그룹 하위 코드 모두 삭제
            int cntCd = this.grpCdService.delData("delCdInGrpCd", param);

            logger.debug("GrpCdController.del [{}]", "grp:" + cntGrp + ",cd:" + cntCd);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", cntGrp + "," + cntCd);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }



}
