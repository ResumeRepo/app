package app.nextrole.api.data.postgres

import app.nextrole.api.props.PostgresDataSourceProps
import app.nextrole.api.props.PropsConfiguration
import jakarta.persistence.EntityManagerFactory
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.jdbc.DataSourceBuilder
import org.springframework.context.annotation.*
import org.springframework.core.env.Environment
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.orm.jpa.JpaTransactionManager
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.transaction.annotation.EnableTransactionManagement
import javax.sql.DataSource

/**
 * @author Biz Melesse
 * created on 6/15/24
 */

@Configuration
@ComponentScan
@EntityScan
@EnableJpaRepositories(
    entityManagerFactoryRef = "entityManagerFactory",
    transactionManagerRef = "transactionManager",
    basePackages = ["app.nextrole.api.data.postgres.repo"]
)
@EnableTransactionManagement
@Import(
    PropsConfiguration::class
)
class PostgresDBDataConfiguration(@Qualifier("primary") val dataSourceProps: PostgresDataSourceProps) {

    @Primary
    @Bean(name = ["entityManagerFactory"])
    fun entityManagerFactory(
        env: Environment?, @Qualifier("postgresDbSource") dataSource: DataSource
    ): LocalContainerEntityManagerFactoryBean {
        val em = LocalContainerEntityManagerFactoryBean()
        em.setDataSource(dataSource)
        em.setPackagesToScan("app.nextrole.api.data.postgres.entity")
        em.setPersistenceUnitName("functionHubDb")
        val vendorAdapter = HibernateJpaVendorAdapter()
        em.jpaVendorAdapter = vendorAdapter

        // JPA & Hibernate
        val properties: MutableMap<String, Any?> = HashMap()
        properties["hibernate.dialect"] = "org.hibernate.dialect.PostgreSQLDialect"
        properties["hibernate.show-sql"] = true
        val batchSize = 20
        properties["hibernate.jdbc.batch_size"] = batchSize
        properties["hibernate.order_inserts"] = true
        properties["hibernate.order_updates"] = true
        properties["hibernate.jdbc.batch_versioned_data"] = true
        em.setJpaPropertyMap(properties)
        em.afterPropertiesSet()
        return em
    }

    @Primary
    @Bean(name = ["transactionManager"])
    fun transactionManager(
        @Qualifier("entityManagerFactory") entityManagerFactory: EntityManagerFactory?
    ): PlatformTransactionManager {
        return JpaTransactionManager(entityManagerFactory!!)
    }

    @Primary
    @Bean(name = ["postgresDbSource"])
    fun postgresDbSource(): DataSource {
        return DataSourceBuilder.create()
            .driverClassName(dataSourceProps.driverClassName)
            .url(dataSourceProps.url)
            .username(dataSourceProps.username)
            .password(dataSourceProps.password)
            .build()
    }
}
