import { json } from "react-router-dom"

const existUser =  {
    "_id": "64c75fc9721d92836120e756",
    "firstname": "shashwat",
    "lastname": "wawge",
    "email": "shashwat.wawge@gmail.com",
    "password": "$2b$10$FA92Kn1dkIiEWx/wh4AyLeBLxKJeFh0xAFIuGGXJSr9eArN0wPABS",
    "accType": "Student",
    "additionalDetails": "64c75fc9721d92836120e754",
    "courses": [],
    "ratingsAndReviews": [],
    "image": "https://api.dicebear.com/5.x/initials/svg/seed=shashwat%20wawge",
    "courseProgress": [],
    "__v": 0,
    "resetPasswordExpIn": "2023-08-02T14:51:11.060Z",
    "token": "9499231f-5d08-4735-b12e-a85e9a3125b9"
}

const simplified = json.stringify(existUser)

API;
API.one(function(err,data){
    API.two(function(err,data){
        APi.three(function(err,data)
{
        
        })
    })
})

// Simulating asynchronous API functions
const API = {
    one: function(callback) {
        setTimeout(() => {
            const data = "Data from API.one";
            callback(null, data);
        }, 1000);
    },
    two: function(callback) {
        setTimeout(() => {
            const data = "Data from API.two";
            callback(null, data);
        }, 1000);
    },
    three: function(callback) {
        setTimeout(() => {
            const data = "Data from API.three";
            callback(null, data);
        }, 1000);
    }
};

// Wrapping API functions with promises
const promisifiedOne = () => {
    return new Promise((resolve, reject) => {
        API.one((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const promisifiedTwo = () => {
    return new Promise((resolve, reject) => {
        API.two((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const promisifiedThree = () => {
    return new Promise((resolve, reject) => {
        API.three((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

(async () => {
    try {
        const data1 = await promisifiedOne();
        const data2 = await promisifiedTwo();
        const data3 = await promisifiedThree();
        console.log(data1, data2, data3);
    } catch (error) {
        console.error("Error:", error);
    }
})();
