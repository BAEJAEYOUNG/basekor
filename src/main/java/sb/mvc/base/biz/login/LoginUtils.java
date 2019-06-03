/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 24 오후 4:29.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.login;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Random;

public class LoginUtils {

    protected final Logger logger = LoggerFactory.getLogger(LoginUtils.class);

    public static String temporaryPassword(int size) {

        StringBuffer buffer = new StringBuffer();
        Random random = new Random();
        String[] chars = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9".split(",");
        for (int i = 0; i < size; i++) {
            buffer.append(chars[random.nextInt(chars.length)]);
        }
        return buffer.toString();
    }


    public static void main(String[] args) {
        System.out.println(LoginUtils.temporaryPassword(8));
    }

}
