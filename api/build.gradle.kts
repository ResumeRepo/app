import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "3.2.3"
	id("io.spring.dependency-management") version "1.1.4"
	id("com.netflix.dgs.codegen") version "6.0.3"
	kotlin("jvm") version "1.9.22"
	kotlin("plugin.spring") version "1.9.22"
	kotlin("plugin.jpa") version "1.9.22"
}

group = "app.nextrole"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_21
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
	maven { url = uri("https://repo.spring.io/milestone") }
	maven { url = uri("https://repo.spring.io/snapshot") }
}

dependencyManagement {
	imports {
		mavenBom("com.netflix.graphql.dgs:graphql-dgs-platform-dependencies:latest.release")
	}
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.springframework.cloud:spring-cloud-config-server:4.1.0")
	implementation("org.springframework.cloud:spring-cloud-config-client:4.1.0")
	implementation("org.springframework.cloud:spring-cloud-starter-bootstrap:4.1.1")
	implementation("com.graphql-java:graphql-java-extended-scalars:21.0")
	implementation("org.hibernate:hibernate-core:6.4.4.Final")
	implementation("com.google.firebase:firebase-admin:9.2.0")
	implementation("org.apache.pdfbox:pdfbox:3.0.2")
	implementation("org.springframework.boot:spring-boot-starter-graphql")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.flywaydb:flyway-core:9.22.3")
	implementation("org.springframework.boot:spring-boot-starter-actuator")
	implementation("com.netflix.graphql.dgs:graphql-dgs-spring-boot-starter")
	runtimeOnly("org.postgresql:postgresql")
	implementation("io.github.oshai:kotlin-logging-jvm:5.1.0")
	testImplementation("org.testng:testng:7.9.0")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
	testImplementation("org.springframework.graphql:spring-graphql-test")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs += "-Xjsr305=strict"
		jvmTarget = "21"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

val generateJava = tasks.generateJava {
	schemaPaths.add("${projectDir}/src/main/resources/schema")
	packageName = "app.nextrole.api.codegen"
	generateClient = false
}

tasks.test {
	useTestNG {
		preserveOrder = true
	}
	systemProperties = mapOf(
		"spring.profiles.active" to System.getProperty("SPRING_PROFILES_ACTIVE"),
		"spring.application.name" to System.getProperty("SPRING_APPLICATION_NAME"),
		"GH_TOKEN" to System.getProperty("GH_TOKEN"),
		"GH_USERNAME" to System.getProperty("GH_USERNAME")
	)
	reports.html.required = true
	reports.junitXml.required = false
	jvmArgs(listOf("--enable-preview"))
}

