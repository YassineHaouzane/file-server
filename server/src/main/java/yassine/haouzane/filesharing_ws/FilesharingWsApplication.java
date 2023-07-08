package yassine.haouzane.filesharing_ws;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import yassine.haouzane.filesharing_ws.properties.FileStorageProperties;

import java.util.Arrays;

@SpringBootApplication
@EnableConfigurationProperties({
		FileStorageProperties.class
})
public class FilesharingWsApplication {

	public static void main(String[] args) {
		SpringApplication.run(FilesharingWsApplication.class, args);
	}

}
