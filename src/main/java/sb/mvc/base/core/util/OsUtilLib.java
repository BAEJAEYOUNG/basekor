/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 19 오후 1:54.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.util;


import org.springframework.stereotype.Component;

@Component
public class OsUtilLib {

    public enum OS {
        WINDOWS, LINUX, MAC, SOLARIS
    }// Operating systems.

    private static OS os = null;

    private static String operSys = System.getProperty("os.name").toLowerCase();


    //Get Operation System
    public static OS getOS() {
        if (os == null) {
            //String operSys = System.getProperty("os.name").toLowerCase();
            if (operSys.contains("win")) {
                os = OS.WINDOWS;
            } else if (operSys.contains("nix") || operSys.contains("nux")
                    || operSys.contains("aix")) {
                os = OS.LINUX;
            } else if (operSys.contains("mac")) {
                os = OS.MAC;
            } else if (operSys.contains("sunos")) {
                os = OS.SOLARIS;
            }
        }
        return os;
    }


    public static boolean isWindows() {

        return (operSys.indexOf("win") >= 0);

    }

    public static boolean isMac() {

        return (operSys.indexOf("mac") >= 0);

    }

    public static boolean isLinux() {

        return (operSys.indexOf("nix") >= 0 || operSys.indexOf("nux") >= 0 || operSys.indexOf("aix") > 0 );

    }

    public static boolean isSolaris() {

        return (operSys.indexOf("sunos") >= 0);

    }


}
