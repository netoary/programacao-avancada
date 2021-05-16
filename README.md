# Processa Processo

In a law firm, one of the weekly workloads consists of monitoring lawsuits, checking for updates. In general, due to the lack of automation involved in the activity, this is done inefficiently, consulting various court sites manually. This project involves a web platform that aims to speed up and increase efficiency in the monitoring process, automating most of the workload.  

A report (in  portuguese) with an in depth explanation of the application and the problem it aims to solve is found in `/relatorio_primeiro_entregavel.pdf`.

## Run this app

### As a node package

Go to the `/client/src directory`, then execute

`$ npm start`

and the application will be available at `localhost:3000`.

### Using the Docker container
After starting the `Docker daemon`, simply run

`$ docker-compose up` 

and the application will be available at `localhost:8080`.

## Typical usage

There are two folders containing lawsuit information: `/server/assets/loaded` and `/server/assets/unloaded`. For the MVP (minimum viable product), those folders represent registered and unregistred lawsuits respectively. Upon launch, the application will show a dashboard with all lawsuits in the "loaded" folder. 

To register a lawsuit, -descrever o que deve ser feito-, then the application will try to match the lawsuit number specified to the lawsuits in the "unaloaded" folder.
