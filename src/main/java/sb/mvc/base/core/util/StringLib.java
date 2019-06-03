/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 19 오후 1:54.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.util;

import java.nio.charset.StandardCharsets;
import java.text.DecimalFormat;
import java.util.Random;

public class StringLib {

    public static final byte[] HEX_TO_CHAR_MAP = {
        (byte)'0', (byte)'1', (byte)'2', (byte)'3', (byte)'4', (byte)'5', (byte)'6', (byte)'7',
        (byte)'8', (byte)'9', (byte)'a', (byte)'b', (byte)'c', (byte)'d', (byte)'e', (byte)'f'
    };

    // Int => String : Left Zero Padding
    public static String zeroPaddingLeft(int nData, int nSize) {

        String strData = Integer.toString(nData);
        int nDataSize = strData.length();
        String strOut = "";

        for (int i = 0; i < (nSize - nDataSize); i++)
            strOut += "0";
        strOut += strData;

        strData = null;
        return strOut;
    }

    // Long => String : Left Zero Padding
    public static String zeroPaddingLeft(long nData, int nSize) {

        String strData = Long.toString(nData);
        int nDataSize = strData.length();
        String strOut = "";

        for (int i = 0; i < (nSize - nDataSize); i++)
            strOut += "0";
        strOut += strData;

        strData = null;
        return strOut;
    }

    // String => String : Left Zero Padding
    public static String zeroPaddingLeft(String strData, int nSize) {

        int nDataSize = strData.length();
        String strOut = "";

        for (int i = 0; i < (nSize - nDataSize); i++)
            strOut += "0";
        strOut += strData;

        return strOut;
    }

    // Int => String : Right Zero Padding
    public static String zeroPaddingRight(int nData, int nSize) {

        String strData = Integer.toString(nData);
        int nDataSize = strData.length();
        String strOut = "";

        for (int i = 0; i < (nSize - nDataSize); i++)
            strOut += "0";
        strOut = strData + strOut;

        strData = null;
        return strOut;
    }

    // Long => String : Right Zero Padding
    public static String zeroPaddingRight(long nData, int nSize) {

        String strData = Long.toString(nData);
        int nDataSize = strData.length();
        String strOut = "";

        for (int i = 0; i < (nSize - nDataSize); i++)
            strOut += "0";
        strOut = strData + strOut;

        strData = null;
        return strOut;
    }

    // String => String : Right Zero Padding
    public static String zeroPaddingRight(String strData, int nSize) {

        int nDataSize = strData.length();
        String strOut = "";

        for (int i = 0; i < (nSize - nDataSize); i++)
            strOut += "0";
        strOut = strData + strOut;

        return strOut;
    }

    // Int => String : Left Blank Padding
    public static String blankPaddingLeft(int nData, int nSize) {

        String strData = Integer.toString(nData);
        int nDataSize = strData.length();
        String strOut = "";

        for (int i = 0; i < (nSize - nDataSize); i++)
            strOut += " ";
        strOut += strData;

        strData = null;
        return strOut;
    }

    // Long => String : Left Blank Padding
    public static String blankPaddingLeft(long nData, int nSize) {

        String strData = Long.toString(nData);
        int nDataSize = strData.length();
        String strOut = "";

        for (int i = 0; i < (nSize - nDataSize); i++)
            strOut += " ";
        strOut += strData;

        strData = null;
        return strOut;
    }

    // String => String : Left Blank Padding
    public static String blankPaddingLeft(String strData, int nSize) {

        int nDataSize = strData.length();
        String strOut = "";

        for (int i = 0; i < (nSize - nDataSize); i++)
            strOut += " ";
        strOut += strData;

        return strOut;
    }

    // Int => String : Right Blank Padding
    public static String blankPaddingRight(int nData, int nSize) {

        String strData = Integer.toString(nData);
        int nDataSize = strData.length();
        String strOut = "";

        for (int i = 0; i < (nSize - nDataSize); i++)
            strOut += " ";
        strOut = strData + strOut;

        strData = null;
        return strOut;
    }

    // Long => String : Right Blank Padding
    public static String blankPaddingRight(long nData, int nSize) {

        String strData = Long.toString(nData);
        int nDataSize = strData.length();
        String strOut = "";

        for (int i = 0; i < (nSize - nDataSize); i++)
            strOut += " ";
        strOut = strData + strOut;

        strData = null;
        return strOut;
    }

    // String => String : Right Blank Padding
    public static String blankPaddingRight(String strData, int nSize) {

        int nDataSize = strData.length();
        String strOut = "";

        for (int i = 0; i < (nSize - nDataSize); i++)
            strOut += " ";
        strOut = strData + strOut;

        return strOut;
    }

