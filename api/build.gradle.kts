import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.openapitools.generator.gradle.plugin.tasks.GenerateTask

plugins {
    id("org.springframework.boot") version "3.2.3"
    id("io.spring.dependency-management") version "1.1.4"
    id("org.openapi.generator") version "7.6.0"
    kotlin("jvm") version "2.0.0"
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

dependencies {
    implementation("io.github.jan-tennert.supabase:gotrue-kt-jvm:2.5.1")
    implementation("io.github.jan-tennert.supabase:serializer-jackson:2.5.1")
    implementation("io.ktor:ktor-client-apache5:2.3.12")


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
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.17.1")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.flywaydb:flyway-core:9.22.3")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.openapitools:jackson-databind-nullable:0.2.6")
    implementation("com.amazonaws:aws-java-sdk:1.12.747")
    implementation("io.github.oshai:kotlin-logging-jvm:5.1.0")
    runtimeOnly("org.postgresql:postgresql")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.9.0-RC")
    runtimeOnly("org.jetbrains.kotlinx:kotlinx-coroutines-reactor:1.9.0-RC")
    implementation("io.github.oshai:kotlin-logging-jvm:5.1.0")
    implementation("com.microsoft.playwright:playwright:1.44.0")
    implementation("io.jsonwebtoken:jjwt-api:0.12.5")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.5")
    implementation("org.jsoup:jsoup:1.17.2")
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    compileOnly("org.projectlombok:lombok:1.18.32")
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

//OpenAPI Codegen Configuration
val apiPackageName by extra("app.nextrole.api")
val modelPackageName by extra("app.nextrole.api")
val openApiSpecPath by extra("src/main/resources/openapi/openapi.json")
val generatedDirSpring by extra("generated/openapi/spring")
val generatedDirTypeScript by extra("generated/openapi/typescript")
val apiVersion by extra("1.0.0")
val fullSpecPath = "$rootDir/$openApiSpecPath"
val generatedSourcesDirSpring = "$rootDir/build/$generatedDirSpring"
val generatedSourcesDirTypeScript = "$rootDir/build/$generatedDirTypeScript"

tasks.register<GenerateTask>("openApiGenerateSpringServer") {
    generatorName = "kotlin-spring"
    inputSpec.set(fullSpecPath)
    outputDir.set(generatedSourcesDirSpring)
    apiPackage.set(apiPackageName)
    modelPackage.set(modelPackageName)
    configOptions = mapOf(
        "dateLibrary" to "java8",
        "interfaceOnly" to "true",
        "invoker" to "false",
        "generateSupportingFiles" to "false",
        "serializableModel" to "true",
        "swaggerAnnotations" to "true",
        "java8" to "false",
        "gradleBuildFile" to "false",
        "useTags" to "true",
        "oas3" to "true",
        "useSpringfox" to "false",
        "useSpringBoot3" to "true",
        "documentationProvider" to "none",
        "modelMutable" to "true",
        "reactive" to "true"
    )
}

tasks.register<GenerateTask>("openApiGenerateTypeScriptClient") {
    generatorName = "typescript-axios"
    inputSpec.set(fullSpecPath)
    outputDir.set(generatedSourcesDirTypeScript)
}

tasks.register<Copy>("copyTypesScriptFilesForExtension") {
    from("$generatedSourcesDirTypeScript/api.ts")
    into("../extension/src/codegen")
}

tasks.register<Copy>("copyTypesScriptFilesForFrontend") {
    from("$generatedSourcesDirTypeScript/api.ts")
    into("../frontend/codegen")
}

tasks.getByName("compileKotlin").dependsOn("openApiGenerateSpringServer")
tasks.getByName("compileKotlin").dependsOn("openApiGenerateTypeScriptClient")
tasks.getByName("copyTypesScriptFilesForExtension").dependsOn("openApiGenerateTypeScriptClient")
tasks.getByName("copyTypesScriptFilesForFrontend").dependsOn("openApiGenerateTypeScriptClient")
tasks.getByName("compileKotlin").dependsOn("copyTypesScriptFilesForExtension")
tasks.getByName("compileKotlin").dependsOn("copyTypesScriptFilesForFrontend")

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

sourceSets {
    main {
        kotlin.srcDir("$rootDir/build/$generatedDirSpring/src/main/kotlin")
    }
}
