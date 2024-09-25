DELETE FROM Ads;
DELETE FROM sqlite_sequence WHERE name = 'Ads';

DELETE FROM Ads WHERE price > 40;