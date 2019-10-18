/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 24 오전 10:00.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.base;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface BaseService<T> {

    enum ServiceType {
        I, U, D, S
    }

    enum DmlType {
        I, U, D
    }

    BaseDao<T> getDao();

    Map<String, Object> selDataPageList(T param);

    Map<String, Object> selDataPageList(String statementId, T param);

    <E> List<E> selDataList(T param);
    <E> List<E> selDataList(String statementId, T param);

    T selData(T param);
    T selData(String statementId, T param);

    Object selValue(T param);
    Object selValue(String statementId, T param);

    int insData(T param);
    int insData(String statementId, T param);

    int updData(T param);
    int updData(String statementId, T param);

    int delData(T param);
    int delData(String statementId, T param);

    int insDataList(List<T> param);
    int insDataList(String statementId, List<T> param);

    int updDataList(List<T> param);
    int updDataList(String statementId, List<T> param);

    int delDataList(List<T> param);
    int delDataList(String statementId, List<T> param);

    Map<DmlType, Integer> saveDataList(List<T> param);
    Map<DmlType, Integer> saveDataList(Map<DmlType, String> statementId, List<T> param);

    // 엑셀다운로드
//    public abstract void excelDownload(HttpServletRequest request, HttpServletResponse response, String sqlMapId);

    // GRID 엑셀다운로드
//    public abstract void excelDownloadGrid(HttpServletRequest request, HttpServletResponse response);

}
