package sb.mvc.base;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ApplicationProperties implements ApplicationRunner {

    @Value( "${spring.profiles.fullName}" )
    private String profileName;

    @Value( "${spring.profiles.dbType}" )
    private String profileDBType;

    @Override
    public void run( ApplicationArguments args ) throws Exception {
        log.info( "### profileName : {}", profileName );
        log.info( "### profileDBType : {}", profileDBType );
    }
}
