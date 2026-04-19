SELECT * FROM reports;
INSERT INTO reports 
(reporter, plant, pest_name, target, symptoms, solution, severity, lat, lng, image_url, created_at)
VALUES

-- 🔥 Ổ DỊCH CHÂU CHẤU (TP.HCM - tháng 6)
('U1','Ngô','Châu chấu','Ngô','Lá bị ăn','Phun thuốc','Nặng',10.7626,106.6602,'1.jpg','2025-06-01'),
('U2','Ngô','Châu chấu','Ngô','Lá rách','Phun thuốc','Nặng',10.7630,106.6610,'2.jpg','2025-06-02'),
('U3','Ngô','Châu chấu','Ngô','Lá thủng','Phun thuốc','Nặng',10.7635,106.6620,'3.jpg','2025-06-03'),
('U4','Ngô','Châu chấu','Ngô','Lá cháy','Phun thuốc','Nặng',10.7640,106.6630,'4.jpg','2025-06-04'),
('U5','Ngô','Châu chấu','Ngô','Lá khô','Phun thuốc','Nặng',10.7645,106.6640,'5.jpg','2025-06-05'),
('U6','Ngô','Châu chấu','Ngô','Lá bị ăn','Phun thuốc','Nặng',10.7650,106.6650,'6.jpg','2025-06-06'),
('U7','Ngô','Châu chấu','Ngô','Lá rách','Phun thuốc','Nặng',10.7655,106.6660,'7.jpg','2025-06-07'),
('U8','Ngô','Châu chấu','Ngô','Lá thủng','Phun thuốc','Nặng',10.7660,106.6670,'8.jpg','2025-06-08'),
('U9','Ngô','Châu chấu','Ngô','Lá cháy','Phun thuốc','Nặng',10.7665,106.6680,'9.jpg','2025-06-09'),
('U10','Ngô','Châu chấu','Ngô','Lá khô','Phun thuốc','Nặng',10.7670,106.6690,'10.jpg','2025-06-10'),
('U11','Ngô','Châu chấu','Ngô','Lá bị ăn','Phun thuốc','Nặng',10.7675,106.6700,'11.jpg','2025-06-11'),
('U12','Ngô','Châu chấu','Ngô','Lá rách','Phun thuốc','Nặng',10.7680,106.6710,'12.jpg','2025-06-12'),

-- 🌱 CÁC DATA PHÂN TÁN THEO THÁNG

-- Tháng 1
('U13','Lúa','Rệp cây','Lúa','Lá vàng','Phun thuốc','Nhẹ',21.0285,105.8542,'13.jpg','2025-01-10'),
('U14','Cam','Sâu khoang','Cam','Lá ăn','Phun thuốc','Trung bình',20.85,106.68,'14.jpg','2025-01-15'),

-- Tháng 2
('U15','Xoài','Bọ cánh cứng','Xoài','Lá thủng','Bẫy đèn','Nhẹ',10.82,106.62,'15.jpg','2025-02-05'),
('U16','Táo','Sâu đục quả','Táo','Quả thối','Bao trái','Nặng',16.05,108.20,'16.jpg','2025-02-20'),

-- Tháng 3
('U17','Ngô','Châu chấu','Ngô','Lá ăn','Phun thuốc','Trung bình',21.03,105.85,'17.jpg','2025-03-12'),
('U18','Rau','Muỗi','Rau','Đốm lá','Lưới','Nhẹ',12.23,109.19,'18.jpg','2025-03-18'),

-- Tháng 4
('U19','Mía','Sâu đục thân','Mía','Thân rỗng','Phun thuốc','Nặng',10.76,106.66,'19.jpg','2025-04-02'),
('U20','Lúa','Rệp cây','Lúa','Lá xoăn','Phun thuốc','Nhẹ',21.02,105.85,'20.jpg','2025-04-25'),

-- Tháng 5
('U21','Cam','Sâu khoang','Cam','Lá thủng','Phun thuốc','Trung bình',20.84,106.68,'21.jpg','2025-05-10'),
('U22','Xoài','Bọ cánh cứng','Xoài','Lá rách','Bẫy đèn','Nhẹ',10.82,106.62,'22.jpg','2025-05-15'),

