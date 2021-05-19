# Processa Processo

In a law firm, one of the weekly workloads consists of monitoring lawsuits, checking for updates. In general, due to the lack of automation involved in the activity, this is done inefficiently, consulting various court sites manually. This project involves a web platform that aims to speed up and increase efficiency in the monitoring process, automating most of the workload.  

A report (in  portuguese) with an in depth explanation of the application and the problem it aims to solve is found in `/relatorio_primeiro_entregavel.pdf`.

## Running this app

### As a node package

Go to the `/server` directory, then execute

`$ npm start`

and the backend will be avaiable at `localhost:3001`.

Then, go to the `/client/src` directory, and execute

`$ npm start`

The application will be available at `localhost:3000`.

### Using the Docker production image
After starting the `Docker daemon`, simply run

`$ docker-compose up application` 

and the application will be available at `localhost:3001`.

## Typical usage

The `/server/assets/` contains information about some lawsuit examples. Their numbers (identification) are as follow:

* Americanas - 00390682620158110041
* Armando Caprigolio - 00078625720168110041
* Estado do Mato Grosso - 10560011820198110041
* Paulo Silva - 10241433220208110041
* Pedro Paulo - 10295019820208110001

To register a lawsuit, click in the "plus" icon in the top right corner and fill in the lawsuit number, then the application will try to match the lawsuit number specified to the lawsuits in the "assets" folder.

The magnififying glass icon to the left of the lawsuit can be used to show the update history of the lawsuit.