    // Byte[] => HexDigit String
    public static String convertByteToHex(byte[] bIn) {

        int i, j;
        byte[] bTmp = new byte[bIn.length];
        byte[] bOut = new byte[2 * bIn.length];
        String strOut = null;

        System.arraycopy(bIn, 0, bTmp, 0, bIn.length);
        j = 0;
        for (i = 0; i < bIn.length; i++) {
            bOut[j++] = HEX_TO_CHAR_MAP[(bTmp[i] & 0xF0) >> 4];
            bOut[j++] = HEX_TO_CHAR_MAP[(bTmp[i] & 0x0F)];
        }

        strOut = new String(bOut);
        bTmp = bOut = null;
        return strOut;
    }

    public static byte[] convertHexToByte(String strIn) {

        byte[] bOut = new byte[strIn.length() / 2];
        for (int i = 0; i < bOut.length; i++) {
            bOut[i] = (byte) Integer.parseInt(strIn.substring(i * 2, 2 * i + 2), 16);
        }

        return bOut;
    }

    public static String toUtf8String(String strIn) {

        byte[] bTmp = null;
        String strOut = null;

        try {
            bTmp = strIn.getBytes(StandardCharsets.UTF_8);
            strOut = new String(bTmp, StandardCharsets.UTF_8);
        } catch (Exception e) {
            strOut = null;
        } finally {
            bTmp = null;
        }

        return strOut;
    }

    public static String toUtf8String(byte[] bIn) {

        String strOut = null;

        try {
            strOut = new String(bIn, StandardCharsets.UTF_8);
        } catch (Exception e) {
            strOut = null;
        } finally {
        }

        return strOut;
    }

    public static byte[] toUtf8ByteArray(String strIn) {

        byte[] bTmp = null;

        try {
            bTmp = strIn.getBytes(StandardCharsets.UTF_8);
        } catch (Exception e) {
            bTmp = null;
        }

        return bTmp;
    }

    public static String getStringFromQueryString(String strData, String strVar) {

        String[] strList = null;
        String[] strVal = null;
        String strRet = null;

        if (strData == null || strData.length() == 0) {
            return null;
        }

        strList = strData.split(strVar + "=");

        if (strList.length == 1) {
            strList = null;
            return null;
        }

        strVal = strList[1].split("\\&");
        strList = null;
        strRet = strVal[0];
        strVal = null;

        return strRet;
    }

    public static int getIntegerFromQueryString(String strData, String strVar) {

        String[] strList = null;
        String[] strVal = null;
        int nVal;

        if (strData == null || strData.length() == 0) {
            return -1;
        }

        strList = strData.split(strVar + "=");

        if (strList.length == 1) {
            strList = null;
            return -1;
        }

        strVal = strList[1].split("\\&");
        strList = null;
        nVal = Integer.parseInt(strVal[0]);
        strVal = null;

        return nVal;
    }

    public static String addCharacterToString(String strData, String strChar, int nInterval) {

        int nLen = strData.length();
        String strRet = "";
        int i;

        if (nLen <= nInterval) {
            return strData;
        }

        for (i = 0; i < (nLen / nInterval); i++) {
            strRet += strData.substring(i * nInterval, (i + 1) * nInterval);
            strRet += strChar;
        }

        if ((nLen % nInterval) > 0) {
            strRet += strData.substring(i * nInterval) + strChar;
        }

        return strRet;
    }

    public static String getRandomKey(int nSize) {

        int i, r;
        String strOut = "";
        String strCharList = "0123456789abcdefghijklmnopqrstuvwxyz";
        Random rand = new Random();

        for (i = 0; i < nSize; i++) {
            r = rand.nextInt(strCharList.length() - 1);
            strOut = strOut + strCharList.charAt(r);
        }

        return strOut;
    }

    public static String getRandomString(int nSize) {

        int i, r;
        String strOut = "";
        String strCharList = "0123456789abcdefghijklmnopqrstuvwxyz";
        Random rand = new Random();

        for (i = 0; i < nSize; i++) {
            r = rand.nextInt(strCharList.length() - 1);
            strOut = strOut + strCharList.charAt(r);
        }

        return strOut;
    }

    public static String getRandomNumberString(int nSize) {

        int i, r;
        String strOut = "";
        String strCharList = "012345678901234567890123456789";
        Random rand = new Random();

        for (i = 0; i < nSize; i++) {
            r = rand.nextInt(strCharList.length() - 1);
            strOut = strOut + strCharList.charAt(r);
        }

        return strOut;
    }

    // 구분자 입력 받아서 Parse 한다.
    public static String[] getDelimiterParse(String delimiter, String orgData) {

        String[] temp;
        delimiter.trim();
        temp = orgData.split(delimiter);

        return (temp);
    }

    // 원 콤마
    public static String commaWon(String amt) {

        int inValues = Integer.parseInt(amt);
        DecimalFormat Commas = new DecimalFormat("#,###");
        String resultStr = Commas.format(inValues);
        return (resultStr);
    }
}
