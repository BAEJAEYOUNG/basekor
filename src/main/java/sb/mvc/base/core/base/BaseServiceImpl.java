/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 24 오전 10:45.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.base;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import sb.mvc.base.core.exception.SvcBizException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public abstract class BaseServiceImpl<T> implements BaseService<T> {

    protected static final Logger logger = LoggerFactory.getLogger(BaseServiceImpl.class);


    @Override
    public Map<String, Object> selDataPageList(T param) {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            result.put("total", getDao().cntDataList(param));
            result.put("rows", getDao().selDataList(param));
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0001", e.getMessage());
        }
        return result;
    }

    @Override
    public Map<String, Object> selDataPageList(String statementId, T param) {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            result.put("total", getDao().cntDataList(statementId, param));
            result.put("rows", getDao().selDataList(statementId, param));
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0001", e.getMessage());
        }
        return result;
    }

    @Override
    public <E> List<E> selDataList(T param) {
        List<E> list = new ArrayList<E>();
        try {
            list = getDao().selDataList(param);
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0001", e.getMessage());
        }
        return list;
    }

    @Override
    public <E> List<E> selDataList(String statementId, T param) {
        List<E> list = new ArrayList<E>();
        try {
            list = getDao().selDataList(statementId, param);
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0001", e.getMessage());
        }
        return list;
    }

    @Override
    public T selData(T param) {
        T t = null;
        try {
            t = getDao().selData(param);
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0001", e.getMessage());
        }
        return t;
    }

    @Override
    public T selData(String statementId, T param) {
        T t = null;
        try {
            t = getDao().selData(statementId, param);
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0001", e.getMessage());
        }
        return t;
    }

    @Override
    public Object selValue(T param) {
        Object object = null;
        try {
            object = getDao().selData(param);
        } catch (Exception e) {
//            throw new KSIDBizException(e, "ER-SVC-C0001", getDao().getStatementId("%s.sel%s"));
            throw new SvcBizException(e, "ER-SVC-C0001", e.getMessage());
        }
        return object;
    }

    @Override
    public Object selValue(String statementId, T param) {
        Object object = null;
        try {
            object = getDao().selData(statementId, param);
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0001", e.getMessage());
        }
        return object;
    }

    @Override
    public int insData(T param) {
        int i = 0;
        try {
            i = getDao().insData(param);
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0002", e.getMessage());
        }
        return i;
    }

    @Override
    public int insData(String statementId, T param) {
        int i = 0;
        try {
            i = getDao().insData(statementId, param);
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0002", e.getMessage());
        }
        return i;
    }

    @Override
    public int updData(T param) {
        int i = 0;
        try {
            i = getDao().updData(param);
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0003", e.getMessage());
        }
        return i;
    }

    @Override
    public int updData(String statementId, T param) {
        int i = 0;
        try {
            i = getDao().updData(statementId, param);
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0003", e.getMessage());
        }
        return i;
    }

    @Override
    public int delData(T param) {
        int i = 0;
        try {
            i = getDao().delData(param);
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0004", e.getMessage());
        }
        return i;
    }

    @Override
    public int delData(String statementId, T param) {
        int i = 0;
        try {
            i = getDao().delData(statementId, param);
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0004", e.getMessage());
        }
        return i;
    }

    @Override
    public int insDataList(List<T> params) {
        int i = 0;
        try {
            for (T param : params) {
                i += getDao().insData(param);
            }
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0005", e.getMessage());
        }
        return i;
    }

    @Override
    public int insDataList(String statementId, List<T> params) {
        int i = 0;
        try {
            for (T param : params) {
                i += getDao().insData(statementId, param);
            }
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0005", e.getMessage());
        }
        return i;
    }

    @Override
    public int updDataList(List<T> params) {
        int i = 0;
        try {
            for (T param : params) {
                i += getDao().updData(param);
            }
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0006", e.getMessage());
        }
        return i;
    }

    @Override
    public int updDataList(String statementId, List<T> params) {
        int i = 0;
        try {
            for (T param : params) {
                i += getDao().updData(statementId, param);
            }
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0006", e.getMessage());
        }
        return i;
    }

    @Override
    public int delDataList(List<T> params) {
        int i = 0;
        try {
            for (T param : params) {
                i += getDao().delData(param);
            }
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0007", e.getMessage());
        }
        return i;
    }

    @Override
    public int delDataList(String statementId, List<T> params) {
        int i = 0;
        try {
            for (T param : params) {
                i += getDao().delData(statementId, param);
            }
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0007", e.getMessage());
        }
        return i;
    }

    @Override
    @SuppressWarnings({ "unchecked" })
    public Map<DmlType, Integer> saveDataList(List<T> params) {
        Map<DmlType, Integer> result = new HashMap<DmlType, Integer>();
        result.put(DmlType.I, 0);
        result.put(DmlType.U, 0);
        result.put(DmlType.D, 0);
        try {
            for (T param : params) {
                if (param instanceof Map && ((Map<String, Object>)param).containsKey("dmlType")) {
                    String dmlType = (String)((Map<String, Object>)param).get("dmlType");
                    switch(DmlType.valueOf(dmlType)) {
                        case I :
                            result.put(DmlType.I, result.get(DmlType.I) + getDao().insData(param));
                            break;
                        case U :
                            result.put(DmlType.U, result.get(DmlType.U) + getDao().updData(param));
                            break;
                        case D :
                            result.put(DmlType.D, result.get(DmlType.D) + getDao().delData(param));
                            break;
                        default :
                            break;
                    }
                }
            }
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0008", "SAVE");
        }
        return result;
    }

    @Override
    public Map<DmlType, Integer> saveDataList(Map<DmlType, String> statementId, List<T> params) {
        Map<DmlType, Integer> result = new HashMap<DmlType, Integer>();
        result.put(DmlType.I, 0);
        result.put(DmlType.U, 0);
        result.put(DmlType.D, 0);
        try {
            for (T param : params) {
                if (param instanceof Map && ((Map<String, Object>)param).containsKey("dmlType")) {
                    String dmlType = (String)((Map<String, Object>)param).get("dmlType");

                    switch(DmlType.valueOf(dmlType)) {
                        case I :
                            result.put(DmlType.I, result.get(DmlType.I) + getDao().insData(statementId.get(DmlType.I), param));
                            break;
                        case U :
                            result.put(DmlType.U, result.get(DmlType.U) + getDao().updData(statementId.get(DmlType.U), param));
                            break;
                        case D :
                            result.put(DmlType.D, result.get(DmlType.D) + getDao().delData(statementId.get(DmlType.D), param));
                            break;
                        default :
                            break;
                    }
                }
            }
        } catch (Exception e) {
            throw new SvcBizException(e, "ER-SVC-C0008", "SAVE");
        }
        return result;
    }

