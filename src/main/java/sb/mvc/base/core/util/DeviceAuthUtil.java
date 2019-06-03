/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 28 오전 10:26.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class DeviceAuthUtil {

    public static byte[] getHashValue(byte[] DeviceAuth, byte[] randomDeviceAuth) {

        byte[] genDeviceAuth = new byte[32];
        MessageDigest md = null;

        if (randomDeviceAuth.length != 16)
            return null;

        System.arraycopy(DeviceAuth, 0, genDeviceAuth, 0, 4);
        System.arraycopy(randomDeviceAuth, 0, genDeviceAuth, 4, 4);
        System.arraycopy(DeviceAuth, 4, genDeviceAuth, 8, 4);
        System.arraycopy(randomDeviceAuth, 4, genDeviceAuth, 12, 4);
        System.arraycopy(DeviceAuth, 8, genDeviceAuth, 16, 4);
        System.arraycopy(randomDeviceAuth, 8, genDeviceAuth, 20, 4);
        System.arraycopy(DeviceAuth, 12, genDeviceAuth, 24, 4);
        System.arraycopy(randomDeviceAuth, 12, genDeviceAuth, 28, 4);

        try {
            md = MessageDigest.getInstance("SHA-1");
        } catch (NoSuchAlgorithmException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        md.reset();
        md.update(genDeviceAuth);
        return md.digest();

    }

    public static byte[] getHashValueTest(byte[] DeviceAuth, byte[] randomDeviceAuth) {

        byte[] genDeviceAuth = new byte[32];
        MessageDigest md = null;

        if (randomDeviceAuth.length != 16)
            return null;

        System.arraycopy(DeviceAuth, 0, genDeviceAuth, 0, 16);
        System.arraycopy(randomDeviceAuth, 0, genDeviceAuth, 16, 16);

        try {
            md = MessageDigest.getInstance("SHA-1");
        } catch (NoSuchAlgorithmException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        md.reset();
        md.update(genDeviceAuth);
        return md.digest();

    }

    public static String getHexHashValue(String deviceAuthKey, String randomValue) {

        System.out.println("deviceAuthKey = " + deviceAuthKey);
        System.out.println("randomValue = " + randomValue);
        return byteToHex(getHashValue(hexToByte(deviceAuthKey), hexToByte(randomValue)));

    }

    public static String getHexHashValueDemo(String deviceAuthKey, String randomValue) {

        System.out.println("deviceAuthKey = " + deviceAuthKey);
        System.out.println("randomValue = " + randomValue);
        return byteToHex(getHashValueTest(hexToByte(deviceAuthKey), hexToByte(randomValue)));

    }

    public static byte[] hexToByte(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i + 1), 16));
        }
        return data;
    }


    public static String byteToHex(byte[] a) {
        StringBuilder sb = new StringBuilder(a.length * 2);
        for (byte b : a)
            sb.append(String.format("%02x", b));
        return sb.toString();
    }

//    public static String byteToHex(byte[] bytes) {
//        return new BigInteger(bytes).toString(16);
//    }


//    public static byte[] hexToByte(String hexText) {
//        return new BigInteger(hexText, 16).toByteArray();
//    }

    public static void main(String[] args) {

        System.out.println(getHexHashValue("35363636323033343939353033373831", "2943220045184e3a3e40052d511b3d5b"));

    }
}
