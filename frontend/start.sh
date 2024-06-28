#!/usr/bin/env bash
aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 537408061242.dkr.ecr.us-east-2.amazonaws.com
git pull origin main
docker-compose pull
docker-compose down -v
docker-compose up --force-recreate --build -d