//    @SuppressWarnings("unchecked")
//    public void excelDownload(HttpServletRequest request, HttpServletResponse response, String sqlMapId) {
//
//        logger.debug("BaseServiceImpl.excelDownload sqlMapId [{}]", sqlMapId);
//
//        String strParams    = URLDecoder.decode(request.getParameter("params"), "UTF-8"); //파라미터
//        logger.debug("strParams = " + strParams);
//        JSONObject params   = JSONObject.fromObject(strParams);
//
//        String fileNm               = (String)params.getString("fileNm");              // 엑셀파일명
//        Map<String, Object> param   = BaseUtil.toMap(params.getJSONObject("param"));  // param
//
//        JSONArray colModel          = params.getJSONArray("colModel");
//
//        JSONArray groupHeaderList   = null;
//        JSONArray colHeader         = new JSONArray();
//        JSONArray colName           = new JSONArray();
//        JSONArray colSize           = new JSONArray();
//
//
//        for (int i = 0; i < colModel.size(); i++) {
//
//            colHeader.add( colModel.getJSONObject(i).getString("label") );         // 컬럼 header
//            colName.add( colModel.getJSONObject(i).getString("name") );            // 컬럼 name
//            int width = colModel.getJSONObject(i).getInt("width") * 50;
//            colSize.add( (width > 10000) ? 10000 : width );      // 컬럼 size
//
//        }
//
//        if( params.containsKey("groupHeader") == true ) {
//            groupHeaderList = JSONArray.fromObject((String)params.get("groupHeader"));
//        }
//
//        logger.debug("fileNm = " + fileNm);
//        BaseUtil.printMap("excelDownload > param", param);
//        BaseUtil.printJSONArray("excelDownload > colHeader", colHeader);
//        BaseUtil.printJSONArray("excelDownload > colName", colName);
//        BaseUtil.printJSONArray("excelDownload > colSize", colSize);
//
//        ExcelBuilder builder = new ExcelBuilder();
//
//        if( groupHeaderList != null ) {
//
//            for (int i = 0; i < groupHeaderList.size(); i++) {
//
//                JSONArray groupHeader = (JSONArray)groupHeaderList.get(i);
//
//                builder.addColumnHeaderMergeConfig(groupHeader.getInt(0), groupHeader.getInt(1), groupHeader.getInt(2), groupHeader.getInt(3), groupHeader.getString(4));
//
//            }
//
//        }
//
//        for (int i = 0; i < colModel.size(); i++) {
//
//            builder.addCellConfig(colName.getString(i), colHeader.getString(i), (short)(colSize.getInt(i)));
//
//        }
//
//        param.put("pagenow", "1");
//        param.put("pagecnt", "300000");
//        param.put("srow", "0");
//        param.put("rows", "300000");
//
//        List<Object> resultList = getDao().selDataList(sqlMapId, (T)param);
//
//        List<ExcelVO> list = new ArrayList<ExcelVO>();
//
//        for (int i = 0; i < resultList.size(); i++) {
//
//            Map<String,Object> tmpMap = (Map<String,Object>)resultList.get(i);
//            ExcelVO model = new ExcelVO();
//            model.setProperties(tmpMap);
//            list.add(model);
//
//        }
//
//        builder.setFilename( fileNm + ".xlsx" );
//        builder.setDataSource((List<ExcelVO>)list);
//        builder.build(response);
//
//    }
//
//    // Grid 엑셀다운로드
//    public void excelDownloadGrid(HttpServletRequest request, HttpServletResponse response) {
//
//        logger.debug("BaseServiceImpl.excelDownload....");
//
//        try {
//            String strParams    = URLDecoder.decode(request.getParameter("params"), "UTF-8"); //파라미터
//
//            logger.debug("strParams[{}]", strParams);
//            logger.debug("strParams = " + strParams);
//            JSONObject params   = JSONObject.fromObject(strParams);
//
//            String fileNm               = (String)params.getString("fileNm");              // 엑셀파일명
//            JSONArray colModel          = params.getJSONArray("colModel");
//
//            logger.debug("fileNm = " + fileNm);
//
//            JSONArray groupHeaderList   = null;
//            JSONArray colHeader         = new JSONArray();
//            JSONArray colName           = new JSONArray();
//            JSONArray colSize           = new JSONArray();
//
//            for (int i = 0; i < colModel.size(); i++) {
//
//                colHeader.add( colModel.getJSONObject(i).getString("label") );         // 컬럼 header
//                colName.add( colModel.getJSONObject(i).getString("name") );            // 컬럼 name
//                int width = colModel.getJSONObject(i).getInt("width") * 50;
//                colSize.add( (width > 10000) ? 10000 : width );      // 컬럼 size
//
//            }
//
//            if( params.containsKey("groupHeader") == true ) {
//                groupHeaderList = JSONArray.fromObject(params.getString("groupHeader"));
//            }
//
//            BaseUtil.printJSONArray("excelDownload > colHeader", colHeader);
//            BaseUtil.printJSONArray("excelDownload > colName", colName);
//            BaseUtil.printJSONArray("excelDownload > colSize", colSize);
//
//            ExcelBuilder builder = new ExcelBuilder();
//
//            if( groupHeaderList != null ) {
//
//                for (int i = 0; i < groupHeaderList.size(); i++) {
//
//                    JSONArray groupHeader = (JSONArray)groupHeaderList.get(i);
//
//                    builder.addColumnHeaderMergeConfig(groupHeader.getInt(0), groupHeader.getInt(1), groupHeader.getInt(2), groupHeader.getInt(3), groupHeader.getString(4));
//
//                }
//
//            }
//
//            for (int i = 0; i < colModel.size(); i++) {
//
//                builder.addCellConfig(colName.getString(i), colHeader.getString(i), (short)(colSize.getInt(i)));
//
//            }
//
//            List<Map<String, Object>> resultList = BaseUtil.toList(params.getJSONArray("data"));
//
//            List<ExcelVO> list = new ArrayList<ExcelVO>();
//
//            for (int i = 0; i < resultList.size(); i++) {
//
//                Map<String,Object> tmpMap = (Map<String,Object>)resultList.get(i);
//                ExcelVO model = new ExcelVO();
//                model.setProperties(tmpMap);
//                list.add(model);
//
//            }
//
//            builder.setFilename( fileNm + ".xlsx" );
//            builder.setDataSource((List<ExcelVO>)list);
//            builder.build(response);
//
//            logger.error("BaseServiceImpl.excelDownload end...............................");
//        } catch (Exception e) {
//            logger.error("BaseServiceImpl.excelDownload [{}]", e);
//            e.printStackTrace();
//        }
//
//    }


}
