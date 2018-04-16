# Plex Frontend

Multi-user User Interface in Angular JS 5 and abusing Material Design (https://material.io) to interact with the Plex-On-The-Go backend using Spring Boot 2.
Find more information about the Plex-On-The-Go backend here: https://github.com/lolobored/plex-on-the-go

## Goal

The goal of the project is to allow users of the Plex service to create an "on-the-go" local library containing all your favorites tvshows and movies in a reduced size for storing these on a laptop on-the-go.

## Features (WIP)

* Identity manager with different level of users (users, administrators) provided through Keycloak (https://www.keycloak.org)
* Selection of movies to convert filterable by:
  * Genre
  * Year
  * IMDB rating
  * Watched status
  * Latest added movies
* Selection of tvshows to convert filterable by:
  * TVShow
  * Year
  * TVDB rating
  * Watched status
  * Latest added episodes
  
Automatic subscription will be also provided by:
* Selecting a show or its season to automatically convert it as soon as a new episode is added to the library
* Automatically download new entries

## Stack

Globally with the backend and the frontend, the stack is:
* Spring Boot 2.0
* Spring Data 
* AngularJS 5
* Jackson
* Elastic Search
* Keycloak
* Gradle

## Configuration

To be updated
  
## Run the project

A docker compose is provided here: https://github.com/lolobored/plex-on-the-go-infrastructure

