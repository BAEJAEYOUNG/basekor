/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 19 오후 1:54.
 * Copyright (c) 2019. All rights reserved.
 */

/*
 *
 */
package sb.mvc.base.core.util;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.FileInputStream;
import java.util.*;

public class BaseUtil<T> {

    public static String getCheckSum(String filePath) {
        String rtnStr = "";
        try {
            FileInputStream fis = new FileInputStream(new File(filePath));
            rtnStr = DigestUtils.md5Hex(fis).toUpperCase(); // return 32 length String
            fis.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return rtnStr;
    }

    public static String toCamelCase(String s) {

        if (-1 == s.indexOf('_') && Character.isLowerCase(s.charAt(0))) {
            return s;
        }

        StringBuffer sb = new StringBuffer();

        for (String token : s.toLowerCase().split("_")) {
            sb.append(StringUtils.capitalize(token));
        }

        return StringUtils.uncapitalize(sb.toString());
    }

    public static Map<String, String> toCamelCaseMap(Map<String, Object> map) {

        Map<String, String> result = new HashMap<String, String>();

        for (String key : map.keySet()) {
            result.put(BaseUtil.toCamelCase(key), (String)map.get(key));
        }

        return result;
    }

    /** JSONObject to Map **/
    @SuppressWarnings("unchecked")
    public static Map<String, Object> toMap(JSONObject object) throws JSONException {

        Map<String, Object> map = new HashMap<String, Object>();

        Iterator<String> keysItr = object.keys();
        while (keysItr.hasNext()) {
            String key = keysItr.next();
            Object value = object.get(key);

            if (value instanceof JSONArray) {
                value = toList((JSONArray) value);
            }

            else if (value instanceof JSONObject) {
                value = toMap((JSONObject) value);
            }
            map.put(key, value);
        }
        return map;
    }

    public static List<Map<String, Object>> toList(JSONArray array) throws JSONException {

        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

        for (int i = 0; i < array.size(); i++) {
            list.add(toMap((JSONObject)array.get(i)));
        }

        return list;
    }

    public static String setUrlGetParams(Map<String, Object> params) {

        StringBuilder sb = new StringBuilder();

        for (String key : params.keySet()) {
            sb.append(key)
            .append("=")
            .append((String)params.get(key))
            .append("&");
        }

        return sb.toString().substring(0, sb.toString().length()-1);

    }

    public static String rndString(int len) {
        StringBuffer temp = new StringBuffer();
        Random rnd = new Random();
        for (int i = 0; i < len; i++) {
            int rIndex = rnd.nextInt(3);
            switch (rIndex) {
            case 0:
                // a-z
                temp.append((char) (rnd.nextInt(26) + 97));
                break;
            case 1:
                // A-Z
                temp.append((char) (rnd.nextInt(26) + 65));
                break;
            case 2:
                // 0-9
                temp.append((rnd.nextInt(10)));
                break;
            }
        }
        return temp.toString();
    }

    public static void printMap(String asTitle, Map<?, ?> aoMap) {

        StringBuilder loSb = new StringBuilder();

        loSb.append("------------------------------------------------------------------");
        loSb.append("\n " + asTitle + " \n");
        loSb.append("------------------------------------------------------------------\n");

        Iterator<?> loItor = aoMap.keySet().iterator();

        while (loItor.hasNext()) {
            String lsKey = loItor.next().toString();
            loSb.append(lsKey).append(" = ").append(aoMap.get(lsKey))
                    .append("\n");
        }
        loSb.append("------------------------------------------------------------------");

        System.out.println("\n\n");
        System.out.println(loSb.toString());
        System.out.println("\n\n");
    }

    public static void printListMap(List<Map<String, Object>> aoList) {

        BaseUtil.printListMap("ListMap Print", aoList);
    }

    public static void printListMap(String asTitle, ArrayList<Map<String, Object>> params) {

        BaseUtil.printListMap(asTitle, (List<Map<String, Object>>)params);
    }

    public static void printListMap(String asTitle, List<Map<String, Object>> aoList) {

        StringBuilder loSb = new StringBuilder();

        loSb.append("------------------------------------------------------------------");
        loSb.append("\n " + asTitle + " \n");
        loSb.append("------------------------------------------------------------------\n");

        for (int i = 0; i < aoList.size(); i++) {
            BaseUtil.printMap(i + "번째 Map", aoList.get(i));
        }

        loSb.append("------------------------------------------------------------------");

        System.out.println("\n\n");
        System.out.println(loSb.toString());
        System.out.println("\n\n");
    }

    public static void printJSONArray(String asTitle, JSONArray aorJson) {

        StringBuilder loSb = new StringBuilder();

        loSb.append("------------------------------------------------------------------");
        loSb.append("\n " + asTitle + " \n");
        loSb.append("------------------------------------------------------------------\n");

        for (int i = 0; i < aorJson.size(); i++) {
            loSb.append(i + "번째 : ").append(aorJson.getString(i)).append("\n");
        }

        loSb.append("------------------------------------------------------------------");

        System.out.println("\n\n");
        System.out.println(loSb.toString());
        System.out.println("\n\n");
    }
}
