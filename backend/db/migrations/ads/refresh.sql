DELETE FROM Ads;
DELETE FROM sqlite_sequence WHERE name = 'Ads';

INSERT INTO Ads (title, description, price, owner, picture, location) VALUES 
-- Annonces pour Bordeaux
('Appartement à Bordeaux', 'Appartement spacieux et lumineux au centre de Bordeaux.', 1200.00, 'Jean Dupont', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Loft à Bordeaux', 'Loft moderne proche de la Garonne.', 1800.00, 'Claude Monet', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Maison à Bordeaux', 'Belle maison avec piscine.', 3000.00, 'Maurice Ravel', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Studio à Bordeaux', 'Petit studio idéal pour les étudiants.', 600.00, 'Émile Zola', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Loft à Bordeaux', 'Loft industriel au cœur du quartier des Chartrons.', 2300.00, 'Jean-Paul Sartre', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Maison à Bordeaux', 'Maison de charme dans un quartier calme.', 3200.00, 'Henri Toulouse-Lautrec', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Appartement à Bordeaux', 'Appartement avec vue sur les quais de Bordeaux.', 1500.00, 'Jean-Michel Basquiat', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Maison à Bordeaux', 'Maison d’architecte avec grande terrasse.', 3500.00, 'Pablo Picasso', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Loft à Bordeaux', 'Loft design dans le quartier des arts.', 2500.00, 'Salvador Dalí', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Studio à Bordeaux', 'Studio cosy proche de la place de la Bourse.', 26.00, 'Gustave Eiffel', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Appartement à Bordeaux', 'Appartement rénové dans un immeuble haussmannien.', 1800.00, 'Vincent van Gogh', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Maison à Bordeaux', 'Maison en pierre avec jardin fleuri.', 3400.00, 'Camille Pissarro', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Loft à Bordeaux', 'Loft avec vue panoramique sur la ville.', 2800.00, 'Henri Matisse', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Studio à Bordeaux', 'Studio moderne à proximité du parc Bordelais.', 850.00, 'Paul Cézanne', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Appartement à Bordeaux', 'Appartement en duplex avec vue sur la cathédrale.', 1900.00, 'Edgar Degas', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Maison à Bordeaux', 'Maison ancienne rénovée avec piscine.', 3700.00, 'Georges Seurat', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Loft à Bordeaux', 'Loft dans une ancienne cave à vin réhabilitée.', 2600.00, 'Paul Gauguin', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Studio à Bordeaux', 'Studio avec balcon ensoleillé.', 900.00, 'Alphonse Mucha', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Appartement à Bordeaux', 'Appartement neuf avec terrasse et jardin.', 2200.00, 'Toulouse-Lautrec', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),
('Maison à Bordeaux', 'Grande maison familiale proche des écoles.', 3800.00, 'Georges Braque', X'89504E470D0A1A0A0000000D49484452', 'Bordeaux'),

