CREATE TABLE IF NOT EXISTS Ads (
id INTEGER PRIMARY KEY AUTOINCREMENT, 
title TEXT NOT NULL,
description TEXT,
price REAL NOT NULL,
owner TEXT NOT NULL, 
picture BLOB NOT NULL, 
location TEXT, 
createdAt NUMERIC DEFAULT CURRENT_TIMESTAMP
);



