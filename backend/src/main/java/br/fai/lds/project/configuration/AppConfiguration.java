package br.fai.lds.project.configuration;

import br.fai.lds.project.implementation.dao.fake.ProductFakeDaoImpl;
import br.fai.lds.project.implementation.dao.fake.UserFakeDaoImpl;
import br.fai.lds.project.port.product.ProductDao;
import br.fai.lds.project.port.user.UserDao;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.util.Arrays;

@Configuration
public class AppConfiguration {

    private final Environment environment;

    public AppConfiguration(Environment environment) {
        this.environment = environment;

        System.out.println("---------");
        System.out.println(Arrays.toString(environment.getActiveProfiles()));
        System.out.println("---------");
    }

    @Bean
    public UserDao getUserFakeDao(){
        return new UserFakeDaoImpl();
    }

    @Bean
    public ProductDao getProductFakeDao(){
        return new ProductFakeDaoImpl();
    }
}
