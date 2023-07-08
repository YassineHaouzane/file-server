FROM eclipse-temurin:17-jdk-focal

ENV APP_HOME=/app

WORKDIR /app

COPY build.gradle settings.gradle gradlew $APP_HOME
COPY gradle $APP_HOME/gradle

RUN ./gradlew build || return 0

COPY src ./src
COPY uploads ./uploads
# RUN mkdir -p ./uploads

EXPOSE 8080

CMD ["./gradlew", "bootRun"]