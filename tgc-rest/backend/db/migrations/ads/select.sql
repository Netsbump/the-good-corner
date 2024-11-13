SELECT * FROM Ads;

SELECT * FROM Ads WHERE location = 'Bordeaux';

SELECT * FROM Ads WHERE price < 40;

SELECT location, AVG(price) as average_price
FROM Ads 
WHERE location IN ('Paris', 'Lyon', 'Bordeaux') 
GROUP BY location;
