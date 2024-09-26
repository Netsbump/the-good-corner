SELECT * FROM Ads WHERE category_id = 1;

SELECT * FROM Ads 
WHERE category_id IN (1, 2);

SELECT AVG(price) AS average_price, Categories.name as category_name
FROM Ads
JOIN Categories ON Ads.category_id = Categories.id
WHERE category_id = 3;

SELECT * 
FROM Ads
JOIN Categories ON Ads.category_id = Categories.id
WHERE Categories.name LIKE 'v%';