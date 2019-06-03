/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 7 오후 3:29.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.system.mngr;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = {"/system/mngr"})
public class MngrController {

    protected static final Logger logger = LoggerFactory.getLogger(MngrController.class);

    public MngrController(MngrService mngrService) {
        this.mngrService = mngrService;
    }

    private MngrService mngrService;

    @RequestMapping(value={""})
    public String Mngr() {
        return "/system/mngr";
    }

    @RequestMapping(value= {"selKey"})
    public String sel(@RequestParam Map<String, Object> param, Model model) {

        logger.debug("MngrController.sel param [{}]", param);

        try {

            String resultData = (String)this.mngrService.selValue("selKey", param);

            logger.debug("MngrController.sel resultData {}", resultData);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", resultData);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }


        return "json";
    }

    @RequestMapping(value= {"list"})
    public String list(@RequestParam Map<String, Object> param, Model model) {

        logger.debug("MngrController.list param [{}]", param);

        try {

            List<Map<String, Object>> resultData = this.mngrService.selDataList(param);

            logger.debug("MngrController.list resultData [{}]", resultData);

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

        logger.debug("MngrController.ins param [{}]", param);

        try {

            int cntCd = this.mngrService.insData(param);

            logger.debug("MngrController.ins [{}]", cntCd);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", cntCd);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }

    @RequestMapping(value= {"upd"})
    public String upd(@RequestParam Map<String, Object> param, Model model) {

        logger.debug("MngrController.selCdList param [{}]", param);

        try {

            int cntCd = this.mngrService.updData(param);

            logger.debug("MngrController.upd [{}]", cntCd);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", cntCd);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }

    @RequestMapping(value= {"del"})
    public String del(@RequestParam Map<String, Object> param, Model model) {

        logger.debug("MngrController.del param [{}]", param);

        try {

            int cntCd = this.mngrService.delData(param);

            logger.debug("MngrController.del [{}]", cntCd);

            model.addAttribute("resultCd", "00");
            model.addAttribute("resultData", cntCd);

        } catch (Exception e) {

            model.addAttribute("resultCd", "99");
            model.addAttribute("resultData", e.getMessage());

        }

        return "json";
    }

}
