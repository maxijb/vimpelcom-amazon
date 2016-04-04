# vimpelcom-amazon

**Objective:** Create a working app on Amazon Web Services, consuming Postgre and Mongo databases. 

**How to run:** 
```
$ git clone [this Repo]
$ npm install
$ npm start
```

**Tech stack:** 
- The app is purely backend code, written on NodeJS, levaraging the express framework
- The static views are rendered with Jade
- The data is hosted on an instance of Amazon EC2, and a load balancer is on top of it.
- The data is stored on a PostgreSQL database on Amazon RDS, and a MongoDB instance, also running on Amazon EC2.
- The frontend interaction is very minimal, so the only static asset is a .css file.
- Tested on IE 9+, Chrome, FF


**Architecture**   
As the task was very specific on architectural tasks (creating LB, databases, etc), but not so much on how the API had to be implemented, I decided to create an html interface to take care of the desired actions.
This way, it's easier to visualize all the supported operations, and their results.


**What could be improved**
- For the sake of simplicity, I printed English texts, where we usually would include variables that could be easily internationalized. 
- Testing functionality. 


[LINK: http://vimpelcom-balancer-1932162584.us-east-1.elb.amazonaws.com/](http://vimpelcom-balancer-1932162584.us-east-1.elb.amazonaws.com/)








