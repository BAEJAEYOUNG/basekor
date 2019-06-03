/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 19 오후 1:54.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.util;

import org.apache.commons.codec.binary.Base64;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

public class PayUtil {

    /**
     * 기준날짜에서 몇일 전,후의 날짜를 구한다.
     * @param   sourceTS    기준날짜
     * @param   day         변경할 일수
     * @return  기준날짜에서 입력한 일수를 계산한 날짜
     */
    public static Timestamp getTimestampWithSpan(Timestamp sourceTS, long day) throws Exception {

        Timestamp targetTS = null;

        if (sourceTS != null) {
            targetTS = new Timestamp(sourceTS.getTime() + (day * 1000 * 60 * 60 * 24));
        }

        return targetTS;
    }

    /**
     * 현재날짜를 YYYYMMDDHHMMSS로 리턴
     */
    public static final synchronized String getDate(String format) {

        return new SimpleDateFormat(format).format(new Date());
    }

    public static String encrypt(String strData) { // 암호화 시킬 데이터

        String strOUTData = "";

        try {
            MessageDigest md = MessageDigest.getInstance("MD5"); // MD5 형식으로 암호화
            md.reset();
            md.update(strData.getBytes());

            byte[] digest = md.digest();

            StringBuffer hashedpasswd = new StringBuffer();
            String hx;

            for (int i = 0; i < digest.length; i++) {
                hx = Integer.toHexString(0xFF & digest[i]); // 0x03 is equal to 0x3, but we need 0x03 for our md5sum

                if (hx.length() == 1) {
                    hx = "0" + hx;
                }

                hashedpasswd.append(hx);
            }

            strOUTData = hashedpasswd.toString();
            byte[] raw = strOUTData.getBytes();
            byte[] encodedBytes = Base64.encodeBase64(raw);
            strOUTData = new String(encodedBytes);
        } catch (NoSuchAlgorithmException e) {
            System.out.print("암호화 에러" + e.toString());
        }

        return strOUTData; // 암호화된 데이터를 리턴...
    }

    public static String SHA256(String strData) { // 암호화 시킬 데이터

        String SHA = "";

        try {
            MessageDigest sh = MessageDigest.getInstance("SHA-256");
            sh.update(strData.getBytes());
            byte[] byteData = sh.digest();
            StringBuffer sb = new StringBuffer();

            for (int i = 0; i < byteData.length; i++) {
                sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));

            }

            SHA = sb.toString();
            byte[] raw = SHA.getBytes();
            byte[] encodedBytes = Base64.encodeBase64(raw);
            SHA = new String(encodedBytes);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            SHA = null;
        }

        return SHA;
    }

    public static String SHA256Salt(String strData, String salt) {

        String SHA = "";

        try {
            MessageDigest sh = MessageDigest.getInstance("SHA-256");
            sh.reset();
            sh.update(salt.getBytes());
            byte[] byteData = sh.digest(strData.getBytes());

            // Hardening against the attacker's attack
            sh.reset();
            byteData = sh.digest(byteData);

            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < byteData.length; i++) {
                sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));

            }

            SHA = sb.toString();
            byte[] raw = SHA.getBytes();
            byte[] encodedBytes = Base64.encodeBase64(raw);
            SHA = new String(encodedBytes);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            SHA = null;
        }

        return SHA;
    }
}
