package com.deviget.minesweeperultimate;

/**
 *
 * @author sergio
 */
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ImportResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@SpringBootApplication
//@ImportResource({"classpath:appconfig-mvc.xml","classpath:appconfig-data.xml"})

public class Main extends SpringBootServletInitializer {
    
        @RequestMapping(value ="/", method = RequestMethod.GET)
        public String mainPage() {
            return "home";
        }

	public static void main(String[] args) throws Exception {
		SpringApplication.run(Main.class, args);
	}

}