-- Tháng 7
('U23','Táo','Sâu đục quả','Táo','Quả hỏng','Bao trái','Nặng',16.05,108.20,'23.jpg','2025-07-05'),
('U24','Ngô','Châu chấu','Ngô','Lá ăn','Phun thuốc','Trung bình',21.59,105.84,'24.jpg','2025-07-11'),

-- Tháng 8
('U25','Lúa','Ve','Lúa','Cây yếu','Xử lý đất','Nhẹ',10.04,105.74,'25.jpg','2025-08-01'),
('U26','Rau','Muỗi','Rau','Đốm','Lưới','Trung bình',12.23,109.19,'26.jpg','2025-08-18'),

-- Tháng 9
('U27','Rau','Ong cắn lá','Rau','Lá cắt','Bẫy','Nhẹ',16.46,107.59,'27.jpg','2025-09-10'),
('U28','Mía','Sâu đục thân','Mía','Thân rỗng','Phun thuốc','Nặng',10.76,106.66,'28.jpg','2025-09-20'),

-- Tháng 10
('U29','Lúa','Rệp cây','Lúa','Lá vàng','Phun thuốc','Nhẹ',21.02,105.85,'29.jpg','2025-10-03'),
('U30','Cam','Sâu khoang','Cam','Lá ăn','Phun thuốc','Trung bình',20.84,106.68,'30.jpg','2025-10-21'),

-- Tháng 11
('U31','Xoài','Bọ cánh cứng','Xoài','Lá thủng','Bẫy đèn','Nhẹ',10.82,106.62,'31.jpg','2025-11-05'),
('U32','Táo','Sâu đục quả','Táo','Quả thối','Bao trái','Nặng',16.05,108.20,'32.jpg','2025-11-18'),

-- Tháng 12
('U33','Ngô','Châu chấu','Ngô','Lá ăn','Phun thuốc','Trung bình',21.59,105.84,'33.jpg','2025-12-08'),
('U34','Lúa','Ve','Lúa','Cây yếu','Xử lý đất','Nhẹ',10.04,105.74,'34.jpg','2025-12-22'),

-- thêm random để đủ 50
('U35','Rau','Muỗi','Rau','Đốm','Lưới','Nhẹ',11.94,108.44,'35.jpg','2025-02-11'),
('U36','Mía','Sâu đục thân','Mía','Rỗng','Phun','Nặng',14.06,108.27,'36.jpg','2025-03-09'),
('U37','Lúa','Rệp cây','Lúa','Vàng','Phun','Nhẹ',21.27,106.20,'37.jpg','2025-04-14'),
('U38','Cam','Sâu khoang','Cam','Ăn lá','Phun','TB',22.15,105.83,'38.jpg','2025-05-19'),
('U39','Xoài','Bọ cánh cứng','Xoài','Thủng','Bẫy','Nhẹ',10.54,106.41,'39.jpg','2025-07-07'),
('U40','Táo','Sâu đục quả','Táo','Thối','Bao','Nặng',15.88,108.33,'40.jpg','2025-08-12'),
('U41','Ngô','Châu chấu','Ngô','Ăn lá','Phun','TB',20.97,105.78,'41.jpg','2025-09-01'),
('U42','Lúa','Ve','Lúa','Yếu','Đất','Nhẹ',9.93,105.08,'42.jpg','2025-10-17'),
('U43','Rau','Muỗi','Rau','Đốm','Lưới','TB',13.78,109.21,'43.jpg','2025-11-09'),
('U44','Rau','Ong cắn lá','Rau','Cắt','Bẫy','Nhẹ',16.07,108.22,'44.jpg','2025-12-03'),
('U45','Mía','Sâu đục thân','Mía','Rỗng','Phun','Nặng',11.56,107.80,'45.jpg','2025-01-28'),
('U46','Lúa','Rệp cây','Lúa','Vàng','Phun','Nhẹ',20.45,106.34,'46.jpg','2025-02-22'),
('U47','Cam','Sâu khoang','Cam','Ăn','Phun','TB',18.67,105.68,'47.jpg','2025-03-30'),
('U48','Xoài','Bọ cánh cứng','Xoài','Thủng','Bẫy','Nhẹ',10.25,106.37,'48.jpg','2025-04-08'),
('U49','Táo','Sâu đục quả','Táo','Thối','Bao','Nặng',17.48,106.60,'49.jpg','2025-05-26'),
('U50','Ngô','Châu chấu','Ngô','Ăn','Phun','TB',21.59,105.84,'50.jpg','2025-07-14');