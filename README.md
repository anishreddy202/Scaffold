# IOT Developer Portal

This is the Source Code Repository to be used for the **IoT Developer Portal WebSite.**


## Issues & Documentation
[JIRA Tickets](https://jira.verizon.com)
[Confluence](https://confluence.verizon.com)


## Introduction
-//TODO

## Business Objectives
-//TODO

## Contact List


Web Dev                      | Design                           
---------------------------- | -------------------------------- 
Hari Mukkapati   (Dev-Mgr)   | Daniel Scholl       (Team-Mgr)   
Anish Madhi          (Dev)   | Johnny Chance       (Design)     
Rajesh Chaganti      (Dev)   | Srini Bhukya        (Design)     
Karthik Vellaichamy  (Dev)   | Ning Fang           (UX)         
Sung Park            (Dev)   | Michael Mucciarone  (UX)         
Gerry Hernandez      (Dev)   |                                  



## Feature List
- TBD

#### General Features
- TBD

## Technical Requirements
- MEAN Stack  (Mongo, Express, Angular, Node)
- Language (Javascript w/ TypeScript as a Superset)
- Build Tools (Gulp)
- Testing Tools (Mocha, Karma, Protractor)
- Domain: 
- Responsive: 
- Browser requirements
	- Internet Explorer 11
	- Chrome 43
	- Firefox 38
	- Safari 8.0.7
- Device Requirements
	- None
- Page load time expectations
	- Under 3 seconds
- Scale and anticipated volume of traffic
	- Needs to be able to handle low usage patterns
- Environments
	- Development -- LocalHost
	- CI    		  -- Azure Hosted
	- Production  -- Laniakea Hosted
- Analytics
	- Integration with Google Analytics


## Security Requirements
- Only open ports exposed to the Internet are 80 and 22.
- Application Scanning may be performed prior to going live and randomly as needed by Rapid7 Nexpose or Qualys Application Scanner.
- The application should be secured against most of the top vulnerabilities identified by OWASP

#### Useful Security Resources for Node and Express
- TBD


## Technical Infrastructure

### Hardware/Software
The following requirements apply to the Production Hardware Installation.

FUNCTION			                      | Virtual Hardware
----------------------------------- | -----------------------------
                                    | 
                                    | 

Table: Hardware Requirements.


The following requirements apply to the Production Docker Containerization

Container			                      | Purpose
----------------------------------- | -----------------------------
                                    | 
                                    | 

Table: Container Requirements.


The following requirements apply to the Software Installation.

COMPONENT			            | VERSION                       | COMPONENT                     | VERSION
------------------------- | ----------------------------- | ----------------------------- | -----------------------------
Scripting Language				| Node - **0.12.2**             | Bower Package Module          | __*angular*__
- Node Package Module			|  __*async*__                  | Bower Package Module          | __*json3*__
- Node Package Module			|  __*bcrypt-nodejs*__          | Bower Package Module          | __*es5-shim*__
- Node Package Module			|  __*body-parser*__            | Bower Package Module          | __*jquery*__
- Node Package Module			|  __*composable-middleware*__  | Bower Package Module          | __*bootstrap-sass-official*__
- Node Package Module			|  __*compression*__            | Bower Package Module          | __*angular-resource*__
- Node Package Module			|  __*connect-mongo*__          | Bower Package Module          | __*angular-cookies*__
- Node Package Module			|  __*cookie-parser*__          | Bower Package Module          | __*angular-sanitize*__
- Node Package Module			|  __*deasync*__                | Bower Package Module          | __*angular-ui-router*__
- Node Package Module			|  __*debug*__                  | Bower Package Module          | __*font-awesome*__
- Node Package Module			|  __*ejs*__                    | Bower Package Module          | __*lodash*__
- Node Package Module			|  __*errorhandler*__           | Bower Package Module          | __*angular-google-analytics*__
- Node Package Module			|  __*express*__                | Bower Package Module          | __*scrollmagic*__
- Node Package Module			|  __*express-jwt*__            | Bower Package Module          | __*greensock*__
- Node Package Module			|  __*express-session*__        | Bower Package Module          | __*underscore*__
- Node Package Module			|  __*feed*__                   | Bower Package Module          | __*moment*__
- Node Package Module			|  __*joi*__                    | Bower Package Module          | __*PatternLibrary*__
- Node Package Module			|  __*jsonwebtoken*__           | Bower Package Module          | __*angular-uuid*__
- Node Package Module			|  __*lodash*__                 | Database                      | MongoDB - **2.0.2**
- Node Package Module			|  __*method-override*__
- Node Package Module			|  __*mongodb*__
- Node Package Module			|  __*morgan*__
- Node Package Module			|  __*node-linq*__
- Node Package Module			|  __*node-uuid*__
- Node Package Module			|  __*passport*__
- Node Package Module			|  __*passport-local*__


Table: Installed Software Required Versions.

### System Architecture Diagram

-TBD


### Design Documentation

- TBD


### Continuous Integration and Deployment

CI/CD For Development via Bamboo.
Docker Container Builds for Production via virtualized Jenkins server.

Development Environment
---------------

### Getting Started

1. npm install
2. bower install
3. tsd install

4. Open up a Terminal Window and start up MongoDB.
	
	```
     $ mongodb
  ```

5. Start up the Visual Studio Code Editor and ensure source code folder ./src is open.
6. To enable development build watcher <cmd><shift>B and to stop <cmd><shift>X

	_*Alternate terminal method_
	
	```
	npm start
	```

Build Environment
---------------

### Getting Started

portals.status DevOps uses 'ansible provisioner. It means that your build environment is built from the source code.

  1. Install VirtualBox
     [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)

  2. Install Vagrant
     [http://docs.vagrantup.com/v2/installation/index.html](http://docs.vagrantup.com/v2/installation/index.html)

  3. Install Required Vagrant Plugins
  	  -  vagrant-share (1.1.3)

  4. Build your environment

     To build your environment in the chef directory execute the command:

     ```
     $ vagrant up
     ```

     Vagrant will start to build your environment. You'll see green status
     messages while the box is configuring the system.

     >
     NOTE: Vagrant supports multiple providers for virtualization.  If you have different providers installed in your machine you can specify which provider to use.

     ```
        $ vagrant up --provider=virtualbox

     ```

 6. Visit [http://localhost:800](http://localhost:800) address and you'll see the jenkins build page.


### Basic Usage

Vagrant's basic commands (should be executed inside DevOps directory):


* SSH into the virtual machine.
	```
	$ vagrant ssh
	```

* Start the virtual machine.
	```
	$ vagrant up
	```

* Stop the virtual machine.
	```
	$ vagrant halt
	```

* Destroy the virtual machine.
>
Destroy your virtual machine. Source code and content of data directory will remain unchangeable. VirtualBox machine instance will be destroyed only. You can build your machine again with 'vagrant up' command. The command is useful if you want to save disk space.

	```
	$ vagrant destroy
	```

* Configure virtual machine
>
Useful if you have overwriten a file that you want reset. ie: httpd.conf

	```
	$ vagrant provision
	```

* Reload the virtual machine.
>
Userful when you need to change network or synced folder settings.
	```
	$ vagrant reload
	```

Official Vagrant site has more documentation.
[http://docs.vagrantup.com/v2/](http://docs.vagrantup.com/v2/)