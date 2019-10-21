/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 3 오전 9:27.
 * Copyright (c) 2019. All rights reserved.
 */

/*
 *
 */
package sb.mvc.base.biz.system.cd;

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
 * @author Administrator
 */
@Controller
@RequestMapping( "system/cd" )
public class CdController extends BizBaseController {

    protected final Logger    logger = LoggerFactory.getLogger( CdController.class );
    private         CdService cdService;

    public CdController( CdService cdService ) {
        this.cdService = cdService;
    }

    @RequestMapping( value = { "" } )
    public String view( @RequestParam Map<String, Object> param, Model model ) {

        logger.debug( "CdController.view param [{}]", param );

        return "system/cd";
    }

    @RequestMapping( value = { "list" } )
    public String list( @RequestParam Map<String, Object> param, Model model ) {

        logger.debug( "CdController.list param [{}]", param );

        try {

            List<Map<String, Object>> resultData = this.cdService.selDataList( param );

            logger.debug( "CdController.list resultData [{}]", resultData );

            model.addAttribute( "resultCd", "00" );
            model.addAttribute( "resultData", resultData );

        } catch( Exception e ) {

            model.addAttribute( "resultCd", "99" );
            model.addAttribute( "resultData", e.getMessage() );

        }


        return "json";
    }

    @RequestMapping( value = { "sel" } )
    public String sel( @RequestParam Map<String, Object> param, Model model ) {

        logger.debug( "CdController.sel param [{}]", param );

        try {

            Map<String, Object> resultData = this.cdService.selData( param );

            logger.debug( "CdController.sel resultData {}", resultData );

            model.addAttribute( "resultCd", "00" );
            model.addAttribute( "resultData", resultData );

        } catch( Exception e ) {

            model.addAttribute( "resultCd", "99" );
            model.addAttribute( "resultData", e.getMessage() );

        }


        return "json";
    }

    @RequestMapping( value = { "ins" } )
    public String ins( @RequestParam Map<String, Object> param, Model model ) {

        logger.debug( "CdController.ins param [{}]", param );

        try {

            int cntCd = this.cdService.insData( param );

            logger.debug( "CdController.ins [{}]", cntCd );

            model.addAttribute( "resultCd", "00" );
            model.addAttribute( "resultData", cntCd );

        } catch( Exception e ) {

            model.addAttribute( "resultCd", "99" );
            model.addAttribute( "resultData", e.getMessage() );

        }

        return "json";
    }

    @RequestMapping( value = { "upd" } )
    public String upd( @RequestParam Map<String, Object> param, Model model ) {

        logger.debug( "CdController.selCdList param [{}]", param );

        try {

            int cntCd = this.cdService.updData( param );

            logger.debug( "CdController.upd [{}]", cntCd );

            model.addAttribute( "resultCd", "00" );
            model.addAttribute( "resultData", cntCd );

        } catch( Exception e ) {

            model.addAttribute( "resultCd", "99" );
            model.addAttribute( "resultData", e.getMessage() );

        }

        return "json";
    }

    @RequestMapping( value = { "del" } )
    public String del( @RequestParam Map<String, Object> param, Model model ) {

        logger.debug( "CdController.del param [{}]", param );

        try {

            int cntCd = this.cdService.delData( param );

            logger.debug( "CdController.del [{}]", cntCd );

            model.addAttribute( "resultCd", "00" );
            model.addAttribute( "resultData", cntCd );

        } catch( Exception e ) {

            model.addAttribute( "resultCd", "99" );
            model.addAttribute( "resultData", e.getMessage() );

        }

        return "json";
    }


    @RequestMapping( value = { "comboList" } )
    public String comboList( @RequestParam Map<String, Object> param, Model model ) {

        logger.debug( "CdController.comboList param [{}]", param );

        try {

            List<Map<String, Object>> resultData = this.cdService.selDataList( "selComboList", param );

            logger.debug( "CdController.comboList resultData [{}]", resultData );

            model.addAttribute( "resultCd", "00" );
            model.addAttribute( "resultData", resultData );

        } catch( Exception e ) {

            model.addAttribute( "resultCd", "99" );
            model.addAttribute( "resultData", e.getMessage() );

        }

        return "json";
    }

}
