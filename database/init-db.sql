CREATE DATABASE IF NOT EXISTS lab4ece140a;

USE lab4ece140a;

CREATE TABLE IF NOT EXISTS Commands (
  id         int AUTO_INCREMENT PRIMARY KEY,
  message    VARCHAR(32) NOT NULL,
  completed  boolean DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS Telemetry;

CREATE TABLE IF NOT EXISTS Telemetry(
  id int AUTO_INCREMENT PRIMARY KEY,
  pitch int DEFAULT NULL, 
  roll int DEFAULT NULL,
  yaw int DEFAULT NULL,
  vgx int DEFAULT NULL,
  vgy int DEFAULT NULL,
  vgz int DEFAULT NULL,
  templ int DEFAULT NULL,
  temph int DEFAULT NULL,
  tof int DEFAULT NULL,
  h int DEFAULT NULL,
  bat int DEFAULT NULL,
  baro double DEFAULT NULL,
  time int DEFAULT NULL,
  agx double DEFAULT NULL,
  agy double DEFAULT NULL,
  agz double DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- CREATE TABLE Telemetry to store Telemetry data here
-- Call it "Telemetry"!!!