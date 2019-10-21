/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 24 오후 1:11.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.support.resolver.view;

import org.apache.poi.ss.usermodel.Workbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.view.document.AbstractXlsView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;

public class CCSXlsView extends AbstractXlsView {

    protected final Logger logger = LoggerFactory.getLogger( CCSXlsView.class );

    @Override
    protected void buildExcelDocument( Map<String, Object> model, Workbook workbook, HttpServletRequest request, HttpServletResponse response ) throws Exception {

        logger.debug( "CCSXlsView.buildExcelDocument model [{}]", model );

        // Set the headers
        response.setHeader( "Content-Type", "application/octet-stream" );
        response.setHeader( "Content-Disposition", "attachment; filename=MyExcelSpreadsheet.xls" );

        // Here is where you will want to put the code to build the Excel spreadsheet

        try( OutputStream out = response.getOutputStream() ) {
            workbook.write( out );
            out.flush();
        } catch( IOException e ) {
            e.printStackTrace();
        }
    }

}
