package com.deviget.minesweeperultimate;

/**
 *
 * @author sergio
 */
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ImportResource;


@SpringBootApplication
@ImportResource({"classpath:appconfig-mvc.xml","classpath:appconfig-data.xml"})

public class Main extends SpringBootServletInitializer {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(Main.class, args);
	}

}
