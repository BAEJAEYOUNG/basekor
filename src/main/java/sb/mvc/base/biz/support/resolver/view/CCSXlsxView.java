/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 24 오후 1:11.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.support.resolver.view;

import org.apache.poi.ss.usermodel.Workbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.view.document.AbstractXlsxView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.Map;

public class CCSXlsxView extends AbstractXlsxView {

    protected final Logger logger = LoggerFactory.getLogger(CCSXlsxView.class);

    @Override
    protected void buildExcelDocument(Map<String, Object> model, Workbook workbook, HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        logger.debug("CCSXlsxView.buildExcelDocument model [{}]", model);

        // Set the headers
        response.setHeader("Content-Type", "application/octet-stream");
        response.setHeader("Content-Disposition", "attachment; filename=MyExcelSpreadsheet.xls");

        // Here is where you will want to put the code to build the Excel spreadsheet

        OutputStream outStream = null;

        try {
            outStream = response.getOutputStream();
            workbook.write(outStream);
            outStream.flush();
        } finally {
            outStream.close();
        }
    }
}
