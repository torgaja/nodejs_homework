# nodejs_homework

Simple homework project for http endpoints in nodejs. 

## Installation instructions

This install guide assumes that you have at least [MongoDB](https://www.mongodb.com/), [node.js](https://nodejs.org/), [npm](https://www.npmjs.com/) and [git](https://git-scm.com/) installed on your system. For installation instructions of the above packages please consult your distribution's help or your system administrator.

Download the package source from [github](https://github.com/torgaja/nodejs_homework) to your selected directory.

```bash
git clone https://github.com/torgaja/nodejs_homework.git
```

Use native package manager of node.js [npm](https://www.npmjs.com/) to install all dependencies of the package in the root dir of the project where package.json resides.

```bash
npm install
```

## Usage

Before starting the application make sure to check and modify the configuration within ./config/config.json. This manual assumes that you have a live MongoDB to which this application can connect and you know the corresponding URI.

Start the application by typing in the project root (where index.js and package.json is):


```bash
node index.js
```

From now on the application rund and implements the following http endpoints:

* GET    /records/:id This endpoint returns the single record that has the specified id. If the provided id does not exists it returnes with an ERROR message. If no id is given (GET /records) the application returns all the records.
* POST   /records This endpoint inserts the object given in the body of the request (it is expected in JSON format). The JSON has to have an id member all other fields are optional. If the id already exists in the DB it returns with the following ERROR message: `ERROR! id: XX exists!`
* DELETE /records/:id This endpoint _deletes and returns_ the specified record. If the id is not available in the DB the application notifies the user in the reply. 



## License
[MIT](https://choosealicense.com/licenses/mit/)