-- Annonces pour Paris
('Studio à Paris', 'Charmant studio dans le Marais, idéal pour étudiants.', 900.00, 'Marie Curie', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Appartement à Paris', 'Appartement cosy avec vue sur la Tour Eiffel.', 2000.00, 'Victor Hugo', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Appartement à Paris', 'Appartement de luxe aux Champs-Élysées.', 3500.00, 'Georges Clemenceau', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Appartement à Paris', 'Appartement avec terrasse dans le 7ème arrondissement.', 2800.00, 'Simone de Beauvoir', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Studio à Paris', 'Studio à deux pas du Sacré-Cœur.', 950.00, 'Auguste Rodin', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Maison à Paris', 'Maison avec jardin dans le 16ème arrondissement.', 4000.00, 'Pierre Curie', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Loft à Paris', 'Loft design dans le quartier du Marais.', 2600.00, 'Édith Piaf', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Appartement à Paris', 'Appartement moderne avec vue sur les toits.', 2300.00, 'Jacques Prévert', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Studio à Paris', 'Studio rénové dans le Quartier Latin.', 1000.00, 'Jean Cocteau', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Maison à Paris', 'Maison de ville avec terrasse dans le 13ème.', 3700.00, 'Albert Camus', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Appartement à Paris', 'Appartement en duplex avec vue sur le Louvre.', 3000.00, 'Blaise Pascal', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Loft à Paris', 'Loft industriel avec mezzanine.', 2700.00, 'Jean-Paul Sartre', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Studio à Paris', 'Studio cosy proche de la gare Montparnasse.', 39.00, 'Marcel Proust', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Appartement à Paris', 'Appartement avec balcon dans le 11ème.', 2400.00, 'Henri Cartier-Bresson', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Maison à Paris', 'Maison moderne avec grand jardin.', 4200.00, 'Claude Debussy', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Loft à Paris', 'Loft avec verrière dans le quartier des Batignolles.', 2800.00, 'Serge Gainsbourg', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Appartement à Paris', 'Appartement neuf dans un quartier dynamique.', 2500.00, 'Edith Piaf', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Studio à Paris', 'Studio lumineux avec vue sur la Seine.', 1200.00, 'François Truffaut', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Maison à Paris', 'Maison d’artiste avec atelier dans le 18ème.', 4500.00, 'Vincent van Gogh', X'89504E470D0A1A0A0000000D49484452', 'Paris'),
('Appartement à Paris', 'Appartement spacieux dans le 16ème.', 3200.00, 'Brigitte Bardot', X'89504E470D0A1A0A0000000D49484452', 'Paris'),

-- Annonces pour Lyon
('Maison à Lyon', 'Grande maison familiale avec jardin.', 2500.00, 'Paul Bocuse', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Studio à Lyon', 'Studio proche de la Part-Dieu, idéal pour célibataires.', 800.00, 'Antoine de Saint-Exupéry', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Loft à Lyon', 'Loft avec mezzanine dans le Vieux Lyon.', 2200.00, 'Lumière Brothers', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Appartement à Lyon', 'Appartement en duplex dans le quartier de la Confluence.', 2100.00, 'André-Marie Ampère', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Maison à Lyon', 'Maison moderne avec vue sur les montagnes.', 2700.00, 'Jean Moulin', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Appartement à Lyon', 'Appartement spacieux dans le centre de Lyon.', 1900.00, 'Guignol', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Studio à Lyon', 'Studio moderne avec vue sur le Rhône.', 850.00, 'Ferdinand de Lesseps', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Loft à Lyon', 'Loft design dans le quartier des artistes.', 2400.00, 'Édouard Herriot', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Maison à Lyon', 'Maison ancienne avec cachet.', 2900.00, 'Charles de Gaulle', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Appartement à Lyon', 'Appartement en bord de Saône.', 2300.00, 'Marie Curie', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Studio à Lyon', 'Studio rénové proche de l’université.', 950.00, 'Hugo Pratt', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Loft à Lyon', 'Loft avec vue imprenable sur Fourvière.', 2600.00, 'Auguste Lumière', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Appartement à Lyon', 'Appartement avec balcon dans le 6ème.', 2000.00, 'Henri Matisse', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Maison à Lyon', 'Maison d’architecte avec piscine.', 3200.00, 'Tony Garnier', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Studio à Lyon', 'Studio avec vue sur la place Bellecour.', 1000.00, 'Émile Zola', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Loft à Lyon', 'Loft industriel dans le 7ème arrondissement.', 2700.00, 'Nicolas Poussin', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Appartement à Lyon', 'Appartement rénové avec vue sur les Alpes.', 2200.00, 'Albert Camus', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Maison à Lyon', 'Maison avec grand jardin près du parc de la Tête d’Or.', 3400.00, 'François Rabelais', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Studio à Lyon', 'Studio avec terrasse dans le 8ème.', 1100.00, 'Jean Moulin', X'89504E470D0A1A0A0000000D49484452', 'Lyon'),
('Loft à Lyon', 'Loft dans une ancienne usine réhabilitée.', 2500.00, 'Guillaume Apollinaire', X'89504E470D0A1A0A0000000D49484452', 'Lyon');

SELECT * FROM Ads;